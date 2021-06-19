<?php
?>
<div class="control-block">
    <form class="form-inline" role="form">

        <label for="date_input_dinamo">
            <?= Dictionary::t('INCLUDES', 'DATE')?>
        </label>

        <div class="input-group date" id="date_dinamo">
            <input class="form-control" id="date_input_dinamo" type="text">
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>

        <label for="select_dinamo">
            <?= Dictionary::t('INCLUDES', 'OSCILLOGRAMS')?>
        </label>

        <div class="input-group date" id="date_dinamo">
            <select class="form-control" id="select_dinamo">
                <option selected=""><?= Dictionary::t('INCLUDES', 'SELECT_DATE')?></option>
            </select>
        </div>
    </form>
</div>

<div class="trends">

</div>
<style>
    #dinamo_tab .trend {
        height: 330px;
        display: block !important;
    }
</style>
<script>
    $(document).ready(function () {
        var station_dinamo = $('#dinamo_tab'),
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
        DATE_dinamo = $("#date_dinamo", station_dinamo).datetimepicker(date_opt)

        DATE_dinamo.data("DateTimePicker").date(moment());

        if(typeof $.cookie('STATION_dinamo') == 'undefined'){
            DATE_dinamo.data("DateTimePicker").date(moment());
        } else {
            DATE_dinamo.data("DateTimePicker").date(moment($.cookie('REPORT_BL_PING')));
        }


        DINAMO = [];
        DINAMO['date_last'] = ''; // грабли! dp.change срабатывает при клике на дату после .date(moment());
        DINAMO['station_last'] = ''; // нужно запомнить станцию, чтобы каждый раз не обновлять на одной станции

        DATE_dinamo.on("dp.change", function (e) {

            if (DINAMO['date_last'] == DATE_dinamo.data("DateTimePicker").date().format('DD.MM.YYYY')) {
                return false;
            } else {
                DINAMO['date_last'] = DATE_dinamo.data("DateTimePicker").date().format('DD.MM.YYYY');
            }
            $.cookie('STATION_dinamo', DATE_dinamo.data("DateTimePicker").date().format('DD.MM.YYYY'), { expires: 1, path: '/' });

            $.ajax({
                url: "/ajax/get_dinamo.php",
                type: "POST",
                dataType: "html",
                data: {'st_id': Tab['station_id'], 'date': DATE_dinamo.data("DateTimePicker").date().format('YYYY-MM-DD')},
                success: function (response) {
                    var Data = $.parseJSON(response);
                    $('#select_dinamo', station_dinamo).html(Data['options']);
                    DINAMO_TREND = Data['res'];
                    if (DINAMO_TREND) {
                        get_danamo();
                    } else {
                        $('.trend', station_dinamo).css('display', 'none');
                    }
                },
                error: function (err) {

                },
                complete: function () {

                }
            });
        });

        //$("#select_dinamo").change(function () {get_danamo();});

        function get_danamo(){


            for (var i = 0; i < DINAMO_TREND.length; i++) {


                var id = i,
                    detailChart = [],
                    Data = DINAMO_TREND[id],
                    bl = $('<div>', {class:'trend', html:'<h3></h3><div id="dinamo-chart-'+i+'" class="chart"></div>'}).appendTo($('.trends', station_dinamo));


                $('h3', bl).html(Data['name']);

                //Highcharts.chart('container', {

                detailChart['detChDinamo_' + id] = Highcharts.chart('dinamo-chart-'+i, {
                    chart: {
                        type: 'spline',
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift',
                        scrollablePlotArea: {
                            minWidth: 600
                        }
                    },
                    annotations: [{
                        labels: Data['labels']
                    }],
                    legend: {
                        enabled: false
                    },
                    series: [
                        {   type: 'spline',
                            data: Data['trend'],
                            name: '',
                            //new_point: Data['point'],
                            marker: {
                                enabled: true,
                                radius: 1
                            },
                            lineWidth: 1,
                            threshold: null,
                            states: {
                                hover: {
                                    lineWidthPlus: 0
                                }
                            }
                        }
                    ]
                });
            }
        };
    });
</script>