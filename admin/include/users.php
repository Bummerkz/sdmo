<?php 
include_once("../include/user_rule.php");
?>
<style>
    
.table > tbody > tr > td {
     vertical-align: middle;
}
    
</style>
<p>
    <a href="#tab_add_user" data-toggle="tab"  type="button" class="btn btn-primary">Добавить пользователя</a>
</p>


<?php
$aU = get_users();
$tr = '';
foreach ($aU as $u) {

$tr .= '<tr id="user_'.$u['id'].'">
    <td>' . $u['id'] . '</td>
    <td><b>' . $user_type[$u['type']] . '</b></td>    
    <td><a data-toggle="tab" data-id = "'.$u['id'].'" href="#tab_user">' . $u['fio'] . '</a></td>
    <td><a data-toggle="tab" data-id = "'.$u['id'].'" href="#tab_user">' . $u['login'] . '</a></td>
    
    <td>' . $u['status'] . '</td>
    <td>' . $u['rules'] . '</td>';
    
$tr .= '<td>';
if(!empty($u['user_rules'])){
    foreach ($u['user_rules'] as $name_rule => $value_rule)  {
        
        $tr .= $name_rule.' : '. @implode(',', $value_rule).'<br />';
        
    }  
}
            

$tr .= '</td>'
        . '<td><i class="glyphicon glyphicon-remove red user_delete" data-id = "' . $u['id'] . '" data-login= "' . $u['login'] .'"></i></td>'
        . '</tr>';
}
?>
<table class="table table-hover align-middle" style="vertical-align: middle; font-size: 13px;">
    <tr>
        <th>#</th>
        <th>Тип</th>
        <th class="sort sortName empty">ФИО</th>
        <th>Логин</th>

        <th>Активен</th>
        <th>Права</th>
        <th>Прочие права</th>
        <th></th>
    </tr>
    <?=$tr?>
</table>
<script>
    var tab_users = $('#tab_users');
    var tab_user = $('#tab_user');
    $(tab_users).delegate('a[href = "#tab_user"]', 'click', function(){
        $.ajax({
            url: "/admin/ajax/user_write.php",
            type: "POST",
            dataType: "html",
            async: false,
            data: {user_id:$(this).attr('data-id')},
            success: function (response) {
                tab_user = $('#tab_user');
                tab_user.html(response);
            },
            error: function (err) {
                alert('Ошибка связи с сервером. Попробуйте еще раз.');
            }
        });
    });
    
    
$(document).on('click','.sortName.asc, .sortName.empty', function(){
    var table = $(this).parents('table').first();
    var col = $(this).index();
    
    table.find('tr:has(td)').sort(function(a, b) {
        
        var aVal = $(a).find('td').eq(col).find('a').first();
        var bVal = $(b).find('td').eq(col).find('a').first();
        
        return aVal.text().localeCompare(bVal.text());

    }).appendTo(table.find('tbody'));
    $(this).attr('class', 'sort sortName desc')
});

$(document).on('click','.sortName.desc', function(){
    var table = $(this).parents('table').first();
    var col = $(this).index();
    
    table.find('tr:has(td)').sort(function(a, b) {
        
        var aVal = $(a).find('td').eq(col).find('a').first();
        var bVal = $(b).find('td').eq(col).find('a').first();
        
        return bVal.text().localeCompare(aVal.text());

    }).appendTo(table.find('tbody'));
    $(this).attr('class', 'sort sortName asc')
});

$(document).on('click','.user_delete', function(){
    
    var user = $(this);

    var question = 'Вы дейтсвительно хотите удалить пользователя "'+user.data('login')+'"';
    if(confirm(question)) {
        $.ajax({
            url: "/admin/ajax/user_delete.php",
            type: "POST",
            data: {user_id:user.data('id')},
            success: function (response) {
                $('#user_'+user.data('id')).remove();
            },
            error: function (err) {
                alert('Ошибка связи с сервером. Попробуйте еще раз.');
            }
        });
    }
});
</script>
