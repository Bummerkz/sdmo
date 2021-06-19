<?php 
error_reporting(E_ALL & ~E_NOTICE);
include_once('../include/pump_type_1900.php');
include_once('../include/station_info_tables_conf.php');
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



<h2>Добавить станцию <a href="#tab_stations" data-toggle="tab" style="float:right; font-size: 14px;margin: 10px">Назад</a></h2>
<form>
    <div class="form-group">
        <label for="name">Название</label>
        <input type="text" class="form-control" name="name">
    </div> 

    <div class="form-group"><label >Месторождение</label>
            
        <select name="place_id" class="form-control ">

            <?php

                foreach(get_last_child_places() as $place){
                    ?>
                        <option value="<?= $place['id']?>" ><?= $place['name']?></option>

                    <?php
                }

            ?>  
        </select>
    </div>    
    
    <div class="form-group"><label >Тип счетчика</label>
        <select name="type_electric" class="form-control ">
            <option value="1" >Нева</option>
            <option selected="" value="2" >Меркурий</option>
        </select>
    </div>
    
    <div class="form-group"><label >Тип насоса</label>
        <select name="type_pump" class="form-control ">
            <?php

                foreach($pump_type_1900 as $key => $name){
                    ?>
                        <option value="<?= $key?>" ><?= $name?></option>
                    <?php
                }

            ?>  
        </select>
    </div>
    <?php 
    foreach ($configTableStation as $table_name => $arrRow) {

        $res .= '<table class="table-them table table-bordered table-hover table-center">
                   <thead>
                      <tr>
                        <th colspan="2">' . $table_name . '</th>
                      </tr>
                   </thead>
                   <tbody>';
        foreach ($arrRow as $info_data_id => $name) {
            
            if($info_data_id == 'info_data_61' || $info_data_id == 'selectPlace' || $info_data_id == 'info_data_25') {
                continue;
            }
            $value = $arrSt['info'][$info_data_id] ? $arrSt['info'][$info_data_id] : '';

            $res .= '<tr>
                       <td style="width:60%">' . $name . '</td>';
            
            if($info_data_id == 'info_data_84')
                $res .='<td><input id="date-params-select" class="field unstyled" value="' . (($value != '-') ? date('Y-m-d',strtotime($value)) : '') . '"  name="' . $info_data_id . '" type="date"></td>';
            else 
                $res .='<td><input class="field" name="' . $info_data_id . '" type="text" value="' . $value . '"></td>';
            
            $res .='</tr>';
            
        }
        $res .= '</tbody>
               </table>';
    }
    echo $res;
        if(IS_SERVER):
    ?>
    <!--
    <div class="form-group"><label >Сервер</label>
        <select name="server_id" class="form-control ">
    <?php
        $pdo->query("SELECT * FROM `Servers`");
        foreach ($pdo->query("SELECT * FROM `Servers`") as $server):
        ?>
            <option value="<?= $server['id']?>" ><?= $server['IP']?></option>
        <?php
        endforeach;
        
    ?>
        </select>
    </div> -->
    <div class="form-group">
        <label for="name">ID скважины на сервере</label>
        <input type="text" class="form-control" name="local_id">
    </div> 
    
    <?php 
        endif;
    ?>
    <div class="checkbox">
        <label>
            <input type="checkbox" checked="" name="active">Активен
        </label>
    </div>
    <button class="btn btn-primary save">Сохранить</button>

    <p class="mess alert alert-info" style="display: none"></p>
</form>

<script>
    var tab_add_station = $('#tab_add_station');
    ('form', tab_add_station).submit(function(){return false;});
    $('.save', tab_add_station).click(function(){
        $('.mess', tab_add_station).css('display', 'none');
        $.ajax({
            url: "/admin/ajax/station_save.php",
            type: "POST",
            dataType: "html",
            data: $('form', tab_add_station).serialize(),
            success: function (response) {
                var res = $.parseJSON(response);
                if(res['res'] == 1){
                    $('.mess', tab_add_station).html(res['mess']).css('display', 'block');
                    var place_id = res['place_id'];
                    $('table', tab_stations).find('[data-id = "'+place_id+'"]').after(res['tr']);
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