<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Create todos table if not exists
    $create_todos = "CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('pending', 'completed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    // Create subtasks table if not exists
    $create_subtasks = "CREATE TABLE IF NOT EXISTS subtasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        todo_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        status ENUM('pending', 'completed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE
    )";
    
    $db->exec($create_todos);
    $db->exec($create_subtasks);
    
    echo json_encode(array("message" => "Tables created successfully", "status" => "ok"));
    
} catch (Exception $e) {
    echo json_encode(array("message" => "Error: " . $e->getMessage(), "status" => "error"));
}
?>