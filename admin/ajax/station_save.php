<?php
ob_start();
include_once("../../init/db_connect.php");
include_once("../../init/func.php");
try{
if ($_POST['name'] AND $_POST['place_id']) {
  $is_error = false;
  // проверим на название
  if ($st = get_station(false, $_POST['name'], false)) {
    $is_error = true;
      $res['mess'] = 'Станция с таким именем уже есть';
  }
  // проверим на код
  // $current_server = get_server(false,false, false,$_POST['place_id']?$_POST['place_id']:false);
  // print_r($current_server);

 $code = $_POST['info_data_28']? $_POST['info_data_28']:false;
  if (!$is_error && $code) {
    try{
      $sql = 'SELECT `id` FROM `stations` where `code`="' . $code . '"';
      $stmt = $pdo->query($sql);
      $res = [];
      while ($r = $stmt->fetch()) {
        //       if ($r = mysql_fetch_assoc($q)) {
        $is_error = true;
          $res['mess'] = 'Станция с таким кодом уже есть';
          break;
      }
    }
    catch (Exception $e) {
        $res['mess'] = 'Возникла ошибка';
      echo 'Выброшено исключение: ',  $e->getMessage(), "\n";
     }
  }

  if (!$is_error) {
    //проверяем сервер по месторождению
  //    $current_server = get_server(false,false, false,$_POST['place_id']?$_POST['place_id']:false);
  //    print_r($current_server);
      // if (is_array($current_server)){
      //   $server_id = array_shift($current_server)['id'];
      // }
//    else{
        $server_id = 2;
  //    }
      try{
        $stmt = $pdo->prepare('INSERT INTO stations (name, place_id, active, local_id, type_electric, type_1900, server_id, code) VALUES (:name, :place_id, :active, :local_id, :type_electric, :type_1900, :server_id, :code)');
        $qq = $stmt->execute([
            ':name' => $_POST['name'],
            ':place_id' =>$_POST['place_id'],
            ':active' => $_POST['active'] ? 1 : 0,
            ':local_id' => isset($_POST['local_id']) ? $_POST['local_id'] : 0,
            ':type_electric' => $_POST['type_electric'],
            ':type_1900' => $_POST['type_pump'],
            ':server_id' => $server_id,
            ':code' => $code?$code:'null'
        ]);

      }
      catch (Exception $e) {
        $res['mess'] = 'Выброшено исключение: '.  $e->getMessage(). "\n";
       }
        if ($qq){

            $st = get_station(false, $_POST['name'], false);

            $res['tr'] = '<tr>
                            <td>' . $st['id'] . '</td>
                            <td><a data-toggle="tab" data-id = "'.$st['id'].'" href="#tab_station">' . $st['name'] . '</a></td>
                            <td>' . $st['active'] . '</td>
                            <td>' . $st['type_1900'] . '</td>
                            <td>' . $st['server_id'] . '</td>
                          </tr>';

            $res['place_id'] = $_POST['place_id'];
            $res['mess'] = 'Станция '.$st['name'].' добавлена. ';

            //Дезактивация старой станции
            if (isset($_POST['old_id'])){
              $stmt = $pdo->prepare('UPDATE stations set active = 0  WHERE id = :id');
              if ($stmt->execute([
                  ':id' => $_POST['old_id']
              ])){
                $old_name = $_POST['old_name']?$_POST['old_name']:"";
                  $res['mess'] .= 'Станция '.$old_name.' отключена. ';
              }
            }

        } else {
        //    print_r('pek');
          //  $res['mess'] = 'Добавить станцию не удалось!';
        }
    }
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
    //$res['mess'] = '<pre>' . htmlspecialchars(print_r($_POST, 1)) . '</pre>';
    $res['mess'] = 'Необходимо указать наименование станции';
  }

$res['res'] = 1;
$res['txt'] = ob_get_contents();
ob_end_clean();

print json_encode($res);
}
 catch (Exception $e) {
  //      $res['mess'] = 'Возникла ошибка';
      echo 'Выброшено исключение: ',  $e->getMessage(), "\n";
}
