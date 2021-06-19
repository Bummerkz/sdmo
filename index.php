<?php
//ini_set('display_errors', 1);
//error_reporting(E_ALL);
$DIR = dirname(__FILE__);

include_once($DIR.'/init/db_connect.php');
include_once($DIR.'/init/func.php');
global $USER;
if ( $USER === false OR $_GET['logout']) {
    header('Location: /login.php');
    exit;
}

include_once $DIR.'/them/header.php';
include_once($DIR.'/init/dictionary/phpJsVarible.php');
?>

    <div class="navbar navbar-default" role="navigation">
        <div class="container-fluid">               
            <div class="user-fio"><?= Dictionary::t('MAIN', 'USER') ?>: <b><?=$USER['fio']?></b> 
                <form  method="POST" action="/">
                    <?php if (LANG == 'ru_ru') { ?>
                        <input type="hidden" name="setLang" value="en_gb" />
                        <a onclick="this.parentNode.submit()" >en</a>
                    <?php } else {?>
                        <input type="hidden" name="setLang" value="ru_ru" />
                        <a onclick="this.parentNode.submit()" >ru</a>
                    <?php } ?>
                </form>
            </div>
            <div class="navbar-header">
                <a class="logo" href="/"><img src="<?= (defined('SDMO_LOGO') ? SDMO_LOGO : $USER['companylogo'])?>"></a>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only"><?= Dictionary::t('MAIN', 'MENU') ?></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <?php if (in_array(1, $USER['rules']) || $USER['type'] <= 10):?>
                        <li><a href="/admin"><span class="glyphicon glyphicon-wrench"></span> <?= Dictionary::t('MAIN', 'ADMIN_MODE') ?></a></li>
                    <?php endif; ?>
                    <?php if (IS_SERVER && in_array('50', $USER['rules'])):?>
                        <li><a href=#" class="modal-task" data-toggle="modal" data-target="#Modal"><span class="glyphicon glyphicon-flag"></span> <?= Dictionary::t('MAIN', 'TASKS') ?></a></li>
                    <?php endif; ?>
                    <li><a href="#" onclick="print_page()"><span class="glyphicon glyphicon-print"></span> <?= Dictionary::t('MAIN', 'PRINT') ?></a></li>
                    <li><a href="#" class="modal-help" data-toggle="modal" data-target="#Modal"><span class="glyphicon glyphicon-book"></span> <?= Dictionary::t('MAIN', 'HELP') ?></a></li>
                    <li><a href="#" class="modal-user" data-toggle="modal" data-target="#Modal"><span class="glyphicon glyphicon-user"></span> <?= Dictionary::t('MAIN', 'ACCOUNT') ?></a></li>
                    <li><a href="/?logout=yes"><span class="glyphicon glyphicon-log-out"></span> <?= Dictionary::t('MAIN', 'EXIT') ?></a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="sidebar"> 
                <div id="leftSideBarToggle">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                </div>
                <div class="form-group has-feedback">
                    <input type="search" class="form-control filtr input-sm " placeholder="Поиск" style="width: 94%">
                    <span class="glyphicon glyphicon-remove form-control-feedback clrsearch"></span>
                </div>
                <div id="tree"></div>
            </div>
            <div class="main">

                <p id="namePage">.</p>

                <?php
