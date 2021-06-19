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

    $q = "SELECT * FROM place";
    $stmt  = $pdo->prepare($q);
    $stmt->execute();
    $places = $stmt->fetchAll();
    
    $q = "SELECT * FROM companys";
    $stmt  = $pdo->prepare($q);
    $stmt->execute();
    $companys = $stmt->fetchAll();
?>

<h2>Добавить месторождение <a href="#tab_places" data-toggle="tab" style="float:right; font-size: 14px;margin: 10px">Назад</a></h2>
<form>
    <div class="form-group">
        <label for="name">Название</label>
        <input type="text" class="form-control" name="name">
    </div> 
    <div class="form-group">
        <label for="name">Номер для сортировки</label>
        <input type="text" class="form-control" name="sort">
    </div> 
    <div class="form-group"><label >Родитель</label>
            
        <select name="parent_id" class="form-control ">

            <?php

                foreach($places as $place){
                    ?>
                        <option value="<?= $place['id']?>" ><?= $place['name']?></option>

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
                        <option value="<?= $company['id']?>" ><?= $company['name']?></option>

                    <?php
                }

            ?>  
        </select>
        
    </div> 
    <div class="checkbox">
        <label>
            <input type="checkbox" name="root">Корневой элемент
        </label>
    </div>
    
    <div class="checkbox">
        <label>
            <input type="checkbox" checked="" name="active">Активен
        </label>
    </div>

    <button class="btn btn-primary save">Сохранить</button>

    <p class="mess alert alert-info" style="display: none"></p>
</form>

<script>
    var tab_place = $('#tab_add_place');
    $('.save', tab_place).click(function(){
        $('.mess', tab_place).css('display', 'none');
        $.ajax({
            url: "/admin/ajax/place_save.php",
            type: "POST",
            dataType: "html",
            data: $('form', tab_place).serialize(),
            success: function (response) {
                var res = $.parseJSON(response);
                if(res['res'] == 1){
                    $('.mess', tab_place).html(res['mess']).css('display', 'block');
                    $('table', tab_places).append(res['tr']);
                } else {
                    alert('Ответ отрицательный!');
                }
            },
            error: function (err) {
                alert('Ошибка связи с сервером. Попробуйте еще раз.');
            }
        });
        return false;
    });
</script>