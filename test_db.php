<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db) {
        echo json_encode(array("message" => "Database connection berhasil", "status" => "ok"));
    } else {
        echo json_encode(array("message" => "Database connection gagal", "status" => "error"));
    }
} catch (Exception $e) {
    echo json_encode(array("message" => "Error: " . $e->getMessage(), "status" => "error"));
}
?>