<?php
header('content-type:text/html;charset=utf-8');
require "conn.php";

if(isset($_POST['sort'])){
    $sort = $_POST['sort'];
    $result = $conn->query("select *from goods where sort_1 = '$sort'");
    $arrdata=array();
    for($i=0;$i<$result->num_rows;$i++){
        $arrdata[$i]=$result->fetch_assoc();
    }
    echo json_encode($arrdata);
}
// $sort ="电视产品";

