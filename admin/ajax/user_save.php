<?php
ob_start();
include_once("../../init/db_connect.php");
include_once("../../init/func.php");
include_once("../../include/user_rule.php");
if ($_POST['fio'] AND $_POST['login'] AND $_POST['pass']) {
    if(!empty($_POST['rules']))
        $rules = implode(',', $_POST['rules']);
    else 
        $rules =  '';
    // проверим на логин
    if ($u = get_user(false, $_POST['login'])) {

        $res['mess'] = 'Пользователь с таким Логином уже есть!';
    } else {

        $stmt = $pdo->prepare('INSERT INTO users (login, password, status, rules, fio, info, type) VALUES (:login, :password, :status, :rules, :fio, :info, :type)');

        if ($stmt->execute([
            ':login' => $_POST['login'],
            ':password' => md5($_POST['pass']),
            ':status' => $_POST['status'] ? 1 : 0,
            ':rules' => $rules,
            ':fio' => $_POST['fio'],
            ':info' => $_POST['info'],
            ':type' => $_POST['user_type'],
        ])
        ) {
            
            $u = get_user(false, $_POST['login']);
            foreach ($_POST['rulearr'] as $ruleId => $value){
                $value = trim($value);
                $rulExec = $pdo->prepare('INSERT INTO user_rule (user_id, rule_id, value) VALUES (:user_id, :rule_id, :value)');
                $rulExec->execute([
                            ':user_id' => $u['id'],
                            ':rule_id' => $ruleId,
                            ':value' => $value,
                        ]);
                
            }
            $u = get_user($u['id']);
            $res['tr'] = '<tr>
                            <td>' . $u['id'] . '</td>
                            <td><b>' . $user_type[$u['type']] . '</b></td>
                            <td><a data-toggle="tab" data-id = "'.$u['id'].'" href="#tab_user">' . $u['fio'] . '</a></td>
                            <td><a data-toggle="tab" data-id = "'.$u['id'].'" href="#tab_user">' . $u['login'] . '</a></td>
                            <td>' . $u['status'] . '</td>
                            <td>' . implode(',', $u['rules']) . '</td>';
            $res['tr'] .= '<td>';
            if(!empty($u['user_rules'])){
                foreach ($u['user_rules'] as $name_rule => $value_rule)  {

                    $res['tr'] .= $name_rule.' : '. @implode(',', $value_rule).'<br />';

                }  
            }
            $res['tr'] .= '</td>';
            $res['tr'] .='</tr>';

            $res['mess'] = 'Пользователь '.$u['fio'].' добавлен!';

            
        } else {
            $res['mess'] = 'Добавить пользователя не удалось!';
        }
    }
} else {
    $res['mess'] = '<pre>' . htmlspecialchars(print_r($_POST, 1)) . '</pre>';
}

$res['res'] = 1;
$res['txt'] = ob_get_contents();
ob_end_clean();

print json_encode($res);