<?php

include_once("../../init/db_connect.php");
include_once("../../init/func.php");

if($USER['type'] <= 10) {
    
    return del_user($_POST['user_id']);
}else
    return false;