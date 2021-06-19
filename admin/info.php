<?php

include("../init/db_connect.php");
include('../init/func.php');

//echo serialize(['fio'=>'Муканов Нурлан']).'</br>';
//echo json_encode(['fio'=>'Виталий Колупаев']).'</br>';
echo md5('544855');

echo '<br>';

$typeReg = array(
    'Int8' => 1,
    'Int16' => 2,
    'Int32' => 3,
    'Uint8' => 4,
    'Uint16' => 5,
    'Uint32' => 6
);

$arrReg = get_fc_reg(false, 1);
foreach ($arrReg as $reg) {
    $r[] = $reg['addr'];
    $v[] = $reg['type'] ? $typeReg[$reg['type']] : 5;
    $m[] = $reg['dynamic'] ? 0 : 1;
}
echo $url = 'setParam.php?r=' . implode(',', $r) . '&v=' . implode(',', $v) . '&m=' . implode(',', $m) . '</br>';

$_REQUEST['IP'] = isset($_REQUEST['IP']) ? '/' : $_REQUEST['IP'];
?>

    <p>
        1. очистить список адресов регистров:</br>
        <a href="<?= $_REQUEST['IP'] ?>:8080/clearParam.php" target="_blank"><?=$_REQUEST['IP']?>
            :8080/clearParam.php</a></br>
    </p>
    <p>
        2. записать адреса регистров (поддерживаются оба формата):</br>
        http://router_ip:8080/setParam.php?r=1&v=тип&m=режим</br>
        где тип =</br>
        1 - "Int8 – целое 8-битовое число"</br>
        2 - "Int16 – целое 16-битовое число"</br>
        3 - "Int32 – целое 32-битовое число"</br>
        4 - "Uint8 – целое беззнаковое 8-битовое число"</br>
        5 - "Uint16 – целое беззнаковое 16-битовое число"</br>
        6 - "Uint32 – целое беззнаковое 32-битовое число"</br>
        где режим=</br>
        0 - данные передаются все время, динамические</br>
        1 - данные передаются по изменению, статические</br>
        2* - регистр осциллограммы</br>
        ?r=1617,1622&v=3,2&m=2,2
    </p>

    <p>
        3. получить текущие значения регистров (для отладки):</br>
        http://localhost:8080/getReg.php</br>
    </p>
    <p>
        3. получить текущие значения регистров ЭЛЕКТРОСЧЕТЧИКА:</br>
        http://localhost:8080/getElectric.php</br>
    </p>

    <p>
        4. записать данные (поддерживаются оба формата):</br>
        http://localhost:8080/setReg.php?r=1,2,3&v=1,2,3</br>
    </p>
    <p>
        5. получить текущие значения настроек программы (настройки RS485, скорость, интервалы передачи и т.д.)</br>
        http://localhost:8080/getSetup.php</br>
        [1] ip=192.168.0.100</br>
        [2] port=80</br>
        [3] mode=0</br>
        [4] interval=1</br>
        [5] rs485.baud=9600</br>
        [6] rs485.parity=E</br>
        [7] rs485.data=8</br>
        [8] rs485.stop=1</br>
        [9] rs485.interval=1</br>
    </p>
    <p>
        6. установить параметры настроек программы</br>
        http://localhost:8080/setSetup.php?r=1,2,3&v=1,2,3</br>
    </p>
    <p>
        7. получить архивные данные за дату</br>
        http://localhost:8080/getArchive.php?d=2016-05-12</br>
    </p>
    <p>
        Команды ОТ РОБУСТЕЛА:</br>
        1. сохранить значение регистров на сервере (поддерживаются оба формата):</br>
        http://localhost/setReg.php?r=1,2,3&v=1,2,3&d=2016-05-12+00:00:00</br>
    </p>
    <p>
        2. регистр ошибок робустела - 2000</br>
        значения:</br>
        0 - нет ошибок</br>
        1 - обрыв связи с данфоссом</br>
    </p>
<?php

$aPlace = get_place();
foreach ($aPlace as $place) {
    $aSt = get_stations($place['id'], false, false);
    echo '<h3>' . $place['name'] . '</h3>';
    echo '<table>
    <tr>
    <th>Название</th>
    <th>IP</th>
    <th>port</th>
    </tr>';
    foreach ($aSt as $st) {
         echo '<tr>
         <td>'.$st['name'].'</td>
         <td>'.$st['IP'].'</td>
         <td>'.$st['port'].'</td>
         </tr>';
    }
    echo '</table>';
}

?>