<?php
// отчет
// таблица
// график
?>
<div id="electric_data">

</div>

<div id="electric_trend">
        <form class="form-inline" role="form">
            <label for="date_from_input">
                <?= Dictionary::t('INCLUDES', 'PERIOD')?>
            </label>
            <span>c</span>

            <div class='input-group date' id='el-trend-date-from'>
                <input type='text' class="form-control" id="el-trend-date-from-input"/>
                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
            <span><?= Dictionary::t('INCLUDES', 'BY')?></span>

            <div class='input-group date' id='el-trend-date-to'>
                <input type="text" class="form-control" id="el-trend-date-to-input"/>
                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>

            <div class="btn-group">
                <button type="button" class="btn btn-primary el-load-trend"><?= Dictionary::t('INCLUDES', 'SHOW_CHARTS')?></button>
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                    <span class="caret"></span>
                    <span class="sr-only"><?= Dictionary::t('INCLUDES', 'SWTCH_MENU')?></span>
                </button>
                <ul class="dropdown-menu" role="menu">
                    <li><a class="el-load-report"><?= Dictionary::t('INCLUDES', 'DOWNLOAD_REPORT')?></a></li>
                </ul>
            </div>
        </form>
       

    <div id="el-bl-trend">
        <?php
        if ($aReg = get_electric_reg_old(false, 'id')) {
            foreach ($aReg as $r) {
		if($r['id'] ==2 || $r['id'] ==3 || $r['id'] ==4 
				|| $r['id'] == 5 || $r['id'] ==6 || $r['id'] ==11) {}
		else{
                ?>
                <div class="trend">
                    <h3><?= Dictionary::t('ELECTRIC_REG', $r['reg']); ?></h3> <button type="button" class="btn btn-warning btn-xs reset-trend"><?= Dictionary::t('INCLUDES', 'RESET_ZOOM')?></button>

                    <p class="period"></p>

                    <div id="el-chart-<?= $r['id'] ?>" class="chart"></div>
                <!--    <div id="el-chart-master-<?= $r['id'] ?>" class="chart-master"></div> -->
                    <div class="load"><?= Dictionary::t('INCLUDES', 'LOAD')?>...</div>
                </div>
            <?php
}
            }
        }
        ?>
    </div>
</div>


