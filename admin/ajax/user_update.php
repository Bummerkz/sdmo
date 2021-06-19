<?php
ob_start();
include_once("../../init/db_connect.php");
include_once("../../init/func.php");
include_once("../../include/user_rule.php");
if ($_POST['fio'] && $_POST['user_id']) {
    if(!empty($_POST['rules']))
        $rules = implode(',', $_POST['rules']);
    else 
        $rules =  '';
    $user_id = $_POST['user_id'];
    if(!empty($_POST['pass'])){
        $stmt = $pdo->prepare('UPDATE users SET status = :status, fio = :fio, rules = :rules, password = :password, type = :type WHERE id = :user_id');
        $bindArray = [
            ':status' => $_POST['status'] ? 1 : 0,
            ':rules' => $rules,
            ':fio' => $_POST['fio'],
            ':user_id' => $user_id,
            ':password' => md5($_POST['pass']),
            ':type' => $_POST['user_type'],
        ];
    } else {
        $stmt = $pdo->prepare('UPDATE users SET status = :status, fio = :fio, rules = :rules, type = :type WHERE id = :user_id ');
        $bindArray = [
            ':status' => $_POST['status'] ? 1 : 0,
            ':rules' => $rules,
            ':type' => $rules,
            ':fio' => $_POST['fio'],
            ':user_id' => $user_id,
            ':type' => $_POST['user_type'],
        ];
    }
    if ($stmt->execute($bindArray)
    ) {
        
        foreach ($_POST['rulearr'] as $ruleId => $value){
            $value = trim($value);
            $l_records = $pdo->prepare("SELECT * FROM user_rule WHERE rule_id = :rule_id AND user_id = :user_id"); 
            $l_records->execute([
                ':rule_id' => $ruleId,
                ':user_id' => $user_id
            ]);
           
            if ($l_records->fetch()) {
                $rulExec = $pdo->prepare('UPDATE user_rule SET value = :value WHERE rule_id = :rule_id AND user_id = :user_id');
                
                $rulExec->execute([
                    ':user_id' => $user_id,
                    ':rule_id' => $ruleId,
                    ':value' => $value,
                ]);
                
            } else {  

                $rulExec = $pdo->prepare('INSERT INTO user_rule (user_id, rule_id, value) VALUES (:user_id, :rule_id, :value)');
                $rulExec->execute([
                    ':user_id' => $user_id,
                    ':rule_id' => $ruleId,
                    ':value' => $value,
                ]);
                
            }
        }
        $u = get_user($user_id);
        $res['tr'] = '<tr>
                <td>' . $u['id'] . '</td>
                <td><b>' . $user_type[$u['type']] . '</b></td>
                <td><a data-toggle="tab" data-id = "'.$u['id'].'" href="#tab_user">' . $u['fio'] . '</a></td>
                <td><a data-toggle="tab" data-id = "'.$u['id'].'" href="#tab_user">' . $u['login'] . '</a></td>
                <td>' . $u['status'] . '</td>
                <td>' . implode(',', $u['rules']) . '</td>';
                
        
        $res['user_id'] = $_POST['user_id'];
        if(!empty($u['user_rules'])){
            $res['tr'] .= '<td>';
            foreach ($u['user_rules'] as $name_rule => $value_rule)  {

                $res['tr'] .= $name_rule.' : '. @implode(',', $value_rule).'<br />';

            }  
            $res['tr'] .= '</td>';
        }
        $res['tr'] .= '<td><i class="glyphicon glyphicon-remove red user_delete" data-id = "' . $u['id'] . '" data-login= "' . $u['login'] .'"></i></td>';
        $res['tr'] .='</tr>';
        $res['res'] = 1;
        
        if(!empty($_POST['pass'])){
            $res['mess'] = 'Пользователь обновлен, новый пароль: "'.$_POST['pass'].'"';
        } else {
            $res['mess'] = 'Пользователь обновлен';
        }
    } else {
        $res['mess'] = 'Обновить пользовтеля не удалось!';
    }
    
} else {
    $res['mess'] = '<pre>' . htmlspecialchars(print_r($_POST, 1)) . '</pre>';
}


ob_end_clean();
print json_encode($res);