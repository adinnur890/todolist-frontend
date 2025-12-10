<?php
class Database {
    private $host = "sql200.infinityfree.com"; // Ganti dengan host DB InfinityFree
    private $db_name = "if0_40639621_todolist"; // Ganti dengan nama DB Anda
    private $username = "if0_40639621"; // Ganti dengan username DB
    private $password = "YOUR_DB_PASSWORD_HERE"; // Ganti dengan password DB dari InfinityFree
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>