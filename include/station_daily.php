<?php
?>
<form class="form-inline" role="form">
    <label for="date_from_input">
        <?= Dictionary::t('INCLUDES', 'PERIOD')?>
    </label>
    <span>c</span>
    <div class='input-group date' id='daily-date-from'>
        <input type='text' class="form-control" id="daily-date-from-input"/>
        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
    </div>
    <span><?= Dictionary::t('INCLUDES', 'BY')?></span>
    <div class='input-group date' id='daily-date-to'>
        <input type="text" class="form-control" id="daily-date-to-input"/>
        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
    </div>

    <button type="button" class="btn btn-primary daily-load"><?= Dictionary::t('INCLUDES', 'SHOW')?></button>
</form>

<div id="station_daily_data">
</div>

<script>
    $(document).ready(function () {
        var daily_tab = $('#station_days'),
            date_opt = {
                viewMode: 'days',
                format: 'DD.MM.YYYY',
                locale: 'ru',
                allowInputToggle: true,
                tooltips: {
                    today: _TODAY_,
                    clear: _CLEAR_,
                    close: _CLOSE_,
                    selectMonth: _SELECTMONTH_,
                    prevMonth: _PREVMONTH_,
                    nextMonth: _NEXTMONTH_,
                    selectYear: _SELECTYEAR_,
                    prevYear: _PREVYEAR_,
                    nextYear: _NEXTYEAR_,
                    selectDecade: _SELECTDECADE_,
                    prevDecade: _PREVDECADE_,
                    nextDecade: _NEXTDECADE_,
                    prevCentury: _PREVCENTURY_,
                    nextCentury: _NEXTCENTURY_
                }
            };
        DATE_DAILY_FROM = $("#daily-date-from-input", daily_tab).datetimepicker(date_opt);
        DATE_DAILY_TO = $("#daily-date-to-input", daily_tab).datetimepicker(date_opt);

        // устанавливаем по умолчанию
       
        var daily_peroid = getCookie('DAILY_PERIOD');
        if(daily_peroid == undefined){
            DATE_DAILY_TO.data("DateTimePicker").date(moment().endOf("day")); // период по -  конец текущего дня
            DATE_DAILY_FROM.data("DateTimePicker").date(moment().subtract(7, 'days').startOf('day')); // период с -  начало дня -2 от текущего
        } else {
            let dates = $.cookie('TREND_DATE');
            dates = dates.split(',');

            DATE_DAILY_FROM.data("DateTimePicker").date(moment(dates[0])); 
            DATE_DAILY_TO.data("DateTimePicker").date(moment(dates[1]));
            
        }

        daily_tab.delegate('.daily-load', "click", function () {
            // запишем в куки период до конца сессии
            var period = DATE_DAILY_FROM.data("DateTimePicker").date().format('YYYY-MM-DD')+ "," + DATE_DAILY_TO.data("DateTimePicker").date().format('YYYY-MM-DD');
            var d = new Date();
            d.setDate(d.getTime());
            document.cookie = "DAILY_PERIOD=" + period + "; expires=" + d.toGMTString() + "; path=/";
            ClearNoReloadTab('station_days'); // удалим из стоп массива
            reload_data(['station_days']); // обновили таб Суточные показатели
            stopStationDays(); //  и заносим в стоп массив
        });
    });
</script>

