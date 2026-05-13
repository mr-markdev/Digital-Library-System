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

function getPdo() {
  global $pdo;
  return $pdo;
}

$pdo = getPdo();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  try {
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
    if ($limit <= 0) $limit = 20;

    $stmt = $pdo->prepare('
      SELECT id, message, type, created_at
      FROM updates
      ORDER BY created_at DESC
      LIMIT :limit
    ');
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $updates = array_map(function ($r) {
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

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);

