<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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

if ($method === 'GET') {
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

if ($method === 'POST') {
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

