<?php
echo 1;
$DR = $_SERVER["DOCUMENT_ROOT"];
include($DR . '/init/func.php');
include($DR . '/init/db_connect.php');

require_once($DR . '/admin/parser_html/simple_html_dom.php');

$url = 'http://192.168.100.17/admin/parser_html/temp_stations.html';
$html_list = file_get_html($url);

$q = "INSERT INTO stations (place_id, name, IP) VALUES (:id, :n, :ip)";
$stmt  = $pdo->prepare($q);
foreach ($html_list->find('table tbody tr[valign="middle"]') as $poz) {

    $place = explode('_', $poz->find('td', 0)->plaintext);
    if ($place[0] == 'botakhan') $place_id = 5;
    elseif ($place[0] == 'kainar') $place_id = 1;
    elseif ($place[0] == 'uzk') $place_id = 3;
    elseif ($place[0] == 'prorva') $place_id = 4;
    elseif ($place[0] == 'vostoch') $place_id = 2;

    $name = explode(' ', $poz->find('td', 2)->plaintext);
    $ip = explode(':', $poz->find('td', 3)->plaintext);
    $params = [
        ':id' => $place_id,
        ':n' => 'Скв.' . $name[1],
        ':ip' => $ip[0]
    ];
    //var_dump($params);
    $stmt->execute($params);
    //echo '<pre>' . htmlspecialchars(print_r($params, 1)) . '</pre>';
    //break;
}
?>