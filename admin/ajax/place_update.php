<?php
ob_start();
include_once("../../init/db_connect.php");
include_once("../../init/func.php");

if ($_POST['name'] AND $_POST['parent_id'] AND $_POST['place_id']) {
        
        $stmt = $pdo->prepare('UPDATE place set name =:name, parent =:parent, active = :active, sort = :sort, company_id = :company_id WHERE id = :id');
        if ($stmt->execute([
            ':id' => $_POST['place_id'],
            ':name' => $_POST['name'],
            ':parent' =>$_POST['root'] ? 0 : $_POST['parent_id'],
            ':active' => $_POST['active'] ? 1 : 0,
            ':sort' => $_POST['sort'] ? $_POST['sort'] : '0',
            ':company_id' => $_POST['company_id'] ? $_POST['company_id'] : '0',

        ])
        ) {
            $pl =  get_place(false, false, false, $_POST['name']);

            $res['tr'] = '<tr>
                            <td>' . $pl['id'] . '</td>
                            <td><a data-toggle="tab" data-id = "'.$pl['id'].'" href="#tab_place">' . $pl['name'] . '</a></td>
                            <td>' . $pl['active'] . '</td>
                            <td>' . $pl['sort'] . '</td>
                            <td>' . $pl['parent'] . '</td>
                            <td>' . $pl['company_id'] . '</td>
                        </tr>';

            $res['mess'] = 'Месторождение '.$pl['name'].' обновлено!';
            $res['res'] = 1;
            
        } else {
            $res['res'] = 0;
            $res['mess'] = 'Обновить месторождение не удалось!';
        }
    
} else {
    $res['mess'] = '<pre>' . htmlspecialchars(print_r($_POST, 1)) . '</pre>';
}


$res['txt'] = ob_get_contents();
ob_end_clean();

print json_encode($res);