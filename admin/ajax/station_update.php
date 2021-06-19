<?php
ob_start();
include_once("../../init/db_connect.php");
include_once("../../init/func.php");

if ($_POST['station_id'] AND $_POST['place_id']) {
  try {
    $stmt = $pdo->prepare('UPDATE stations set name =:name, place_id =:place_id, active = :active, local_id = :local_id, type_electric = :type_electric, type_1900 = :type_1900 WHERE id = :id');
    $res_sql = $stmt->execute([
        ':id' => $_POST['station_id'],
        ':name' => $_POST['name'],
        ':place_id' =>$_POST['place_id'],
        ':active' => $_POST['active'] ? 1 : 0,
        ':local_id' => $_POST['local_id'] ? $_POST['local_id'] : '0',
        ':type_electric' => $_POST['type_electric'],
        ':type_1900' => $_POST['type_pump']

    ]);
  } catch (Exception $e) {
    // exception is raised and it'll be handled here
      echo $e->getMessage();// contains the error message
    }
  
      
        if ($res_sql) {
            $st = get_station($_POST['station_id'], false, false);

            $res['tr'] = '<tr>
                            <td>' . $st['id'] . '</td>
                            <td><a data-toggle="tab" data-id = "'.$st['id'].'" href="#tab_station">' . $st['name'] . '</a></td>
                            <td>' . $st['active'] . '</td>
                            <td>' . $st['type_1900'] . '</td>
                            <td>' . $st['server_id'] . '</td>
                          </tr>';
            
            $res['station_id'] = $_POST['station_id'];
            $res['mess'] = 'Станция '.$st['name'].' обновлена!';

            
            
    include('../../include/station_info_tables_conf.php'); //$configTableStation

    $q = "UPDATE stations SET code = :code, IP = :IP, port = :port, antena = :antena, sector = :sector, info = :info WHERE id = :id;";
    $stmt = $pdo->prepare($q);
    unset($_REQUEST['info_data_id']);

    $name = $_REQUEST['info_data_25'];
    unset($_REQUEST['info_data_25']);

    $code = $_REQUEST['info_data_28'];
    unset($_REQUEST['info_data_28']);

    $IP = $_REQUEST['info_data_23'];
    unset($_REQUEST['info_data_23']);

    $port = $_REQUEST['info_data_24'];
    unset($_REQUEST['info_data_24']);

    $antena = $_REQUEST['info_data_26'];
    unset($_REQUEST['info_data_26']);

    $sector = $_REQUEST['info_data_27'];
    unset($_REQUEST['info_data_27']);

    //$type_1900 = $_REQUEST['info_data_61'];
    unset($_REQUEST['info_data_61']);

    $info = [];

    foreach ($configTableStation as $arrRow) {
        foreach ($arrRow as $info_data_id => $n) {
            if ($_REQUEST[$info_data_id])
                $info[$info_data_id] = $_REQUEST[$info_data_id];
        }
    }

    $start_station = strtotime($info['info_data_84']);
    if($start_station < strtotime('2000-01-01')){
        $additional_error = Dictionary::t('AJAX_SAVE_STATION_INFO', 'ADDITIONAL_ERROR');
        $info['info_data_84'] = '';
    } else {
        $info['info_data_84'] = date('Y-m-d h:i:s',$start_station);
    }

    if ($info OR $IP OR $port) {
        $params = [
            ':code' => $code,
            ':IP' => $IP,
            ':port' => $port,
            ':antena' => $antena,
            ':sector' => $sector,
            ':info' => json_encode($info),
            ':id' => $st['id']
        ];
        
        $stmt->execute($params);
        echo Dictionary::t('AJAX_SAVE_STATION_INFO', 'SAVE_DATA_SUCCESS').$additional_error;
    } else {
        echo Dictionary::t('AJAX_SAVE_STATION_INFO', 'NOT_DATA');
    }
            
        } else {
            $res['mess'] = 'Обновить станцию не удалось!';
        }

} else {
    $res['mess'] = '<pre>' . htmlspecialchars(print_r($_POST, 1)) . '</pre>';
}

$res['res'] = 1;
$res['txt'] = ob_get_contents();
ob_end_clean();

print json_encode($res);
