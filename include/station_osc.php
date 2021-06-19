<?php
?>
<div class="control-block">
    <form class="form-inline" role="form">

        <label for="date_input_osc">
            <?= Dictionary::t('INCLUDES', 'DATE')?>
        </label>

        <div class="input-group date" id="date_osc">
            <input class="form-control" id="date_input_osc" type="text">
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>

        <label for="select_osc">
            <?= Dictionary::t('INCLUDES', 'OSCILLOGRAMS')?>
        </label>

        <div class="input-group date" id="date_osc">
            <select class="form-control" id="select_osc">
                <option selected=""><?= Dictionary::t('INCLUDES', 'SELECT_DATE')?></option>
            </select>
        </div>
    </form>
</div>

<div class="trend">
    <h3></h3>

    <div id="osc-trend" class="chart"></div>
    <div id="osc-trend-master" class="chart-master"></div>
</div>
<style>
    #osc-trend {
        height: 500px;
    }
</style>
<script>
$(document).ready(function () {
    var station_osc = $('#station_osc'),
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
    DATE_OSC = $("#date_osc", station_osc).datetimepicker(date_opt)
    
    DATE_OSC.data("DateTimePicker").date(moment());
    
    if(typeof $.cookie('STATION_OSC') == 'undefined'){
        DATE_OSC.data("DateTimePicker").date(moment());
    } else {
        DATE_OSC.data("DateTimePicker").date(moment($.cookie('STATION_OSC'))); 
    }
    
    
    OSC = [];
    OSC['date_last'] = ''; // грабли! dp.change срабатывает при клике на дату после .date(moment());
    OSC['station_last'] = ''; // нужно запомнить станцию, чтобы каждый раз не обновлять на одной станции

    DATE_OSC.on("dp.change", function (e) {
        
        if (OSC['date_last'] == DATE_OSC.data("DateTimePicker").date().format('DD.MM.YYYY')) {
            return false;
        } else {
            OSC['date_last'] = DATE_OSC.data("DateTimePicker").date().format('DD.MM.YYYY');
        }
        $.cookie('STATION_OSC', DATE_OSC.data("DateTimePicker").date().format('DD.MM.YYYY'), { expires: 1, path: '/' });

        $.ajax({
            url: "/ajax/get_osc.php",
            type: "POST",
            dataType: "html",
            data: {'st_id': Tab['station_id'], 'date': DATE_OSC.data("DateTimePicker").date().format('YYYY-MM-DD')},
            success: function (response) {
                var Data = $.parseJSON(response);
                $('#select_osc', station_osc).html(Data['options']);
                OSC_TREND = Data['res'];
                if (OSC_TREND) {
                    $("#select_osc").change();
                } else {
                    $('.trend', station_osc).css('display', 'none');
                }
            },
            error: function (err) {

            },
            complete: function () {

            }
        });
    });

    $("#select_osc").change(function () {

        var id = $(this).val(),
            detailChart = [],
            Data = OSC_TREND[id];

        $('.trend', station_osc).css('display', 'block');
        $('.trend h3', station_osc).html(Data['reg_name']);

        //Highcharts.chart('container', {

        detailChart['detchosc_' + id] = Highcharts.chart('osc-trend', {
            chart: {
                type: Data['type'] == 'dinamo' ? 'arearange' : 'spline'
            },
            tooltip: {
                xDateFormat: '%H:%M:%S.%L', // '%H:%M:%S %d/%m/%Y',
                /*
                 formatter: function () { //console.log(this);
                 var ser = this.points[0].series;
                 return Highcharts.dateFormat('%H:%M:%S.%L', this.x) + '<br/>' + ser.name + ': <b>' + this.y + '</b>' + ser.tooltipOptions.valueSuffix;
                 },
                 */
                valueDecimals: Data['decimal'],
                valueSuffix: Data['suffix']
            },
            series: [
                {   type: Data['type'] == 'dinamo' ? 'arearange' : 'spline',
                    data: Data['trend'],
                    name: _VALUE_,
                    //new_point: Data['point'],
                    marker: {
                        enabled: true,
                        radius: 1
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                }
            ]
        });
        if (Data['type'] == 'osc') {
            $('#osc-trend-master', station_osc).highcharts({
                chart: {
                    type: 'spline',
                    high: 100,
                    marginLeft: 50,
                    reflow: false,
                    borderWidth: 0,
                    backgroundColor: null,
                    zoomType: 'x',
                    events: {
                        selection: function (event) {
                            var extremesObject = event.xAxis[0],
                                min = extremesObject.min,
                                max = extremesObject.max,
                                detailData = [],
                                xAxis = this.xAxis[0];

                            // reverse engineer the last part of the data
                            $.each(this.series[0].data, function () {
                                if (this.x > min && this.x < max) {
                                    detailData.push([this.x, this.y]);
                                }
                            });
                            // move the plot bands to reflect the new detail span
                            xAxis.removePlotBand('mask-before');
                            xAxis.addPlotBand({
                                id: 'mask-before',
                                from: Data['trend'][0][0],
                                to: min,
                                color: 'rgba(0, 0, 0, 0.2)'
                            });
                            xAxis.removePlotBand('mask-after');
                            xAxis.addPlotBand({
                                id: 'mask-after',
                                from: max,
                                to: Data['trend'][Data['trend'].length - 1][0],
                                color: 'rgba(0, 0, 0, 0.2)'
                            });
                            detailChart['detchosc_' + id].series[0].setData(detailData);
                            return false;
                        }
                    }
                },
                title: {
                    text: null
                },
                xAxis: {
                    type: 'datetime',
                    showLastTickLabel: true,
                    //maxZoom: 14 * 24 * 3600000, // fourteen days
                    plotBands: [
                        {
                            id: 'mask-before',
                            from: Data['trend'][0][0],
                            to: Data['trend'][Data['trend'].length - 1][0],
                            color: 'rgba(0, 0, 0, 0.2)'
                        }
                    ],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    gridLineWidth: 0,
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    showFirstLabel: false
                },
                tooltip: {
                    formatter: function () {
                        return false;
                    }
                },
                plotOptions: {
                    series: {
                        fillColor: {
                            linearGradient: [0, 0, 0, 70],
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, 'rgba(255,255,255,0)']
                            ]
                        },
                        lineWidth: 1,
                        marker: {
                            enabled: false
                        },
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        enableMouseTracking: false
                    }
                },

                series: [
                    {
                        type: 'area',
                        name: 'USD to EUR',
                        pointStart: Data['trend'][0][0],
                        data: Data['trend']
                    }
                ],
                exporting: {
                    enabled: false
                }
            }).fadeIn(300);
        } else {
            $('#osc-trend-master', station_osc).fadeOut(300);
        }
    });
});
</script>