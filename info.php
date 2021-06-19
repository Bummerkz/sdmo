<?php

//echo '/data/setArchive.php?d={now}&id=a1&s=1684&ss=1700&msg='.rawurlencode('/data/setReg.php?d=2018-10-05%2007:08:01&id=a1&n=1&r=1610,1612,1613,1614,1617,1622,1630,1639,1660,1959,1991,1997,1998,1999&v=0,0,0,0,0,0,313,31,0,0,0,100,0,0&transfer=1')
echo urldecode('%2Fdata%2FsetReg.php%3Fd%3D2018-10-05%252007%3A08%3A01%26id%3Da1%26n%3D1%26r%3D1610%2C1612%2C1613%2C1614%2C1617%2C1622%2C1630%2C1639%2C1660%2C1959%2C1991%2C1997%2C1998%2C1999%26v%3D0%2C0%2C0%2C0%2C0%2C0%2C313%2C31%2C0%2C0%2C0%2C100%2C0%2C0%26transfer%3D1');
//phpinfo();


/*
$db = [];

$db['username'] = 'root';
$db['password'] =  'Emba2015';
$db['Name'] =  'sdmo';
$a['db'] = $db;
echo json_encode($a);
*/
/*
ini_set('display_errors', 1);
error_reporting(E_ALL);

$hostname = "192.168.17.160";
$username = "root";
$password = "Emba2015";
$dbName = "sdmo";

// php 7.0
$dsn = "mysql:host=$hostname;dbname=$dbName;charset=utf8";
$opt = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
);
$pdo = new PDO($dsn, $username, $password, $opt);



$stmt = $pdo->query('SELECT * FROM stations WHERE active = 1 order by name asc');

$res = [];
while ($r = $stmt->fetch()) {
    $r['info'] = json_decode($r['info'], true);
    $res[$r['id']] = $r;
}

echo '<pre>' . htmlspecialchars(print_r($res, 1)) . '</pre>';
*/
?>