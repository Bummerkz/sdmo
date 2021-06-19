<?php
$arr_trend = get_fc_reg_dynamic(); //[1610, 1613, 1614, 1617, 1630, 1660, 1997, 1998, 1999];
$aReg = get_fc_reg($arr_trend, 1);
$str_trend = implode(',', $arr_trend);
?>
<div class="station_trend_in">
</div>
<div class="control-block">
    <form class="form-inline" role="form">

        <div class="reg-block">
            <div class="reg-block-abs">
                <label class="label-reg">
                    <?= Dictionary::t('INCLUDES', 'PARAMS')?>
                </label>

                <div class="checkbox-block">

                    <span class="input-group-addon">
                           <span class="caret"></span>
                    </span>

                    <button type="button" class="close" aria-hidden="true">&times;</button>
                    <div class="checkbox-block-in">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="reg-trend" value="all" checked="checked">
                                <?= Dictionary::t('INCLUDES', 'ALL')?>
                            </label>
                        </div>
                        <?php foreach ($aReg as $r): ?>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="reg-trend" value="<?= $r['addr'] ?>">
                                    <?php
                                    $r['name'] = Dictionary::t('FC_REG', $r['type_1900'] . "_" . $r['addr']);
                                    $r['units'] = Dictionary::t('FC_REG_UNITS', $r['type_1900'] . "_" . $r['addr']);
                                    echo $r['units'] ? $r['name'] . ', ' . $r['units'] : $r['name'];
                                    ?>
                                </label>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                <div class="count"><b><?= count($aReg)?></b> <?= Dictionary::t('INCLUDES', 'FROM')?> <?= count($aReg)?>
                </div>
            </div>
        </div>

        <script>
            // выделим все по умолчанию
            $('input[name="reg-trend"]').each(function (i, el) {
                $(this).prop('checked', true);
            });
        </script>

        <label for="date_from_input">
            <?= Dictionary::t('INCLUDES', 'PERIOD')?>
        </label>
        <span>c</span>

        <div class='input-group date' id='date_from'>
            <input type='text' class="form-control" id="date_from_input"/>
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
        <span><?= Dictionary::t('INCLUDES', 'BY')?></span>

        <div class='input-group date' id='date_to'>
            <input type="text" class="form-control" id="date_to_input"/>
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
        <button type="button" class="btn btn-primary load-trend"><?= Dictionary::t('INCLUDES', 'SHOW')?></button>
    </form>
</div>

<div class="trend-block">
    <div class="bl-value bottom-left">
        <table style="width:100%">
            <?php foreach ($aReg as $r): ?>
                <tr class="reg_<?= $r['addr'] ?>">
                    <td class="name">
                        <?= Dictionary::t('FC_REG', $r['type_1900'] . "_" . $r['addr']); ?>
                    </td>
                    <td class="value"></td>
                </tr>
            <?php endforeach?>
            <tr class="time">
                <td class="name"><?= Dictionary::t('INCLUDES', 'TIME')?></td>
                <td class="value"></td>
            </tr>
        </table>
    </div>
    <div class="trend-block-up"></div>
    <?php foreach ($aReg as $r): ?>
        <div id="trend_<?= $r['addr'] ?>" class="trend">
            <h3>
                <?php
                $r['name'] = Dictionary::t('FC_REG', $r['type_1900'] . "_" . $r['addr']);
                $r['units'] = Dictionary::t('FC_REG_UNITS', $r['type_1900'] . "_" . $r['addr']);
                echo $r['units'] ? $r['name'] . ', ' . $r['units'] : $r['name'];
                ?>
                <span class="chartFieldName red green"></span>
            </h3>
            <button type="button" class="btn btn-warning btn-xs reset-trend"><?= Dictionary::t('INCLUDES', 'RESET_ZOOM')?></button>
            <p class="period"></p>

            <div id="chart_<?= $r['addr'] ?>" class="chart"></div>
            <!--<div id="chart_master_<?= $r['addr'] ?>" class="chart-master"></div> Здесь был мастер чарт -->
            <div class="load"><?= Dictionary::t('INCLUDES', 'LOAD')?>...</div>
        </div>
    <?php endforeach?>
</div>

<script>
    var trend_Tab = $("#station_trend");
    $('body').delegate('.trend-block', "mousemove scroll",function (e) {
        var bl = $('.bl-value');
        if (bl.hasClass('animate')) {
            var offset = $(this).offset(),
                x = (e.pageX - offset.left),
                y = (e.pageY - offset.top),
                w = bl.outerWidth(true),
                h = bl.outerHeight(true) / 2,
                left = (x - w) > 0 ? (x - w) : x,
                top = (y - h) > 0 ? (y - h) : y;
            bl.stop().animate({top: top + 'px', left: left + 'px'}, 500);
        }
        //$('.bl-value .coord .value').html('ex: ' + e.pageX + ', ey: ' + e.pageY + '<br>x: ' + x + ', y: ' + y + '<br>top: ' + top + ', left ' + left);
    }).delegate('.trend-block', 'mouseleave', function (e) {
            $('.bl-value').fadeOut(300);
        });

    trend_Tab.delegate('.reset-trend', "click", function () {

        $.each($('.trend:visible .chart', trend_Tab), function( key, value ) {
            $('.reset-trend', trend_Tab).fadeOut( "slow");
            var index = $("#"+$(this).attr('id')).attr('data-highcharts-chart');
            var chart = Highcharts.charts[index];

            if(typeof chart == 'undefined')
                return true;
            
            chart.series[0].setData(chart.options.resetZoomData);
        });
    });    
</script>
<style>
    .trend-block {
        position: relative
    }

    .bl-value {
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 5px;
        box-shadow: 0 1px 7px 0 #666;
        color: #000;
        margin: 5px 15px;
        padding: 5px;
        position: absolute;
        z-index: 50;
        display: none;
    }

    .bl-value.bottom-left {
        background-color: rgba(255, 255, 255, 1);
        border-radius: 5px;
        bottom: 0;
        box-shadow: 0 1px 7px 0 #666;
        color: #000;
        display: none;
        left: 0;
        margin: 5px;
        padding: 5px;
        position: fixed;
        width: 265px;
        z-index: 50;
    }

    .trend-block .bl-value table td.value {
        background-color: rgba(255, 255, 255, 0.6);
        color: darkblue;
        font-size: 13px;
        max-width: 140px;
        text-align: center;
    }

    .trend-block .bl-value table td {
        border: 1px solid #999;
        font-size: 12px;
        padding: 3px;
    }
</style>