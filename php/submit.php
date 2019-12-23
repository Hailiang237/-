<?php
require "conn.php";
$conn->query('SET NAMES UTF8'); //设置字符集

// echo 1;
if ($_POST['email']) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    $password = sha1($password);
    $conn->query("insert user values(null,'$email','$phone','$password')");
}
