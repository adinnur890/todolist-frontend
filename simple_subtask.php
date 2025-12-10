<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 3600");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

include_once 'database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method == 'GET') {
        $todo_id = $_GET['todo_id'] ?? 1;
        
        $query = "SELECT * FROM subtasks WHERE todo_id = :todo_id ORDER BY created_at ASC";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":todo_id", $todo_id);
        $stmt->execute();
        
        $subtasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($subtasks);
    } elseif ($method == 'POST') {
        $todo_id = $_GET['todo_id'] ?? null;
        $raw_input = file_get_contents("php://input");
        $data = json_decode($raw_input);
        
        // Debug log
        error_log("POST Data: " . $raw_input);
        error_log("Todo ID: " . $todo_id);
        
        if (!$todo_id || !isset($data->title)) {
            http_response_code(400);
            echo json_encode(array("message" => "Data tidak lengkap", "debug" => array("todo_id" => $todo_id, "data" => $data)));
            exit();
        }

        $query = "INSERT INTO subtasks (todo_id, title, status, created_at) VALUES (:todo_id, :title, 'pending', NOW())";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":todo_id", $todo_id);
        $stmt->bindParam(":title", $data->title);
        
        if ($stmt->execute()) {
            $subtask_id = $db->lastInsertId();
            $get_query = "SELECT * FROM subtasks WHERE id = :id";
            $get_stmt = $db->prepare($get_query);
            $get_stmt->bindParam(":id", $subtask_id);
            $get_stmt->execute();
            
            echo json_encode($get_stmt->fetch(PDO::FETCH_ASSOC));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Gagal menambahkan subtask"));
        }
    } else {
        echo json_encode(array("message" => "Method not allowed"));
    }
    
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
?>