// echo '<pre>' . htmlspecialchars(print_r($USER, 1)) . '</pre>'; 
                ?>

                <!-- Nav tabs ---------------------------------------------------------------->
                <div class="page PageFolder">
                    <ul class="nav nav-tabs">
                        <li class="active">
                            <a href="#svod_data" data-toggle="tab">
                                <span class="glyphicon glyphicon-list"></span>
                                <?= Dictionary::t('MAIN', 'SUMMARY_DATA') ?>
                            </a>
                        </li>
                        <li>
                            <a href="#report" data-toggle="tab">
                                <span class="glyphicon glyphicon-list-alt"></span>
                                <?= Dictionary::t('MAIN', 'REPORTS') ?>
                            </a>
                        </li>
                        <?php if ($map_active = true): ?>
                            <li>
                                <a href="#map" data-toggle="tab">
                                    <span class="glyphicon glyphicon-map-marker"></span>
                                    <?= Dictionary::t('MAIN', 'MAP') ?>
                                </a>
                            </li>
                        <?php endif;?>

                        <?php if (in_array('30', $USER['rules']) && false):?><!-- Убрана закладка -->
                            <li>
                                <a href="#read_reg" data-toggle="tab">
                                    <span class="glyphicon glyphicon-tasks"></span>
                                    <?= Dictionary::t('MAIN', 'READING_DATA') ?>
                                </a>
                            </li>
                        <?php endif;?>
                    </ul>

                    <!-- Tab data -->
                    <div class="tab-content">
                        <div class="tab-pane active" id="svod_data">
                            <?php include_once($DIR.'/include/svod_data.php') ?>
                        </div>
                        <?php if ($map_active = true): ?>
                            <div class="tab-pane" id="map">
                                <?php include_once($DIR.'/include/map.php') ?>
                            </div>
                        <?php endif;?>
                        <div class="tab-pane" id="report">
                            <?php include_once($DIR.'/include/report.php') ?>
                        </div>
                        <?php if (in_array('30', $USER['rules']) && false):?> <!-- Убрана закладка -->
                            <div class="tab-pane" id="read_reg">
                                <?php include_once($DIR.'/include/read_reg.php') ?>
                            </div>
                        <?php endif;?>
                    </div>
                </div>
                <!-- Nav tabs ---------------------------------------------------------------->
                <div class="page PageStation" style="display: none">
                    <ul class="nav nav-tabs">
                        <li class="active">
                            <a href="#station_data" data-toggle="tab">
                                <span class="glyphicon glyphicon-align-justify"></span>
                                <?= Dictionary::t('MAIN', 'DATA') ?>
                            </a>
                        </li>
                        <li>
                            <a href="#station_trend" data-toggle="tab">
                                <span class="glyphicon glyphicon-signal"></span>
                                <?= Dictionary::t('MAIN', 'GRAPHICS') ?>
                            </a>
                        </li>
                        <li>
                            <a href="#station_days" data-toggle="tab">
                                <span class="glyphicon glyphicon-copyright-mark"></span>
                                <?= Dictionary::t('MAIN', 'DAILY_FIGURES') ?>
                            </a>
                        </li>
                        <?php if ($electric_active = 1): ?>
                            <li>
                                <a href="#electric_tab" data-toggle="tab">
                                    <span class="glyphicon glyphicon-sound-5-1"></span>
                                    <?= Dictionary::t('MAIN', 'ENERGY_METER') ?>
                                </a>
                            </li>
                        <?php endif;?>
                        <?php if ($osc_active = 1): ?>
                            <li>
                                <a href="#station_osc" data-toggle="tab">
                                    <span class="glyphicon glyphicon-indent-left"></span>
                                    <?= Dictionary::t('MAIN', 'OSCILLOGRAMS') ?>
                                </a>
                            </li>
                        <?php endif; ?>
                        <li>
                            <a href="#station_info" data-toggle="tab">
                                <span class="glyphicon glyphicon-dashboard"></span>
                                <?= Dictionary::t('MAIN', 'OPTIONS') ?>
                            </a>
                        </li>
                        
                        <?php if ($USER['type'] < 30):?>
                        <li>
                            <a href="#station_history" data-toggle="tab">
                                <span class="glyphicon glyphicon-book"></span>
                                <?= Dictionary::t('MAIN', 'ISU_HISTORY') ?>
                            </a>
                        </li>
                        <?php endif;?>
                        
                        <?php if (in_array('20', $USER['rules']) || $USER['type'] < 40):?>
                            <li>
                                <a href="#command_tab" data-toggle="tab">
                                    <span class="glyphicon glyphicon-pause"></span>
                                    <?= Dictionary::t('MAIN', 'START/STOP') ?>
                                </a>
                            </li>
                        <?php endif;?>
                        <?php if (in_array('40', $USER['rules'] ) || $USER['type'] < 40 && !IS_DEMO):?>
                            <li>
                                <a href="#dinamo_tab" data-toggle="tab">
                                    <span class="glyphicon glyphicon-indent-left"></span>
                                    <?= Dictionary::t('MAIN', 'DINAMO') ?>
                                </a>
                            </li>
                        <?php endif;?>
                    </ul>

                    <!-- Tab data -->
                    <div class="tab-content">
                        <div class="tab-pane active" id="station_data">
                            <div class="station_crash"></div> 
                            <div class="station_data"></div>
                            <div class="station_data_control"></div>
                        </div>
                        <div class="tab-pane" id="station_trend">
                            <?php include_once($DIR.'/include/station_trend.php') ?>
                        </div>
                        <div class="tab-pane" id="station_days">
                            <?php include_once($DIR.'/include/station_daily.php') ?>
                        </div>
                        <?php if ($electric_active = 1): ?>
                            <div class="tab-pane" id="electric_tab">
                                <?php include_once($DIR.'/include/station_electric.php') ?>
                            </div>
                        <?php endif?>
                        <?php if ($osc_active = 1): ?>
                            <div class="tab-pane" id="station_osc">
                                <?php include_once($DIR.'/include/station_osc.php') ?>
                            </div>
                        <?php endif?>
                        <div class="tab-pane" id="station_info">
                            <?php include_once($DIR.'/include/tab_station_info.php') ?>
                        </div>
                        <?php if ($USER['type'] < 30):?>
                        <div class="tab-pane" id="station_history">
                            <?php include($DIR.'/include/tab_station_info.php') ?>
                        </div>
                        <?php endif;?>
                        <?php if (in_array('20', $USER['rules']) || $USER['type'] < 40):?>
                            <div class="tab-pane" id="command_tab">
                                <?php include_once($DIR.'/include/command_tab.php') ?>
                            </div>
                        <?php endif;?>
                        <?php if (in_array('40', $USER['rules'] ) || $USER['type'] < 40 && !IS_DEMO):?>
                            <div class="tab-pane" id="dinamo_tab">
                                <?php include_once($DIR.'/include/dinamo_tab.php') ?>
                            </div>
                        <?php endif;?>
                    </div>
                </div>

            </div>
        </div>
    </div>
<?php

?>
<?php include_once $DIR.'/them/footer.php'; ?>
