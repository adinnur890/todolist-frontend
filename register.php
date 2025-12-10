<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'database.php';

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
        
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
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(array("message" => "User berhasil didaftarkan"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Gagal mendaftarkan user"));
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