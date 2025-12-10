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
    
    if (!empty($data->email) && !empty($data->password)) {
        
        $query = "SELECT id, name, email, password, is_premium FROM users WHERE email = :email";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":email", $data->email);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (password_verify($data->password, $row['password'])) {
                $token = bin2hex(random_bytes(32));
                
                // Update token di database
                $update_query = "UPDATE users SET token = :token WHERE id = :id";
                $update_stmt = $db->prepare($update_query);
                $update_stmt->bindParam(":token", $token);
                $update_stmt->bindParam(":id", $row['id']);
                $update_stmt->execute();
                
                http_response_code(200);
                echo json_encode(array(
                    "token" => $token,
                    "user" => array(
                        "id" => $row['id'],
                        "name" => $row['name'],
                        "email" => $row['email'],
                        "role" => $row['email'] === 'adinadmin@gmail.com' ? 'admin' : 'user',
                        "is_premium" => $row['is_premium']
                    )
                ));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Password salah"));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Email tidak ditemukan"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Email dan password harus diisi"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>