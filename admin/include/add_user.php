<?php 
include_once("../include/user_rule.php");
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

    $q = "SELECT * FROM rule";
    $stmt  = $pdo->prepare($q);
    $stmt->execute();
    $rules = $stmt->fetchAll();
    
    $q = "SELECT * FROM place";
    $stmt  = $pdo->prepare($q);
    $stmt->execute();
    $places = $stmt->fetchAll();
?>
<h2>Добавить пользователя <a href="#tab_users" data-toggle="tab" style="float:right; font-size: 14px;margin: 10px">Назад</a></h2>
<form id="form_user" action="/admin">
    <div class="form-group">
        <label for="fio">Фио</label>
        <input type="text" class="form-control" name="fio">
    </div>
    <div class="form-group">
        <label for="login">Логин</label>
        <input type="text" class="form-control" name="login">
    </div>
    <div class="form-group">
        <label for="pass">Пароль</label>
        <input type="password" class="form-control" name="pass">
    </div>
    <div class="form-group">
        <label for="rules">Тип пользователя</label><br />
        <select  class="form-control" name="user_type">
    
            <?php 

                foreach ($user_type as $key => $value) {

                    ?>
                        <option value="<?= $key?>"><?= $value?></option>
                    <?php
                }

            ?>
        </select>
    </div>
    <div class="form-group">
        <label for="rules">Права</label><br />
        <select  id="multiselect" multiple="multiple" name="rules[]">
    
            <?php 

                foreach ($user_rule as $key => $value) {

                    ?>
                        <option value="<?= $key?>"><?= $value?></option>
                    <?php
                }

            ?>
        </select>
    </div>
    

    
    <?php foreach ($rules as $rule)
    {
        ?><div style="overflow: hidden" class="form-group parent_rules"><label for="place_rules"><?= Dictionary::t('ADMIN', strtoupper($rule['name']))?></label>
            
            <select  class="form-control ">
            
            <?php
            
                foreach($places as $place){
                    ?>
                <option value="<?= $place['id']?>" ><?= $place['name']?></option>
                        
                    <?php
                }
        
            ?>  
            </select>
                
            <input style="margin:10px 0 0 0 " name="rulearr[<?=  $rule['id']?>]" class="rulesBox form-control col-md-5 zbz-input-clearable" />
        </div><?php
    } ?>
    
    
    <div class="checkbox">
        <label>
            <input type="checkbox" checked="" name="status">Активен
        </label>
    </div>
    <button class="btn btn-primary save">Сохранить</button>
    <p class="mess alert alert-info" style="display: none"></p>
</form>

<script>

$('.parent_rules').on('change', 'select', function(){
    
    var parent = $(this).parents('.parent_rules');

    var textInput = parent.find('.rulesBox');
    if(textInput.val() == '')
        textInput.val($(this).val());
    else
        textInput.val(textInput.val()+','+$(this).val());
    
})


var tab_add_user = $('#tab_add_user');

$('.save', tab_add_user).click(function(){
    $('.mess', tab_add_user).css('display', 'none');
    $.ajax({
        url: "/admin/ajax/user_save.php",
        type: "POST",
        dataType: "html",
        data: $('form', tab_add_user).serialize(),
        success: function (response) {
            var res = $.parseJSON(response);
            if(res['res'] == 1){
                $('.mess', tab_add_user).html(res['mess']).css('display', 'block');
                $('table', tab_users).append(res['tr']);
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


$('#multiselect', tab_add_user).multiselect({
        buttonText: function(options, select) {
            if (options.length === 0) {
                return 'Не выбрано ни 1';
            }
            else if (options.length > 3) {
                return 'Выбрано больше 3';
            }
             else {
                 var labels = [];
                 options.each(function() {
                     if ($(this).attr('label') !== undefined) {
                         labels.push($(this).attr('label'));
                     }
                     else {
                         labels.push($(this).html());
                     }
                 });
                 return labels.join(', ') + '';
             }
        }
});

</script>