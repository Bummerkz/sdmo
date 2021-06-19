<?php
//ini_set('display_errors', 1); // On тоже не работает
error_reporting(0);
$DIR = dirname(__FILE__);
include($DIR.'/init/db_connect.php');
include($DIR.'/init/func.php');

$login = '';
$bad_login = false;

setcookie('ses', '', -100, '/');

if (isset($_POST['login']) && isset($_POST['password'])) {
    $login = filter_input_text($_POST['login']);
    $password = md5(filter_input_text($_POST['password']));
    $stmt = $pdo->prepare('SELECT id FROM users WHERE login = ? AND password = ? AND status = 1');
    $stmt->execute([$login, $password]);
    if ($id = $stmt->fetchColumn()) {
        $cookie = rand(1000000, 90000000);
        $stmt = $pdo->prepare('INSERT INTO users_login SET cookie= ? , user_id = ?');
        $stmt->execute([$cookie, $id]);
        setcookie('ses', $cookie, time()+(60*60*24*365), '/');
        if($_GET['back']) {
            header('Location: '.$_GET['back']);
            exit;
        } else {
            header('Location: /index.php');
            exit;
        }
    } else {
        $bad_login = true;
    }
} elseif((in_array(1, $USER['rules']) || $USER['type'] <= 10) && isset($_GET['login'])) {
    
    $stmt = $pdo->prepare('SELECT id FROM users WHERE login = ? AND status = 1');
    $login = filter_input_text($_GET['login']);
    $stmt->execute([$login]);
    
    if ($id = $stmt->fetchColumn()) {
        $cookie = rand(1000000, 90000000);
        $stmt = $pdo->prepare('INSERT INTO users_login SET cookie= ? , user_id = ?');
        $stmt->execute([$cookie, $id]);
        setcookie('ses', $cookie, time()+(60*60*24*365), '/');
        if($_GET['back']) {
            header('Location: '.$_GET['back']);
            exit;
        } else {
            header('Location: /index.php');
            exit;
        } 
        
    } else {
        $bad_login = true;
    }
}
        
        
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= defined('SDMO_TITLE') ? SDMO_TITLE : ($USER['company'] ? $USER['company'] : Dictionary::t('LOGIN', 'COMPANY') )?></title>
    <meta name="author" content="OSA">
    <link type="image/jpg" rel="icon" href="/images/favicon.jpg">
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/style.css" rel="stylesheet">
    <script type="text/javascript" src="/js/jq1.11.0.min.js"></script>
    <script type="text/javascript" src="/js/bootstrap.min.js"></script>
</head>
<body>

    <div class="container">
        <form  method="POST" action="/" style="float: right; cursor: pointer">
            <?php if (LANG == 'ru_ru') { ?>
                <input type="hidden" name="setLang" value="en_gb" />
                <a style="color: black; width: 120px" onclick="this.parentNode.submit()" >Language: en</a>
            <?php } else {?>
                <input type="hidden" name="setLang" value="ru_ru" />
                <a style="color: black; width: 120px" onclick="this.parentNode.submit()" >Language: ru</a>
            <?php } ?>
        </form>
        <form class="form-signin" role="form" method="post">
            <h3><?= Dictionary::t('LOGIN', 'SDMO')?></h3>
            <input name="login" type="text" class="form-control" placeholder="<?= Dictionary::t('LOGIN', 'SDMO')?>" required="" autofocus=""
                   value="<?php echo $login; ?>">
            <input name="password" type="password" class="form-control" placeholder="<?= Dictionary::t('LOGIN', 'PASSWORD')?>" required="">
            <?php if ($bad_login): ?>
                <p class="bg-danger"><?= Dictionary::t('LOGIN', 'BAD_SIGNIN')?></p>
            <?php endif;?>
            <button class="btn btn-lg btn-primary btn-block" type="submit"><?= Dictionary::t('LOGIN', 'ENTRY')?></button>
        </form>
    </div>

</body>
</html>

<?php
/*
<div class="container">
    <form class="form-signin" role="form">
        <h2 class="form-signin-heading">Авторизация</h2>
        <input name="login" type="text" class="form-control" placeholder="Логин" required="" autofocus="">
        <input name="password" type="password" class="form-control" placeholder="Пароль" required="">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Вход</button>
    </form>
</div>
*/
?>