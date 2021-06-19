<?php
ob_start();
include_once("../../init/db_connect.php");
include_once("../../init/func.php");


if (isset($_POST['name']) && isset($_POST['parent_id']) && $_POST['name'] && $_POST['parent_id']) {
    // проверим на название
    if ($pl = get_place(false, false, false, $_POST['name'])) {
        $res['mess'] = 'Месторождение с таким именем уже есть';
     } else {
       $q = [
           ':name' => $_POST['name'],
           ':parent' => (isset($_POST['root']) && $_POST['root']) ? 0 : $_POST['parent_id'],
           ':active' => (isset($_POST['active']) && $_POST['active']) ? '1' : '0',
           ':sort' => $_POST['sort'] ? $_POST['sort'] : '0',
           ':company_id' => $_POST['company_id'] ? $_POST['company_id'] : '0',
       ];
       //$sql ='INSERT INTO place (name, parent, active, sort, company_id) VALUES (:name, :parent, :active, :sort, :company_id)';
       $sql ='INSERT INTO place (name, parent, active, sort, company_id) VALUES ("' . implode('","', $q) . '")';
       echo $sql;
        $stmt = $pdo->prepare($sql);
  
    //  echo $sql;
    try{
      $res_sql = $stmt->execute();
    }
    catch (Exception $e) {
  // exception is raised and it'll be handled here
      echo $e->getMessage();// contains the error message
}
      
  //  $res_sql= false;
        // $res_sql = $stmt->execute([
        //     ':name' => $_POST['name'],
        //     ':parent' => (isset($_POST['root']) && $_POST['root']) ? 0 : $_POST['parent_id'],
        //     ':active' => (isset($_POST['active']) && $_POST['active']) ? '1' : '0',
        //     ':sort' => $_POST['sort'] ? $_POST['sort'] : '0',
        //     ':company_id' => $_POST['company_id'] ? $_POST['company_id'] : '0',
        // ]);
            echo "www";
        if ($res_sql) {
          echo "dasdasd";
            $pl =  get_place(false, false, false, $_POST['name']);
    
            $res['tr'] = '<tr>
                            <td>' . $pl['id'] . '</td>
                            <td><a data-toggle="tab" data-id = "'.$pl['id'].'" href="#tab_place">' . $pl['name'] . '</a></td>
                            <td>' . $pl['active'] . '</td>
                            <td>' . $pl['sort'] . '</td>
                            <td>' . $pl['parent'] . '</td>
                            <td>' . $pl['company_id'] . '</td>
                        </tr>';
    
            $res['mess'] = 'Месторождение '.$pl['name'].' добавлено!';
    
    
        } else {
          echo "34234";
            $res['mess'] = 'Добавить месторождение не удалось!';
        }
     }
} else {
    $res['mess'] = '<pre>' . htmlspecialchars(print_r($_POST, 1)) . '</pre>';
}

$res['res'] = 1;
$res['txt'] = ob_get_contents();
ob_end_clean();

print json_encode($res);

