
<style>
    
.table > tbody > tr > td {
     vertical-align: middle;
}
    
</style>
<p>
    <a href="#tab_add_place" data-toggle="tab"  type="button" class="btn btn-primary">Добавить месторождение</a>
</p>

<?php
 function getPlaceData($place){
    global $pdo;

    $tr = '<tr>';
    $tr .= '<td>'.$place['id'].'</td>';
    $tr .= '<td><a data-toggle="tab" data-id = "'.$place['id'].'" href="#tab_place">'.$place['name'].'</a></td>';
    $tr .= '<td>'.$place['active'].'</td>';
    $tr .= '<td>'.$place['sort'].'</td>';
    $tr .= '<td>'.$place['parent'].'</td>';
    $tr .= '<td>'.$place['company_id'].'</td>';
    $tr .= '</tr>';
    $q = "SELECT * FROM place WHERE parent = :parent;";
    $child  = $pdo->prepare($q);
    $child->execute([':parent'=>$place['id']]);
    if($child->rowCount() !== 0){
    	while($childHead = $child->fetch()){
            $tr .= getPlaceData($childHead);
    	}
    }
    return $tr;
 }

$q1 = "SELECT * FROM place WHERE parent = 0;";
$firstParent  = $pdo->prepare($q1);
$firstParent->execute();

$tr = '';

while($firstHead = $firstParent->fetch()){
    
    $tr.= getPlaceData($firstHead);
    
}

?>
<table class="table table-hover align-middle" style="vertical-align: middle; max-width: 750px;">
    <tr>
        <th>#</th>
        <th>Название</th>
        <th>Активен</th>
        <th>Порядок</th>
        <th>Родитель</th>
        <th>Id компании</th>
    </tr>
    <?=$tr?>
</table>
<script>
    var tab_places = $('#tab_places');
    var tab_place = $('#tab_place');
    $(tab_places).delegate('a[href = "#tab_place"]', 'click', function(){
        $.ajax({
            url: "/admin/ajax/place_write.php",
            type: "POST",
            dataType: "html",
            async: false,
            data: {place_id:$(this).data('id')},
            success: function (response) {
            //    alert(response);
                tab_place = $('#tab_place');
                tab_place.html(response);
            },
            error: function (err) {
                alert('Ошибка связи с сервером. Попробуйте еще раз.');
            }
        });
    });
</script>
