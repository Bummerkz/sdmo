<?php
global $USER;
include_once 'init/config.php';
?>
<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title><?= defined('SDMO_TITLE') ? SDMO_TITLE : ($USER['company'] ? $USER['company'] : 'СДМО' . ' | ТОО "Нефтегазовый Сервисный Альянс"')?></title>
    <meta name="author" content="OSA">
    <link type="image/jpg" rel="icon" href="/images/favicon.jpg">

    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/bootstrap-dtetimepicker.css" rel="stylesheet">
    <link href="/js/skin-win8/ui.fancytree.css" rel="stylesheet">
    <link href="/css/style.css?<?=VERSIA?>" rel="stylesheet">
    <link href="/css/jquery.stickyheader.css?<?=VERSIA?>" rel="stylesheet">
    <link href="/css/powerange.css" rel="stylesheet">
    <link href="/css/font-awesome.min.css" rel="stylesheet" >
    <script type="text/javascript" src="/js/jq1.11.0.min.js"></script>
   
    <script type="text/javascript" src="/js/jquery-ui.custom.js"></script>
    <script type="text/javascript" src="/js/jquery.fancytree.js"></script>
    <script type="text/javascript" src="/js/jquery.fancytree.filter.js"></script>
    <script type="text/javascript" src="/js/jquery.fancytree.glyph.js"></script>

    <script type="text/javascript" src="/js/powerange.js"></script>
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