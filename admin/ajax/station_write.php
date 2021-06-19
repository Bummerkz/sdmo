<?php

include_once("../../init/db_connect.php");
include_once("../../init/func.php");
include_once('../../include/pump_type_1900.php');
include_once('../../include/station_info_tables_conf.php');
if ($_POST['station_id'] ) {
  $station = get_station($_POST['station_id'], false, false);


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



<h2>Обновить станцию <button class="btn btn-primary" onclick="$('.save', tab_station).trigger('click')">Обновить</button>
  <a href="#tab_transfer_station" data-id="1018" data-toggle="tab"  type="button" class="btn btn-primary transfer_station">Перенести станцию</a>
  <a href="#tab_stations" data-toggle="tab" style="float:right; font-size: 14px;margin: 10px">Назад</a></h2>
<form>
    <input value="<?= $_POST['station_id']?>" type="hidden"  name="station_id">
    <div class="form-group">
        <label for="name">Название</label>
        <input type="text" class="form-control" name="name" value="<?= $station['name']?>">
    </div>

    <div class="form-group"><label >Месторождение</label>

        <select name="place_id" class="form-control ">

            <?php

                foreach(get_last_child_places() as $place){
                    ?>
                        <option <?= ($station['place_id'] == $place['id'])? "selected" : ''  ?> value="<?= $place['id']?>" ><?= $place['name']?></option>

                    <?php
                }

            ?>
        </select>
    </div>
    <div class="form-group"><label >Тип счетчика</label>
        <select name="type_electric" class="form-control ">
            <option <?= ($station['type_electric'] == 1)? "selected" : ''  ?> value="1" >Нева</option>
            <option <?= ($station['type_electric'] == 2)? "selected" : ''  ?> value="2" >Меркурий</option>
        </select>
    </div>
    <div class="form-group"><label >Тип насоса</label>
        <select name="type_pump" class="form-control ">
            <?php

                foreach($pump_type_1900 as $key => $name){
                    ?>
                        <option <?= ($station['type_1900'] == $key)? "selected" : ''  ?> value="<?= $key?>" ><?= $name?></option>
                    <?php
                }

            ?>
        </select>
    </div>
    <?php
        $arrSt = $station;
        $arrSt['info']['info_data_id'] = $arrSt['id'];
        $arrSt['info']['info_data_23'] = $arrSt['IP'];
        $arrSt['info']['info_data_24'] = $arrSt['port'];
        $arrSt['info']['info_data_25'] = $arrSt['name'];
        $arrSt['info']['info_data_28'] = $arrSt['code'];
        $arrSt['info']['info_data_26'] = $arrSt['antena'];
        $arrSt['info']['info_data_27'] = $arrSt['sector'];


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
            <option  <?= ($station['server_id'] == $server['id'])? "checked" : ''  ?>  value="<?= $server['id']?>" ><?= $server['IP']?></option>
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
            <input type="checkbox" <?= ($station['active']? "checked" : '')?> name="active">Активен
        </label>
    </div>
    <button class="btn btn-primary save">Обновить</button>

    <p class="mess alert alert-info" style="display: none"></p>
</form>
<?php
} else {
    echo "Ошибка сервера";
}
?>
<script>
    var tab_station = $('#tab_station');
    ('form', tab_station).submit(function(){return false;});
    $('.save', tab_station).click(function(){
        $('.mess', tab_station).css('display', 'none');
        $.ajax({
            url: "/admin/ajax/station_update.php",
            type: "POST",
            dataType: "html",
            data: $('form', tab_station).serialize(),
            success: function (response) {
                var res = $.parseJSON(response);
                if(res['res'] == 1){
                    $('.mess', tab_station).html(res['mess']).css('display', 'block');
                    var oldTr = $('table', tab_stations).find('[data-id = "'+<?= $_POST['station_id']?>+'"]').parents('tr');
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
        return false;
    });
      $('.transfer_station').click(function(){
      //  console.log($(this).attr("data-id"))
        var data = JSON.stringify(<?php echo json_encode($station)?>)
          // console.log(data)
         loadTransferStation(data);
//        alert('peek')

      })
</script>
