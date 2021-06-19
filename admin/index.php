<?php
$DIR = dirname(__FILE__);
include_once("../init/db_connect.php");
include_once('../init/func.php');

$user_id = is_login();
if ($user_id === false OR $_GET['logout']) {
    header('Location: /login.php?back=/admin/');
    exit;
}

if (!in_array(1, $USER['rules']) && $USER['type'] > 10) {
    header('Location: /index.php');
    exit;
}

include_once('../init/dictionary/phpJsVarible.php');
include_once $DIR.'/them/header.php';
?>

    <div class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="logo" href="/"><img src="/images/logo.jpg"></a>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Меню</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">

                    <li><a href="/">СДМО</a></li>
                    <li><a href="/robustel">Настройки связи</a></li>
                    <li><a href="#" class="modal-help" data-toggle="modal" data-target="#Modal"><span class="glyphicon glyphicon-book"></span> Справка</a></li>
                    <li><a href="/?logout=yes&back=/admin/">Выход</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="sidebar">

                <!-- Nav tabs ----------->
               <ul class="nav nav-sidebar">
                   <li class="active"><a href="#tab_users" data-toggle="tab">Пользователи</a></li>
                   <li><a href="#tab_stations" data-toggle="tab">Скважины</a></li>
                   <li><a href="#tab_places" data-toggle="tab">Месторождения</a></li>
                   <li><a href="#tab_interface" data-toggle="tab">Настройки</a></li>
               </ul>

           </div>
           <div class="main">

               <!-- Tab data -->
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_users">
                        <?php include_once($DIR.'/include/users.php') ?>
                    </div>
                    <div class="tab-pane" id="tab_stations">
                        <?php include_once($DIR.'/include/stations.php') ?>
                    </div>
                    <div class="tab-pane" id="tab_places">
                        <?php include_once($DIR.'/include/places.php') ?>
                    </div>
                    <div class="tab-pane" id="tab_interface">
                        В разработке
                    </div>
                    <div class="tab-pane" id="tab_add_user" >
                        <?php include_once($DIR.'/include/add_user.php') ?>
                    </div>
                    <div class="tab-pane" id="tab_add_station">
                        <?php include_once($DIR.'/include/add_station.php') ?>
                    </div>
                    <div class="tab-pane" id="tab_add_place">
                        <?php include_once($DIR.'/include/add_place.php') ?>
                    </div>
                    <div class="tab-pane" id="tab_user">

                    </div>
                    <div class="tab-pane" id="tab_station">

                    </div>
                    <div class="tab-pane" id="tab_place">

                    </div>
                    <div class="tab-pane" id="tab_transfer_station">
                      <?php include_once($DIR.'/include/transfer_station.php') ?>
                    </div>
                </div>
            </div>

            </div>
        </div>
    </div>



<?php include_once $DIR.'/them/footer.php'; ?>
