<?php

include_once("../../init/db_connect.php");
include_once("../../init/func.php");
include_once("../../include/user_rule.php");

if ($_POST['user_id'] ) {
  
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

    $q = "SELECT * FROM users where id = :user_id";
    $stmt  = $pdo->prepare($q);
    
    $stmt->execute([
        ':user_id' => $_POST['user_id']]
    );
    $user = $stmt->fetch();

    $q = "SELECT *  FROM rule r LEFT JOIN
(SELECT rule_id,value FROM user_rule where user_id = :user_id) as ur ON r.id = ur.rule_id ";

    $stmt  = $pdo->prepare($q);
    $stmt->execute([
        ':user_id' => $_POST['user_id']]
        );
    $rules = $stmt->fetchAll();
    
    $q = "SELECT * FROM place";
    $stmt  = $pdo->prepare($q);
    $stmt->execute();
    $places = $stmt->fetchAll();
    
    $current_user_rule = explode(',',$user['rules']);
?>
<h2>Обновить пользователя <span style="font-size:15px;">(<a href="/login.php?login=<?= $user['login']?>" >Войти под пользователем</a>)</span> <a href="#tab_users" data-toggle="tab" style="float:right; font-size: 14px;margin: 10px">Назад</a></h2>
<form >

    <input value="<?= $_POST['user_id']?>" type="hidden"  name="user_id">
    <div class="form-group">
        <label for="fio">Фио</label>
        <input value="<?= $user['fio']?>" type="text" class="form-control" name="fio">
    </div>
    
    <div class="form-group">
        <label for="rules">Тип пользователя</label><br />
        <select  class="form-control" name="user_type">
            <?php 
                foreach ($user_type as $key => $value) {
                    ?>
                        <option <?php echo (($key == $user['type']) ? 'selected=""' : '')?> value="<?= $key?>"><?= $value?></option>
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
                <option <?php echo ((in_array($key, $current_user_rule)) ? 'selected=""' : '')?> value="<?= $key?>"><?= $value?></option>
            <?php
        }
    
    ?>
</select>



    </div>
    
    <div class="form-group">
        <label for="pass">Новый пароль</label>
        <input type="password" type="password" class="form-control" name="pass" minlength="5">
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
                
            <input value="<?= $rule['value']?>" style="margin:10px 0 0 0 " name="rulearr[<?=  $rule['id']?>]" class="rulesBox form-control col-md-5 zbz-input-clearable" />
        </div><?php
    } ?>
    
    <div class="checkbox">
        <label>
            <input type="checkbox" <?= ($user['status']? 'checked' : '')?> name="status">Активен
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

$('.parent_rules', tab_user).on('change', 'select', function(){
    
    var parent = $(this).parents('.parent_rules');

    var textInput = parent.find('.rulesBox');
    if(textInput.val() == '')
        textInput.val($(this).val());
    else
        textInput.val(textInput.val()+','+$(this).val());
    
})


$("form", tab_user).submit(function(){
    return false;
});

//обновление
$('.save', tab_user).on('click',function(){

    if($('[name="pass"]', tab_user).val().length < 5 && $('[name="pass"]', tab_user).val() != '')
        return;
    $.ajax({
        url: "/admin/ajax/user_update.php",
        type: "POST",
        dataType: "html",
        data: $('form', tab_user).serialize(),
        success: function (response) { 
            var res = $.parseJSON(response);
            if(res['res'] == 1){
                $('.mess', tab_user).html(res['mess']).css('display', 'block');
                var oldTr = $('table', tab_users).find('[data-id = "'+<?= $_POST['user_id']?>+'"]').parents('tr');
                oldTr.after(res['tr']);
                oldTr.remove();
            } else {
             //   alert('Ответ отрицательный!');
            }
        },
        error: function (err) {
            alert('Ошибка связи с сервером. Попробуйте еще раз.');
        }
    });
})    

$('#multiselect',tab_user).multiselect({
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