<script>
$(document).ready(function () {

    var electric_tab = $('#electric_tab'),
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
    electric_tab.delegate('.reset-trend', "click", function () {
        
        $.each($('.trend:visible .chart', electric_tab), function( key, value ) {
            $('.reset-trend', electric_tab).fadeOut( "slow");
            var index = $("#"+$(this).attr('id')).attr('data-highcharts-chart');
            var chart = Highcharts.charts[index];
            if(typeof chart == 'undefined')
                return true;
            chart.series[0].setData(chart.options.resetZoomData);
        });
    }); 
   
    
    DATE_EL_FROM = $("#el-trend-date-from", electric_tab).datetimepicker(date_opt);
    DATE_EL_TO = $("#el-trend-date-to", electric_tab).datetimepicker(date_opt);

    // устанавливаем по умолчанию
    DATE_EL_TO.data("DateTimePicker").date(moment().endOf("day")); // период по -  конец текущего дня
    DATE_EL_FROM.data("DateTimePicker").date(moment().subtract(2, 'days').startOf('day')); // период с -  начало дня -2 от текущего
    
    if(typeof $.cookie('ELECTRIC_TAB') == 'undefined'){
        
        DATE_EL_TO.data("DateTimePicker").date(moment().endOf("day")); // период по -  конец текущего дня
        DATE_EL_FROM.data("DateTimePicker").date(moment().subtract(2, 'days').startOf('day')); // период с -  начало дня -2 от текущего
    } else {
        let dates = $.cookie('ELECTRIC_TAB');
        dates = dates.split(',');
        DATE_EL_FROM.data("DateTimePicker").date(moment(dates[0]));
        DATE_EL_TO.data("DateTimePicker").date(moment(dates[1])); 
    }

    electric_tab.delegate('.el-load-report', "click", function () {
        var data = 'st_id=' + Tab['station_id'] + '&date_from=' + DATE_EL_FROM.data("DateTimePicker").date().format('YYYY-MM-DD') + '&date_to=' + DATE_EL_TO.data("DateTimePicker").date().format('YYYY-MM-DD');
        window.open('/ajax/electric_report_xls.php?' + data, '_blank');
    });
  
    electric_tab.delegate('.el-load-trend', "click", function () {

        $('.trend .load', electric_tab).css('display', 'block');
        $('.trend', electric_tab).css('display', 'block');
        $('.trend .highcharts-container', electric_tab).css('opacity', '0.7');

        $.cookie('ELECTRIC_TAB', [DATE_EL_FROM.data("DateTimePicker").date().format('YYYY-MM-DD'), DATE_EL_TO.data("DateTimePicker").date().format('YYYY-MM-DD')], { expires: 3, path: '/' });
 	 $.ajax({
          url: "/ajax/get_electric_consumption.php",
          type: "POST",
          dataType: "html",
          data: {'st_id': Tab['station_id'], 'date_from': DATE_EL_FROM.data("DateTimePicker").date().format('YYYY-MM-DD'), 'date_to': DATE_EL_TO.data("DateTimePicker").date().format('YYYY-MM-DD')},
          success: function (response) {
             $('#el_cons_table').remove();
           // $('#el-bl-trend').prepend(response)
            $('#el-bl-trend').prepend(response)
          },
          error: function (err) {
             $('#el_cons_table').remove();
          },
          complete: function () {
          }
      });

        $.ajax({
            url: "/ajax/get_electric_trend.php",
            type: "POST",
            dataType: "html",
            data: {'st_id': Tab['station_id'], 'date_from': DATE_EL_FROM.data("DateTimePicker").date().format('YYYY-MM-DD'), 'date_to': DATE_EL_TO.data("DateTimePicker").date().format('YYYY-MM-DD')},
            success: function (response) {
                var is_json = true,
                    Data = [];
                try {
                    var Data = $.parseJSON(response);
                } catch (e) {
                    is_json = false;
                }

                if (is_json && Data['res'] == 1) {
                    $('.trend .load', electric_tab).css('display', 'none');
                    $('.trend .highcharts-container', electric_tab).css('opacity', '1');
                    trend_electric(Data)
                } else { // пришли левые данные
                    $('.trend .load', electric_tab).text(_DATAERROR_);
                }
            },
            error: function (err) {
                $('.trend .load', electric_tab).text(_COMERROR_);
            },
            complete: function () {

            }
        });
    });
   
    function trend_electric(data) {

        var el_bl = $('#el-bl-trend', electric_tab);
        $('.trend', el_bl).css('display', 'block');

        if(data['electric_type'] == '2' || data['electric_type'] == '1') { //Заглушка на отключенные графика/ов
            $('#el-chart-3', el_bl).parents('.trend').hide(); //Откл температура для меркурия
        }
        
        $.each(data['TRENDS'], function (i, value) {

            var Data = value;
            if (Data['Data'] != null) {
                
                var d_f = moment(Data['Data'][0][0]).format('DD.MM.YYYY HH:mm:ss'),
                    end = Data['Data'][ Data['Data'].length - 1 ][0],
                    d_t = moment(end).format('DD.MM.YYYY HH:mm:ss');
            } else {
                var d_f = moment(data['d_f']).format('DD.MM.YYYY HH:mm:ss'),
                    d_t = moment(data['d_t']).format('DD.MM.YYYY HH:mm:ss');
            }
  if ($('#el-chart-' + Data['reg'], el_bl).length>0){
            $('#el-chart-' + Data['reg'], el_bl).parent().find('.period').html(_PERIODDATA_+': ' + d_f + ' - ' + d_t);

            var detailChart = [];
            detailChart['el-chart-' + Data['reg']] = $('#el-chart-' + Data['reg'], el_bl).highcharts({
                chart:{
                   marginLeft: 50,
                   reflow: false,
                   borderWidth: 0,
                   backgroundColor: null,
                   zoomType: 'x',
                   events: {
                       // listen to the selection event on the master chart to update the
                       // extremes of the detail chart
                       selection: function (event) {
                           $('.reset-trend', electric_tab).fadeIn( "slow");
                           var extremesObject = event.xAxis[0],
                               min = extremesObject.min,
                               max = extremesObject.max;

                           $.each($('.trend:visible .chart', el_bl), function( key, value ) {
                               
                               var index = $("#"+$(this).attr('id')).attr('data-highcharts-chart');
                               var chart = Highcharts.charts[index];console.log(chart);
                               var detailData = [];
                               if(typeof chart == 'undefined')
                                   return true;
                               
                               $.each(chart.series[0].data, function () {
                                   if (this.x > min && this.x < max) {
                                       detailData.push([this.x, this.y]);
                                   }
                               });
                               console.log(chart);
                               chart.series[0].setData(detailData);
                           });
                           return false;
                       }
                   }
               },
                resetZoomData: Data['Data'],
                tooltip: {
                    xDateFormat: '%H:%M %d/%m/%Y', // '%H:%M:%S %d/%m/%Y',
                    formatter: function () { //console.log(this);
                        return Highcharts.dateFormat('%H:%M %d/%m/%Y', this.x) + '<br/>' + this.points[0].series.name + ': <b>' + this.y + '</b>';
                    },
                    valueDecimals: Data['decimal'],
                    valueSuffix: Data['suffix'],
                    shared: true
                },
                series: [
                    {
                        data: Data['Data'],
                        name: _VALUE_,
                        new_point: Data['point'],
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
            }).highcharts();
            
            }
            
       /*     $('#el-chart-master-' + Data['reg'], el_bl).highcharts({
                chart: {
                    type: 'spline',
                    high: 100,
                    marginLeft: 50,
                    reflow: false,
                    borderWidth: 0,
                    backgroundColor: null,
                    zoomType: 'x',
                    events: {
                        // listen to the selection event on the master chart to update the
                        // extremes of the detail chart
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
                                from: Data['Data'][0][0],
                                to: min,
                                color: 'rgba(0, 0, 0, 0.2)'
                            });
                            xAxis.removePlotBand('mask-after');
                            xAxis.addPlotBand({
                                id: 'mask-after',
                                from: max,
                                to: Data['Data'][Data['Data'].length - 1][0],
                                color: 'rgba(0, 0, 0, 0.2)'
                            });
                            detailChart['el-chart-' + Data['reg']].series[0].setData(detailData);
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
                            from: Data['Data'][0][0],
                            to: Data['Data'][Data['Data'].length - 1][0],
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
                        pointStart: Data['Data'][0][0],
                        data: Data['Data']
                    }
                ],
                exporting: {
                    enabled: false
                }
            });*/
        });
    }
});

  
</script>
