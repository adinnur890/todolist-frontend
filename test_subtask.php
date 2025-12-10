<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Test basic response
echo json_encode(array("message" => "API subtask berfungsi", "status" => "ok"));
?>