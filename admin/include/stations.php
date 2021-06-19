<?php include_once('../include/pump_type_1900.php'); ?>
<style>
    
.table > tbody > tr > td {
     vertical-align: middle;
}
    
</style>
<p>
    <a href="#tab_add_station" data-toggle="tab"  type="button" class="btn btn-primary">Добавить станцию</a>
</p>

<?php


$aSt = get_stations(false,true,true,false,false,false);

$colspan = 1;
$lastPlace = '';

foreach ($aSt as $key => $st) {
    
    if($lastPlace == $st["placename"]) {
        $colspan++;
    } else {
        if($lastMainTr) {
            $aSt[$lastMainTr]['colspan'] = $colspan;
        }
        $colspan = 1;
        $lastMainTr = $key;
    }
    $lastPlace = $st["placename"];   
}
$aSt[$lastMainTr]['colspan'] = $colspan;
$tr = '';
foreach ($aSt as $st) {
    
    if(isset($st['colspan'])) {
        $tr .= '<tr><td rowspan="'.$st['colspan'].'">'.$st["placename"].'</td>';
    }
    $tr .= '<td >'.$st["id"].'</td>';
    $tr .= '<td><a data-toggle="tab" data-id = "'.$st['id'].'" href="#tab_station">'.$st["name"].'</a></td>';
    if($st["active"] == 1)
        $st["active"] = "On";
    else 
        $st["active"] = "Off";
    $tr .= '<td >'.$st["active"].'</td>';
    $tr .= '<td>'.$pump_type_1900[$st["type_1900"]].'</td>';

    $tr .= '<td >'.$st["server_id"].'</td></tr>';
}


/*
 function getRecStData($head){
    global $pdo;
    if($head['parent'] == 0) {
        $tr = '<tr class="head" data-id="'.$head['id'].'"><td style="text-align:center; background: #AAA9A4 none repeat scroll 0 0;" colspan=5>'.$head['name'].'</td></tr>';
    } else {
        $tr = '<tr class="head" data-id="'.$head['id'].'"><td style="text-align:center; background: #f3f3f3 none repeat scroll 0 0;" colspan=5>'.$head['name'].'</td></tr>';
    }
        
    $q = "SELECT * FROM place WHERE parent = :parent;";
    $child  = $pdo->prepare($q);
    $child->execute([':parent'=>$head['id']]);
    if($child->rowCount() !== 0){
    	while($childHead = $child->fetch()){
    		$tr .= getRecStData($childHead);
    	}
    } else {
        $qw = "SELECT * FROM stations WHERE place_id = :place_id;";
        $dataStr  = $pdo->prepare($qw);
        $dataStr->execute([':place_id'=>$head['id']]);
        while($data = $dataStr->fetch()){
            $tr .= '<tr><td >'.$data["id"].'</td>';
            $tr .= '<td><a data-toggle="tab" data-id = "'.$data['id'].'" href="#tab_station">'.$data["name"].'</a></td>';
            $tr .= '<td >'.$data["active"].'</td>';
            $tr .= '<td>'.$data["type_1900"].'</td>';
            $tr .= '<td >'.$data["server_id"].'</td></tr>';
        }
    }
    return $tr;
 }

$q1 = "SELECT * FROM place WHERE parent = 0;";
$firstParent  = $pdo->prepare($q1);
$firstParent->execute();

$tr = '';

while($firstHead = $firstParent->fetch()){
    
    $tr.= getRecStData($firstHead);
    
}
*/
?>
<table class="table table-bordered align-middle" style="vertical-align: middle; max-width: 750px;">
    <tr>
        <th>Месторождение</th>
        <th>#</th>
        <th>Название</th>
        <th>Активен</th>
        <th>Тип</th>
        <th>Сервер</th>
    </tr>
    <?=$tr?>
</table>
<script>
    
    var tab_stations = $('#tab_stations');
    var tab_station = $('#tab_station');
    $(tab_stations).delegate('a[href = "#tab_station"]', 'click', function(){
        $.ajax({
            url: "/admin/ajax/station_write.php",
            type: "POST",
            dataType: "html",
            async: false,
            data: {station_id:$(this).data('id')},
            success: function (response) {
                tab_station = $('#tab_station');
                tab_station.html(response);
            },
            error: function (err) {
                alert('Ошибка связи с сервером. Попробуйте еще раз.');
            }
        });
    });
</script>
