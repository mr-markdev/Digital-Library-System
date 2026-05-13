<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

require_once __DIR__ . '/../config/db.php';

// NOTE: backend/config/db.php echoes a connection message.
// We disable it by not relying on output; if messages appear, disable them in db.php.

function getPdo() {
  global $pdo;
  return $pdo;
}

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getPdo();

$action = (isset($_GET['stats']) && $_GET['stats'] === '1') ? 'stats' : ((isset($_GET['updates']) && $_GET['updates'] === '1') ? 'updates' : 'books');

if ($method === 'GET' && $action === 'stats') {
  try {
    $total = (int)$pdo->query('SELECT COUNT(*) as c FROM library')->fetch(PDO::FETCH_ASSOC)['c'];

    $available = (int)$pdo->query("SELECT COUNT(*) as c FROM library WHERE status = 'available' ")->fetch(PDO::FETCH_ASSOC)['c'];


    echo json_encode(['success' => true, 'data' => ['totalBooks' => $total, 'availableBooks' => $available]]);
  } catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
  }
  exit;
}

if ($method === 'GET' && $action === 'updates') {
  try {
    $stmt = $pdo->query("SELECT id, message, type, created_at FROM updates ORDER BY created_at DESC LIMIT 20");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $updates = array_map(function($r) {
      return [
        'id' => (int)$r['id'],
        'time' => $r['created_at'],
        'message' => $r['message'],
        'type' => $r['type'],
      ];
    }, $rows);

    echo json_encode(['success' => true, 'data' => $updates]);
  } catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
  }
  exit;
}

if ($method === 'GET' && $action === 'books') {
  try {
    // Table schema in your DB:
    // library(bookid, title, author, category, quantity, status, ...)
    $stmt = $pdo->query('SELECT bookid, title, author, category, quantity, status FROM library ORDER BY bookid DESC');

    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $books]);
  } catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
  }
  exit;
}

if ($method === 'DELETE') {
  try {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true) ?: [];

    $bookid = isset($payload['bookid']) ? (int)$payload['bookid'] : 0;

    if ($bookid <= 0) {
      http_response_code(422);
      echo json_encode(['success' => false, 'error' => 'Missing or invalid bookid']);
      exit;
    }

    $stmt = $pdo->prepare('DELETE FROM library WHERE bookid = :bookid');
    $stmt->execute([':bookid' => $bookid]);

    echo json_encode(['success' => true, 'data' => ['bookid' => $bookid]]);
  } catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
  }
  exit;
}

if ($method === 'PUT' || $method === 'PATCH') {
  try {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true) ?: [];

    $bookid = isset($payload['bookid']) ? (int)$payload['bookid'] : 0;
    $title = isset($payload['title']) ? trim($payload['title']) : '';
    $author = isset($payload['author']) ? trim($payload['author']) : '';
    $category = isset($payload['category']) ? trim($payload['category']) : '';
    $quantity = isset($payload['quantity']) ? (int)$payload['quantity'] : 0;
    $status = isset($payload['status']) ? trim($payload['status']) : 'available';

    if ($bookid <= 0 || $title === '' || $author === '' || $category === '' || $quantity < 0) {
      http_response_code(422);
      echo json_encode(['success' => false, 'error' => 'Missing or invalid fields']);
      exit;
    }

    $stmt = $pdo->prepare('
      UPDATE library
      SET title = :title, author = :author, category = :category, quantity = :quantity, status = :status
      WHERE bookid = :bookid
    ');

    $stmt->execute([
      ':title' => $title,
      ':author' => $author,
      ':category' => $category,
      ':quantity' => $quantity,
      ':status' => $status,
      ':bookid' => $bookid,
    ]);

    echo json_encode(['success' => true, 'data' => ['bookid' => $bookid]]);
  } catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
  }
  exit;
}

if ($method === 'POST') {
  try {
    if (isset($_GET['recordUpdate']) && $_GET['recordUpdate'] === '1') {
      $raw = file_get_contents('php://input');
      $payload = json_decode($raw, true) ?: [];

      $message = isset($payload['message']) ? trim($payload['message']) : '';
      $type = isset($payload['type']) ? trim($payload['type']) : 'info';
      $bookid = isset($payload['bookid']) ? (int)$payload['bookid'] : null;

      if ($message === '' || !in_array($type, ['info','success','warning','danger'], true)) {
        http_response_code(422);
        echo json_encode(['success' => false, 'error' => 'Missing or invalid fields']);
        exit;
      }

      $stmt = $pdo->prepare('
        INSERT INTO updates (message, type, created_at, bookid)
        VALUES (:message, :type, NOW(), :bookid)
      ');

      $stmt->execute([
        ':message' => $message,
        ':type' => $type,
        ':bookid' => $bookid,
      ]);

      echo json_encode(['success' => true, 'data' => ['id' => (int)$pdo->lastInsertId()]]);
      exit;
    }

    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true);

    $title = isset($payload['title']) ? trim($payload['title']) : '';
    $author = isset($payload['author']) ? trim($payload['author']) : '';
    $category = isset($payload['category']) ? trim($payload['category']) : '';
    $quantity = isset($payload['quantity']) ? (int)$payload['quantity'] : 0;
    $status = isset($payload['status']) ? trim($payload['status']) : 'available';

    if ($title === '' || $author === '' || $category === '' || $quantity < 0) {
      http_response_code(422);
      echo json_encode(['success' => false, 'error' => 'Missing or invalid fields']);
      exit;
    }

    $stmt = $pdo->prepare('
      INSERT INTO library (title, author, category, quantity, status)
      VALUES (:title, :author, :category, :quantity, :status)
    ');

    $stmt->execute([
      ':title' => $title,
      ':author' => $author,
      ':category' => $category,
      ':quantity' => $quantity,
      ':status' => $status,
    ]);

    echo json_encode([
      'success' => true,
      'data' => [
        'bookid' => (int)$pdo->lastInsertId(),

        'title' => $title,
        'author' => $author,
        'category' => $category,
        'quantity' => $quantity,
        'status' => $status,
      ],
    ]);
  } catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
  }
  exit;
}

// Original handler moved above.

if (false) {
  try {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true);

    $title = isset($payload['title']) ? trim($payload['title']) : '';
    $author = isset($payload['author']) ? trim($payload['author']) : '';
    $category = isset($payload['category']) ? trim($payload['category']) : '';
    $quantity = isset($payload['quantity']) ? (int)$payload['quantity'] : 0;
    $status = isset($payload['status']) ? trim($payload['status']) : 'available';

    if ($title === '' || $author === '' || $category === '' || $quantity < 0) {
      http_response_code(422);
      echo json_encode(['success' => false, 'error' => 'Missing or invalid fields']);
      exit;
    }

    $stmt = $pdo->prepare('
      INSERT INTO library (title, author, category, quantity, status)
      VALUES (:title, :author, :category, :quantity, :status)
    ');

    $stmt->execute([
      ':title' => $title,
      ':author' => $author,
      ':category' => $category,
      ':quantity' => $quantity,
      ':status' => $status,
    ]);

    echo json_encode([
      'success' => true,
      'data' => [
        'bookid' => (int)$pdo->lastInsertId(),

        'title' => $title,
        'author' => $author,
        'category' => $category,
        'quantity' => $quantity,
        'status' => $status,
      ],
    ]);
  } catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
  }
  exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);

