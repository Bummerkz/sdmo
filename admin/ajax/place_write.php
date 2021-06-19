<?php

include_once("../../init/db_connect.php");
include_once("../../init/func.php");

if ($_POST['place_id'] ) {
  
?>

<style>
    
    
    .zbz-input-clearable {
    /* ставим инпуту фоновую картинку, но отображаем ее за пределами инпута - 150% в background-position */
    background-image: url('/images/ico-x-normal.png');
    background-position: 100% 50%;
    background-repeat: no-repeat;
    transition: background 0.4s;
    /* добавляем справа небольшой padding, чтоб текст не залазил поверх крестика */
    padding-right: 27px
}
.zbz-input-clearable__x {
    /* когда нужно отобразить крестик, перемещаем в правый конец инпута */
    background-position: 100% 50%;
}
.zbz-input-clearable__x-over {
    /* и подготовим стиль для ховера по крестику */
    background-image: url('/images/ico-x-normal.png');
    cursor: pointer;
}
.zbz-input-clearable::-ms-clear {
    /* убираем родной крестик очистки в IE */
    display: none;
}
</style>

<?php 

    $q = "SELECT * FROM place where id = :place_id";
    $stmt  = $pdo->prepare($q);
    
    $stmt->execute([
        ':place_id' => $_POST['place_id']]
    );
    $pl = $stmt->fetch();

    
    $q = "SELECT * FROM place";
    $stmt  = $pdo->prepare($q);
    $stmt->execute();
    $places = $stmt->fetchAll();
    
    $q = "SELECT * FROM companys";
    $stmt  = $pdo->prepare($q);
    $stmt->execute();
    $companys = $stmt->fetchAll();
    
?>
<h2> Обновить месторождение <a href="#tab_places" data-toggle="tab" style="float:right; font-size: 14px;margin: 10px">Назад</a></h2>
<form>
    <input value="<?= $_POST['place_id']?>" type="hidden"  name="place_id">
    <div class="form-group">
        <label for="name">Название</label>
        <input value="<?= $pl['name']?>" type="text" class="form-control" name="name">
    </div>
        <div class="form-group">
        <label for="sort">Номер для сортировки</label>
        <input value="<?= $pl['sort']?>"  type="text" class="form-control" name="sort">
    </div> 

    
    <div class="form-group"><label >Родитель</label>
            
        <select name="parent_id" class="form-control ">

            <?php

                foreach($places as $place){
                    ?>
                        <option <?= ($place['id'] == $pl['parent']) ? "selected" : ""?>  value="<?= $place['id']?>" ><?= $place['name']?></option>
                    <?php
                }

            ?>  
        </select>
    </div> 
    
    <div class="form-group"><label >Компания</label>
            
        <select name="company_id" class="form-control ">

            <?php

                foreach($companys as $company){
                    ?>
                        <option <?= ($company['id'] == $pl['company_id']) ? "selected" : ""?> value="<?= $company['id']?>" ><?= $company['name']?></option>
                    <?php
                }

            ?>  
        </select>
        
    </div> 
    <div class="checkbox">
        <label>
            <input type="checkbox" <?= ($pl['parent'] == 0)? 'checked' : ''?> name="root">Корневой элемент
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox" <?= ($pl['active'] ? 'checked' : '')?> name="active">Активен
        </label>
    </div>

    <button class="btn btn-primary save">Обновить</button>
    <br /><br />
    <p class="mess alert alert-info" style="display: none"></p>
</form>
    
    
    
    
<?php    
} else {
    echo "Ошибка сервера";
}
?>


<script>


$('.parent_rules').on('change', 'select', function(){
    
    var parent = $(this).parents('.parent_rules');

    var textInput = parent.find('.rulesBox');
    if(textInput.val() == '')
        textInput.val($(this).val());
    else
        textInput.val(textInput.val()+','+$(this).val());
    
});
$('form', tab_place).submit(function(){return false});
$('.save', tab_place).on('click', function(){
    $.ajax({
        url: "/admin/ajax/place_update.php",
        type: "POST",
        dataType: "html",
        data: $('form', tab_place).serialize(),
        success: function (response) { 
            var res = $.parseJSON(response);
            if(res['res'] == 1){
                $('.mess', tab_place).html(res['mess']).css('display', 'block');
                var oldTr = $('table', tab_places).find('[data-id = "'+<?= $_POST['place_id']?>+'"]').parents('tr');
                oldTr.after(res['tr']);
                oldTr.remove();
            } else {
                alert('Ответ отрицательный!');
            }
        },
        error: function (err) {
            alert('Ошибка связи с сервером. Попробуйте еще раз.');
        }
    });
})    




</script>


