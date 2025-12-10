<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'database.php';

$database = new Database();
$db = $database->getConnection();

// Cleanup email kosong jika ada parameter cleanup
if (isset($_GET['cleanup'])) {
    try {
        $cleanup_query = "DELETE FROM users WHERE email = '' OR email IS NULL";
        $cleanup_stmt = $db->prepare($cleanup_query);
        if ($cleanup_stmt->execute()) {
            echo json_encode(array("message" => "Berhasil menghapus " . $cleanup_stmt->rowCount() . " user dengan email kosong"));
        }
    } catch (PDOException $e) {
        echo json_encode(array("error" => $e->getMessage()));
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->name) && !empty($data->email) && !empty($data->password) && trim($data->email) !== '') {
        
        // Cek email sudah ada
        $check_query = "SELECT id FROM users WHERE email = :email";
        $check_stmt = $db->prepare($check_query);
        $check_stmt->bindParam(":email", $data->email);
        $check_stmt->execute();
        
        if ($check_stmt->rowCount() > 0) {
            http_response_code(400);
            echo json_encode(array("message" => "Email sudah terdaftar"));
            exit();
        }
        
        // Insert user baru
        $query = "INSERT INTO users (name, email, password, created_at) VALUES (:name, :email, :password, NOW())";
        $stmt = $db->prepare($query);
        
        $hashed_password = password_hash($data->password, PASSWORD_DEFAULT);
        
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":email", $data->email);
        $stmt->bindParam(":password", $hashed_password);
        
        try {
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array("message" => "User berhasil didaftarkan"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Gagal mendaftarkan user"));
            }
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                http_response_code(400);
                echo json_encode(array("error" => "Email sudah terdaftar"));
            } else {
                http_response_code(503);
                echo json_encode(array("error" => "Database error: " . $e->getMessage()));
            }
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Data tidak lengkap"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>