<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include_once 'database.php';

$database = new Database();
$db = $database->getConnection();

// Auto create subtasks table if not exists
try {
    $create_table = "CREATE TABLE IF NOT EXISTS subtasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        todo_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        status ENUM('pending', 'completed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE
    )";
    $db->exec($create_table);
} catch (PDOException $e) {
    // Table already exists or other error, continue
}

// Get token from header
$headers = apache_request_headers();
$token = null;
if (isset($headers['Authorization'])) {
    $token = str_replace('Bearer ', '', $headers['Authorization']);
}

if (!$token) {
    http_response_code(401);
    echo json_encode(array("message" => "Token tidak ditemukan"));
    exit();
}

// Verify token and get user
$query = "SELECT id FROM users WHERE remember_token = :token";
$stmt = $db->prepare($query);
$stmt->bindParam(":token", $token);
$stmt->execute();

if ($stmt->rowCount() == 0) {
    http_response_code(401);
    echo json_encode(array("message" => "Token tidak valid"));
    exit();
}

$user = $stmt->fetch(PDO::FETCH_ASSOC);
$user_id = $user['id'];

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

switch ($method) {
    case 'GET':
        // Get subtasks by todo_id
        $todo_id = $_GET['todo_id'] ?? null;
        if (!$todo_id) {
            http_response_code(400);
            echo json_encode(array("message" => "Todo ID diperlukan"));
            exit();
        }

        $query = "SELECT s.* FROM subtasks s 
                  JOIN todos t ON s.todo_id = t.id 
                  WHERE s.todo_id = :todo_id AND t.user_id = :user_id 
                  ORDER BY s.created_at ASC";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":todo_id", $todo_id);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        
        $subtasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($subtasks);
        break;

    case 'POST':
        if (strpos($path, 'change-status') !== false) {
            // Change subtask status
            $data = json_decode(file_get_contents("php://input"));
            
            if (!isset($data->subtask_id) || !isset($data->status)) {
                http_response_code(400);
                echo json_encode(array("message" => "Data tidak lengkap"));
                exit();
            }

            $query = "UPDATE subtasks s 
                      JOIN todos t ON s.todo_id = t.id 
                      SET s.status = :status 
                      WHERE s.id = :subtask_id AND t.user_id = :user_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":status", $data->status);
            $stmt->bindParam(":subtask_id", $data->subtask_id);
            $stmt->bindParam(":user_id", $user_id);
            
            if ($stmt->execute()) {
                echo json_encode(array("message" => "Status berhasil diperbarui"));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Gagal memperbarui status"));
            }
        } else {
            // Create subtask
            $todo_id = $_GET['todo_id'] ?? null;
            $data = json_decode(file_get_contents("php://input"));
            
            if (!$todo_id || !isset($data->title)) {
                http_response_code(400);
                echo json_encode(array("message" => "Data tidak lengkap"));
                exit();
            }

            // Verify todo belongs to user
            $check_query = "SELECT id FROM todos WHERE id = :todo_id AND user_id = :user_id";
            $check_stmt = $db->prepare($check_query);
            $check_stmt->bindParam(":todo_id", $todo_id);
            $check_stmt->bindParam(":user_id", $user_id);
            $check_stmt->execute();
            
            if ($check_stmt->rowCount() == 0) {
                http_response_code(403);
                echo json_encode(array("message" => "Akses ditolak"));
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
        }
        break;

    case 'PUT':
        // Update subtask
        $subtask_id = end($path_parts);
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->title)) {
            http_response_code(400);
            echo json_encode(array("message" => "Data tidak lengkap"));
            exit();
        }

        $query = "UPDATE subtasks s 
                  JOIN todos t ON s.todo_id = t.id 
                  SET s.title = :title 
                  WHERE s.id = :subtask_id AND t.user_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":title", $data->title);
        $stmt->bindParam(":subtask_id", $subtask_id);
        $stmt->bindParam(":user_id", $user_id);
        
        if ($stmt->execute()) {
            $get_query = "SELECT s.* FROM subtasks s 
                          JOIN todos t ON s.todo_id = t.id 
                          WHERE s.id = :id AND t.user_id = :user_id";
            $get_stmt = $db->prepare($get_query);
            $get_stmt->bindParam(":id", $subtask_id);
            $get_stmt->bindParam(":user_id", $user_id);
            $get_stmt->execute();
            
            echo json_encode($get_stmt->fetch(PDO::FETCH_ASSOC));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Gagal mengupdate subtask"));
        }
        break;

    case 'DELETE':
        // Delete subtask
        $subtask_id = end($path_parts);
        
        $query = "DELETE s FROM subtasks s 
                  JOIN todos t ON s.todo_id = t.id 
                  WHERE s.id = :subtask_id AND t.user_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":subtask_id", $subtask_id);
        $stmt->bindParam(":user_id", $user_id);
        
        if ($stmt->execute()) {
            echo json_encode(array("message" => "Subtask berhasil dihapus"));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Gagal menghapus subtask"));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method tidak diizinkan"));
        break;
}
?>