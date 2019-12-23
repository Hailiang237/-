<?php
require "conn.php";
$conn->query('SET NAMES UTF8'); //设置字符集

// echo 1;

if(isset($_POST['email'])){
    // echo 1;
    $email=$_POST['email'];
    // echo $email;
    // echo $email;
    //后端只需要判断当前的用户名是否存在(select)。
    $result=$conn->query("select *from user where email='$email'");
    if($result->fetch_assoc()){
        echo true;//存在 1

    }else{
        echo false;
    }
    
}