<?php
$host = "localhost";
$dbname = "digital_library";
$username = "root";
$password = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    // echo "Connected successfully!";

} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>