<?php
error_reporting(E_ALL);
include($_SERVER['DOCUMENT_ROOT'] . '/init/db_connect.php');
include($_SERVER['DOCUMENT_ROOT'] . '/init/func.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/include/status_1999.php');
?>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title><?= defined('SDMO_TITLE') ? SDMO_TITLE : ($USER['company'] ? $USER['company'] : 'СДМО' . ' | ООО «Ойл Сервисиз Альянс»')?></title>
    <meta name="author" content="OSA">
    <link type="image/jpg" rel="icon" href="/images/favicon.jpg">

    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/bootstrap-dtetimepicker.css" rel="stylesheet">
    <link href="/css/style.css?<?=VERSIA?>" rel="stylesheet">
    <link href="/css/jquery.stickyheader.css?<?=VERSIA?>" rel="stylesheet">
    <script type="text/javascript" src="/js/jq1.11.0.min.js"></script>
   
    <script type="text/javascript" src="/js/jquery-ui.custom.js"></script>

    <script type="text/javascript" src="/js/jquery.stickyheader.js?<?=VERSIA?>"></script>
    <script type="text/javascript" src="/js/jquery.cookie.js"></script>
    <script type="text/javascript" src="/js/bootstrap.min.js"></script>
    
    <?php /*
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
 */?>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <?php if (CONNECTION) {?>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
    <script type="text/javascript" src="/js/yandex_map.js?<?=VERSIA?>"></script>
    <?php } else { ?>
    <link rel="stylesheet" href="/js/leaflet/leaflet.css" />
    <script type="text/javascript" src="/js/leaflet/leaflet.js"></script>
    <script type="text/javascript" src="/js/leaflet_map.js?<?=VERSIA?>"></script>
    <?php } ?>
</head>
<body>
<?php
    
    
    

    $stmt = $pdo->query("SELECT st.*, fdd.*,pl.name as plname FROM stations st INNER JOIN fc_data_last fdd ON(st.id = fdd.station_id) "
            . "INNER JOIN place pl ON(st.place_id = pl.id) "
            . "WHERE st.active = 1 AND fdd.reg='880' order by pl.id asc");
    
    while ($r = $stmt->fetch()) {
        $aSt[$r['id']] = $r;
    }


  //  $stmt = $pdo->query("SELECT day FROM fc_data_day where reg = '880' AND day >= '2019-03-04' GROUP BY day ORDER BY day ASC");
    $count_days = 5;
    ?> 
        
<table border="1" style="text-align: center;" class="table align-middle text-center table-bordered">
        <tr>
            <td>Скв</td>
            <td>Параметры</td>
            <?php    
            
            
            $begin = new DateTime( '2021-05-03' );
            $end = new DateTime( '2021-05-06' );

            $interval = DateInterval::createFromDateString('1 day');
            $period = new DatePeriod($begin, $interval, $end);

            foreach ( $period as $dt ) {
                
                echo "<td>".$dt->format( "Y-m-d" )."</td>";
               $days[] = $dt->format( "Y-m-d" );
            }

    
        ?>
        </tr>
        
        
        <?php

    foreach ($aSt as $st_id => $st) {
        $a881 = array();
        $a880 = array();
        ?>
        

            
        <tr style="border-top:1pt solid black;" scope="row">
                <td rowspan="3" class="align-middle" style="vertical-align: middle"><?= $st['name'] ?>(<?= $st['plname'] ?>)</td>
                <td><?= $st['router_soft_ver'] ?> (router ver)</td>
                
                <?php foreach ($days as $key => $day){ 
                    if($key == 0)
                        continue;
                    
                    $stmt = $pdo->query("SELECT * FROM fc_data_day where reg = '880' AND day = '$day' AND station_id = $st_id ORDER BY id ASC LIMIT 1 ");
                    
                    if ($r = $stmt->fetch()) {
                        $a880[] = $r['value'];
                        echo "<td>".$r['value']."</td>";
                    } else {
                        $a880[] = 0;
                        echo "<td>-</td>";
                    }
                    

                    
                    ?>

                <?php } ?>
            </tr>
            <tr>
                <td><?= $st['fc_1543'] ?> (1543)</td>
                
                <?php foreach ($days as $day){ 
                    
                    $stmt = $pdo->query("SELECT * FROM fc_data_day where reg = '881' AND day = '$day' AND station_id = $st_id ORDER BY id ASC LIMIT 1 ");
        
        
                    if ($r = $stmt->fetch()) {
                        $a881[] = $r['value'];
                        echo "<td>".$r['value']."</td>";
                    } else {
                        $a881[] = 0;
                        echo "<td>-</td>";
                    }
                    
                    ?>
                    
                <?php } ?>
            </tr>
            <tr>
                <td><?= $st['fc_1549'] ?>(1549)</td>
                    <?php for($i=0; $i< sizeof($days); $i++) {

                        
                        $delta881 = $a881[$i] - $a881[$i-1];
                        $delta880 = $a880[$i] - $a880[$i-1];
                        
                        if($delta880 != 0)
                            $result = number_format((($delta881/ $delta880)*100),2);
                        else 
                            $result =  number_format(0,2);
                        
                        echo "<td>".$result."%</td>";

                    
                    ?>
                    
                <?php } ?>
            </tr>
            

        
        <?php
    }


    ?>         </table>

<?php



















die;
$placeID = $_REQUEST['place_id'];
if(!$placeID) {
    $places = get_last_child_places();
    foreach ($places as $place) {
        ?>
        <a href="/include/other/report88.php?place_id=<?= $place['id']?>" ><?= $place['name'] ?></a><br />
    


    <?php
    }
} else {
    
    
    
    
    
    ?> 
    <table>
        <tr>
            <td></td>
            <td></td>
            <td>dates</td> 
        </tr>
    </table>
    foreach ($st_s as $st) {
        ?>
        
        <table>
            
            <tr>
                <td rowspan="3"><?= $st['name'] ?></td>
                <td><?= $st['fc_1549'] ?></td>
                <td><?= $st['fc_1549'] ?></td>
                <td><?= $st['router_soft_ver'] ?></td>
            </tr>
            <tr>
                <td></td>
                
                
            </tr>
            
            
        </table>
        
        <?php
    }
    ?> </body>