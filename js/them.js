$.ui.fancytree.debugLevel = 0; //убираем вывод в консоли для дерева месторождений

// устанавливаем начальные табы, можно хрнить в куках, при обновлении страницы, выдавать старые табы
Tab = {
    'page': 'PageFolder',
    'place_tab': 'svod_data',
    'station_tab': 'station_data',
    'place_id': -1,
    'station_params': {}
};

// информация о табах, конфигурация что загружать куда помещать
ajax_url = {
    'svod_data': {
        'url': '/ajax/place_svod_table.php',
        'select': '#svod_data .place_svod_table'
    },
    'station_data': {
        'url': '/ajax/station_data.php',
        'select': '#station_data .station_data'
    },
    'station_data_control': {
        'url': '/ajax/station_data_control.php',
        'select': '#station_data .station_data_control'
    },
    'station_crash': {
        'url': '/ajax/station_crash.php',
        'select': '#station_data .station_crash'
    },
    'station_trend': {
        'url': '/ajax/station_trend.php',
        'select': '#station_trend .station_trend_in',
        'callback': checked_params_trend
    },
    'station_info': {
        'url': '/ajax/station_info.php',
        'select': '#station_info .tables_info'
    },
    'station_history': {
        'url': '/ajax/station_history.php',
        'select': '#station_history .tables_info'
    },
    /*
    'station_command_table': {
        'url': '/ajax/station_command_table.php',
        'select': '#command_table'
    },
    */
    'station_command_control': {
        'url': '/ajax/station_command_control.php',
        'select': '#command_control',
        'callback': range
    },
    'station_electric': {
        'url': '/ajax/station_electric.php',
        'select': '#electric_data'
    },
    'station_days': {
        'url': '/ajax/station_days.php',
        'select': '#station_daily_data'
    }
};
// массив обновляемых табов группы, смотрим ajax_url
ReloadPlaceTabs = ['svod_data'];

// массив обновляемых табов станции, смотрим ajax_url
ReloadStationTabs = ['station_data', 'station_data_control', 'station_crash', 'station_trend', 'station_info', 'station_history',  'station_command_control', 'station_electric', 'station_days']; // 'station_command_table',

// масив табов в которых не нужно обновлять данные, корректируется от действий пользователя
noReloadTab = [];






$("#tree").fancytree({
    extensions: ["glyph","filter"],
      icon: function(event, data){
    // (Optional dynamic icon definition...)
  },
  
    glyph: {
        preset: "awesome5",
        map: {  
            expanderClosed: "icon-plus bootstrap-btn-success-color",
            expanderOpen: "icon-minus bootstrap-btn-primary-color",
            expanderLazy: "icon-angle-right",
        }
    },
    autoCollapse: false,
    autoExpand: true,
    leavesOnly: true,
    filter: {
        mode: "hide",
        autoApply: true
    },
    source: {url: "/ajax/get_tree.php"},
    renderNode: function(event, data) {
        var node = data.node;
        var $span = $(node.span);
        var titleSpan = $span.find("> span.fancytree-title");
        var iconSpan = $span.find("> span.fancytree-icon");
        
        var stationStyle = 
            {
                position:"relative",
                left:"2px",
                top:"1px",
                width: "11px",
                height: "11px",
                borderRadius: "100%",
                background : ""
            };
            
            var stationCrashStyle = 
            {
                position:"relative",
                left:"2px",
                top:"1px",
                width: "11px",
                height: "11px",
                borderRadius: "100%",
                background : "red",
                animation: "glowing 2s infinite ease-in-out" 
            };
        
        if(node.isFolder()){
            titleSpan.find('.folder_statuses').removeClass('hidden');
            var statuses = node.data.status;
            if(statuses){
                if($.inArray(1, statuses) >= 0){
                    titleSpan.find('.green').removeClass('hidden');
                }else {
                    titleSpan.find('.green').addClass('hidden');
                }
                if($.inArray(2, statuses) >= 0){
                    titleSpan.find('.yellow').removeClass('hidden');
                }else {
                    titleSpan.find('.yellow').addClass('hidden');
                }
                if($.inArray(0, statuses) >= 0){
                    titleSpan.find('.grey').removeClass('hidden');
                }else {
                    titleSpan.find('.grey').addClass('hidden');
                }
                if($.inArray(-1, statuses) >= 0){
                    titleSpan.find('.red').removeClass('hidden');
                }else {
                    titleSpan.find('.red').addClass('hidden');
                }
                if($.inArray(-2, statuses) >= 0){
                    titleSpan.find('.crash').removeClass('hidden');
                }else {
                    titleSpan.find('.crash').addClass('hidden');
                }
            
            } else {
                titleSpan.find('.folder_status').addClass('hidden')
            }
        } else {
            if(node.data.status == 1) {
                stationStyle.background = "#019810";
                iconSpan.css(stationStyle);
            } else if(node.data.status == 0) {
                stationStyle.background = "#aaa";
                iconSpan.css(stationStyle);
            } else if(node.data.status == -1) {
                stationStyle.background = "red";
                iconSpan.css(stationStyle);
            } else if(node.data.status == 2) {
                stationStyle.background = "#F1C900";
                iconSpan.css(stationStyle);
            } else if(node.data.status == -2) {
                iconSpan.css(stationCrashStyle);
            }
        }
    },
    init: function (event, data) { //create
        if(typeof $.cookie('selectPlace') != 'undefined') {
            data.tree.activateKey($.cookie('selectPlace'));
            $('a[href="'+$.cookie('place_tab')+'"]').trigger('click');
        } else if(typeof $.cookie('selectStation') != 'undefined') {
            data.tree.activateKey($.cookie('selectStation'));
            $('a[href="'+$.cookie('station_tab')+'"]').trigger('click');
        } else {
            var f = data.tree.findFirst('');
            data.tree.activateKey(f.key);
        }
    },
    activate: function (event, data) {
        $('.page').fadeOut(0);
        if (data.node.isFolder()) {
            $('.PageFolder').fadeIn(300);
            Tab['page'] = 'PageFolder';
            Tab['place_id'] = data.node.key.substr(2, 255);
            $.cookie('selectPlace', data.node.key, { expires: 7, path: '/' });
            $.removeCookie('selectStation');
            /*
             $('#right-map').css('display','block');
             $('#right-data').css('display','none');
             station_id = -1;
             $('#skv-info').html('');
             LoadMapObjects(data.node.key.substr(4,20));
             LoadSvodStationList(data.node.key.substr(4,20));
             */
        } else {
            $('.PageStation').fadeIn(0);
            Tab['page'] = 'PageStation';
            Tab['station_id'] = data.node.key.substr(2, 255);
            $.cookie('selectStation', data.node.key, { expires: 7, path: '/' });
            $.removeCookie('selectPlace');
            //SetSKV(data.node.key.substr(4,20));
        }
        var name = data.node.parent.title;
        if (name == 'root') {
            name = '<b>' + data.node.title + '</b>';
        } else {
            name = name + ' -  <b>' + data.node.title + '</b>';
        }
        $('#namePage').html(name);
        clear_data(); // !!!запускать только когда станция сменилась или месторождение, #tree так и отрабатывает
        noReloadTab = []; // обнуляем стоп массив
        reload_data();
        afterActivateTree();
    }
});

tree = $("#tree").fancytree("getTree");

function afterActivateTree() {
    stopControl();
    stopStationTab(); // обновили данные скважины и заносим нужные табы в стоп массив
    reloadStationOsc(); // обновляем таб Оссцилограммы
}

function reloadStationOsc() {
    if (Tab['page'] == 'PageStation' && Tab['station_tab'] == '#station_osc') {
        if (OSC['station_last'] == Tab['station_id']) {
            return false;
        } else {
            OSC['station_last'] = Tab['station_id'];
        }
        OSC['date_last'] = '';
    //    DATE_OSC.data("DateTimePicker").date(moment());
    }
}

function stopControl() {
    // если на Табе Управление, то отключим обновление control
    if (Tab['station_tab'] == '#command_tab') {
        if ($.inArray('station_command_control', noReloadTab) == -1) {
            noReloadTab.push('station_command_control');
        }
    } else {
        // иначе восстновим обновление control
        noReloadTab.splice($.inArray('station_command_control', noReloadTab), 1);
    }
}

function ClearNoReloadTab(tab) {
    noReloadTab.splice($.inArray(tab, noReloadTab), 1);
}

function stopStationTab() {
    noReloadTab.push('station_days');
    noReloadTab.push('station_data_control');
    noReloadTab.push('station_trend');
}

function stopStationDays(){
    noReloadTab.push('station_days');
}

if ($("input[type=search]").val() != '') {
    $(".clrsearch").css('display', 'block');
}

$("input[type=search]").keyup(function (e) {
    var match = $(this).val();

    if (e && e.which === $.ui.keyCode.ESCAPE || $.trim(match) === "") {
        $(".clrsearch").click();
        return;
    }
    $(".clrsearch").css('display', 'block');

    tree.filterNodes(function (node) {
        return new RegExp(match, "i").test(node.title);
    });

});

$(".clrsearch").click(function () {
    $("input[type=search]").val("");
    tree.clearFilter();
    $(this).css('display', 'none');
});

// TABS click
$('a[data-toggle="tab"]').click(function (e) {
    if (Tab['page'] == 'PageFolder') {
        Tab['place_tab'] = $(this).attr('href');
        $.cookie('place_tab', $(this).attr('href'), { expires: 7, path: '/' });
    } else {
        Tab['station_tab'] = $(this).attr('href');
        $.cookie('station_tab', $(this).attr('href'), { expires: 7, path: '/' });
    }
    stopControl();
    reloadStationOsc();
});

function open_station(id) {
    tree.activateKey('st' + id);
}

// SVOD_DATA
$(function () {
    var svod_data = $("#svod_data"),
        modal = $('#modalChat');

    svod_data.delegate("a", "click", function () {
        var id = $(this).attr('st_id');
        open_station(id);
    });

    svod_data.delegate(".chat", "click", function () {
        var id = $(this).attr('st_id');
        $('#inp_st_id', modal).val(id);
        // обнуляем окно
        $('.form-control', modal).css('display', 'none').val('');
        $('.modal-body', modal).html('');
        $('.save', modal).html( _ADD_);
        $('h4', modal).html(_LOADDATA_);
        arh_off($('.arhiv', modal));
        modal.modal('show');
        res_modal_h();

        $.ajax({
            url: "/ajax/get_chat.php",
            type: "POST",
            dataType: "html",
            data: {'st_id': id},
            success: function (response) {
                var Data = $.parseJSON(response);
                $('h4', modal).html(Data['title']);
                $('.modal-body', modal).html(Data['Data']);
                $('.form-control', modal).attr({'id': Data['st_id']});
            },
            error: function (err) {
                $('h4', modal).html(_ERROR_);
                $('.modal-body', modal).html(_NOTCOMSERVER_);
            }
        });
    });

    // SORT TABLE
    svod_data.delegate("th.sort", "click", function () {
        
        var th = $(this);
        var table = $("#svod");
        var col = th.index();
        var sortCol = th.index('.sort');
        var statContent = $(".place_svod_table");
        
        $("#svod").find("th.sort").removeClass('desc asc');
        
        if(sortCol == 0){
            if(th.hasClass('downSort')) {
                th.removeClass('downSort')
                table.find('tr:has(td)').sort(function(a, b) {
                    var aVal = $(a).find('td').eq(col).find('a').first().text();
                    var bVal = $(b).find('td').eq(col).find('a').first().text();
                    
                    aVal = Number(aVal.replace(/[^0-9]/gm, ''));
                    bVal = Number(bVal.replace(/[^0-9]/gm, ''));
                    
                    return (aVal > bVal) ? (aVal > bVal) ? 1 : 0 : -1;
                }).appendTo(table.find('tbody'));
                th.addClass('asc');
                statContent.attr('sort_type', 1).attr('sort_click', 2);
            } else {
                th.addClass('downSort')
                table.find('tr:has(td)').sort(function(a, b) {
                    var aVal = $(a).find('td').eq(col).find('a').text();
                    var bVal = $(b).find('td').eq(col).find('a').text();
                    
                    aVal = Number(aVal.replace(/[^0-9]/gm, ''));
                    bVal = Number(bVal.replace(/[^0-9]/gm, ''));

                    
                    return (bVal > aVal) ? (bVal > aVal) ? 1 : 0 : -1;
                }).appendTo(table.find('tbody'));
                th.addClass('desc');
                statContent.attr('sort_type', 1).attr('sort_click', 1);
            }
        } else if(sortCol == 1) {
            th.attr({'class': 'sort'});
             if(!th.is('[sortId]') || (th.attr('sortId') == 0 && th.is('[sortId]'))) {
                table.find('tr:has(td)').sort(function(a, b) {
                    
                    //antenn = 4 score, router = 3 score, controller = 2 score, elect = 1 score
                    var elems = $(a).find('td').eq(col).find('span').length
                    var aVal = 0;
                    var bVal = 0;
                    if(elems < 4) {
                        if($(a).find('td').eq(col).find('span').eq(0).hasClass( "green" ))
                            aVal += 3;
                        if($(a).find('td').eq(col).find('span').eq(1).hasClass( "green" ))
                            aVal += 2;
                        if($(a).find('td').eq(col).find('span').eq(2).hasClass( "green" ))
                            aVal += 1;
                        if($(b).find('td').eq(col).find('span').eq(0).hasClass( "green" ))
                            bVal += 3;
                        if($(b).find('td').eq(col).find('span').eq(1).hasClass( "green" ))
                            bVal += 2;
                        if($(b).find('td').eq(col).find('span').eq(2).hasClass( "green" ))
                            bVal += 1;
                    } else {
                        if($(a).find('td').eq(col).find('span').eq(0).hasClass( "green" ))
                            aVal += 4;
                        if($(a).find('td').eq(col).find('span').eq(1).hasClass( "green" ))
                            aVal += 3;
                        if($(a).find('td').eq(col).find('span').eq(2).hasClass( "green" ))
                            aVal += 2;
                        if($(a).find('td').eq(col).find('span').eq(3).hasClass( "green" ))
                            aVal += 1;
                        if($(b).find('td').eq(col).find('span').eq(0).hasClass( "green" ))
                            bVal += 4;
                        if($(b).find('td').eq(col).find('span').eq(1).hasClass( "green" ))
                            bVal += 3;
                        if($(b).find('td').eq(col).find('span').eq(2).hasClass( "green" ))
                            bVal += 2;
                        if($(b).find('td').eq(col).find('span').eq(3).hasClass( "green" ))
                            bVal += 1;
                    }
                //    var aVal = $(a).find('td').eq(col).find('span.red').length;
               //     var bVal = $(b).find('td').eq(col).find('span.red').length;
                    return (aVal < bVal) ? (aVal < bVal) ? 1 : 0 : -1;
                }).appendTo(table.find('tbody'));
                th.attr('sortId', 1);
                statContent.attr('sort_type', 3).attr('sort_click', 1);
                th.addClass('asc');
            } else if(th.attr('sortId') == 1 && th.is('[sortId]')) {
                
                table.find('tr:has(td)').sort(function(a, b) {
                    var elems = $(a).find('td').eq(col).find('span').length
                    var aVal = 0;
                    var bVal = 0;
                    if(elems < 4) {
                        if($(a).find('td').eq(col).find('span').eq(0).hasClass( "red" ))
                            aVal += 3;
                        if($(a).find('td').eq(col).find('span').eq(1).hasClass( "red" ))
                            aVal += 2;
                        if($(a).find('td').eq(col).find('span').eq(2).hasClass( "red" ))
                            aVal += 1;
                        if($(b).find('td').eq(col).find('span').eq(0).hasClass( "red" ))
                            bVal += 3;
                        if($(b).find('td').eq(col).find('span').eq(1).hasClass( "red" ))
                            bVal += 2;
                        if($(b).find('td').eq(col).find('span').eq(2).hasClass( "red" ))
                            bVal += 1;
                    } else {
                        if($(a).find('td').eq(col).find('span').eq(0).hasClass( "red" ))
                            aVal += 4;
                        if($(a).find('td').eq(col).find('span').eq(1).hasClass( "red" ))
                            aVal += 3;
                        if($(a).find('td').eq(col).find('span').eq(2).hasClass( "red" ))
                            aVal += 2;
                        if($(a).find('td').eq(col).find('span').eq(3).hasClass( "red" ))
                            aVal += 1;
                        if($(b).find('td').eq(col).find('span').eq(0).hasClass( "red" ))
                            bVal += 4;
                        if($(b).find('td').eq(col).find('span').eq(1).hasClass( "red" ))
                            bVal += 3;
                        if($(b).find('td').eq(col).find('span').eq(2).hasClass( "red" ))
                            bVal += 2;
                        if($(b).find('td').eq(col).find('span').eq(3).hasClass( "red" ))
                            bVal += 1;
                    }
                    return (aVal < bVal) ? (aVal < bVal) ? 1 : 0 : -1;
                }).appendTo(table.find('tbody'));  
                th.attr('sortId', 0);
                statContent.attr('sort_type', 3).attr('sort_click', 2);
                th.addClass('desc');
            } 
        }  else if(sortCol == 2 ) {
            
            if(th.hasClass('downSort')) {
                th.removeClass('downSort')
                table.find('tr:has(td)').sort(function(a, b) {
                    var aVal = $(a).find('td').eq(col).find('span').first().attr('rel');
                    var bVal = $(b).find('td').eq(col).find('span').first().attr('rel');
                    if(typeof aVal == 'undefined')
                        aVal = -2;
                    if(typeof bVal == 'undefined')
                        bVal = -2;
                    return (aVal < bVal) ? (aVal < bVal) ? 1 : 0 : -1;
                }).appendTo(table.find('tbody'));
                statContent.attr('sort_type', 5).attr('sort_click', 2);
                th.addClass('asc');
            } else {
                th.addClass('downSort')
                table.find('tr:has(td)').sort(function(a, b) {
                    var aVal = $(a).find('td').eq(col).find('span').first().attr('rel');
                    var bVal = $(b).find('td').eq(col).find('span').first().attr('rel');
                    if(typeof aVal == 'undefined')
                        aVal = -2;
                    if(typeof bVal == 'undefined')
                        bVal = -2;
                    return (aVal > bVal) ? (aVal > bVal) ? 1 : 0 : -1;
                }).appendTo(table.find('tbody'));
                statContent.attr('sort_type', 5).attr('sort_click', 1);
                th.addClass('desc');
            }
        }
              
        
        
        
        
        /* Старая сортировка
        var th = $(this),
            col = th.index(),
            tr = $('tbody tr', svod_data),
            aSort = [],
            asc = $(this).hasClass('desc');

        $('th.sort', svod_data).removeClass('asc').removeClass('desc');
        if (asc) {
            $(this).addClass('asc').removeClass('desc');
        } else {
            $(this).removeClass('asc').addClass('desc');
        }

        tr.each(function (i, el) {

            var td = $('td', el),
                sort_name = $(td[1]).attr('sort'),
                sort = $(td[col]).attr('sort');

            if (sort == 'txt') {
                sort = $(td[col]).text();
            }
            aSort.push([sort, i]);
        });
        //console.log(aSort);
        aSort.sort();
        //console.log(aSort);
        for (var i = 0; i < aSort.length; i++) {
            var ind = aSort[i][1];
            //console.log(tr[ind]);
            if (asc) {
                $(tr[ind]).prependTo('tbody', svod_data);
            } else {
                $(tr[ind]).appendTo('tbody', svod_data);
            }

        }
        */
    });

    modal.delegate(".save", "click", function () {
        var text = $('.form-control', modal),
            id = text.attr('id');

        text.parent().removeClass('has-error');

        if ($(this).html() == _SAVE_) {

            if (text.val().length > 0) {

                //save
                $.ajax({
                    url: "/ajax/save_chat.php",
                    type: "POST",
                    dataType: "html",
                    data: {'st_id': id, text: text.val()},
                    success: function (response) {
                        var Data = $.parseJSON(response);
                        $('.modal-body', modal).html(Data['Data']);
                        arh_off($('.arhiv', modal));
                    },
                    error: function (err) {
                        $('.mess', modal).html(_ERRORNOTRESPSERV_);
                    }
                });


            } else {
                text.focus().parent().addClass('has-error');
            }
        } else {
            text.fadeIn(0).focus();
            $(this).html(_SAVE_);
            res_modal_h();
        }

    });

    modal.delegate("p .del", "click", function () {
        var del = $(this),
            id = del.attr('id_ch');

        // del
        $.ajax({
            url: "/ajax/del_chat.php",
            type: "POST",
            dataType: "html",
            data: {'id': id},
            success: function (response) {
                var Data = $.parseJSON(response);
                if (Data['res'] == 1) {
                    del.parent().parent().fadeOut(500);
                }
                $('.mess', modal).html(Data['mess']);
            },
            error: function (err) {
                $('.mess', modal).html(_ERRORNOTRESPSERV_);
            }
        });

    });

    modal.delegate(".arhiv", "click", function () {

        if ($(this).text() == _ARCHIVE_) {

            var st_id = $('#inp_st_id', modal).val();

            arh_on($(this));

            $.ajax({
                url: "/ajax/get_chat.php",
                type: "POST",
                dataType: "html",
                data: {'st_id': st_id, 'act': 'all'},
                success: function (response) {
                    var Data = $.parseJSON(response);
                    $('.modal-body', modal).fadeOut(0).html(Data['Data']).fadeIn(300);
                },
                error: function (err) {
                    $('.mess', modal).html(_NOTCOMSERVER_);
                    arh_off($(this));
                }
            });

        } else {

            arh_off($(this));
            $('.modal-body .is_del', modal).fadeOut(300);
        }
    });

    function arh_on(a) {
        a.html('<span class="glyphicon glyphicon-eye-close"></span> '+_HIDE_).addClass('btn-primary').removeClass('btn-xs');
    }

    function arh_off(a) {
        a.html('<span class="glyphicon glyphicon-eye-open"></span> '+_ARCHIVE_).removeClass('btn-primary').addClass('btn-xs');
    }


});

// очищает данные таблицы при смене станций и месторождений в ИХ ВСЕХ ТАБАХ
function clear_data() {
    $('.' + Tab['page'] + ' .tab-content table td[rel]').html(''); // в таблицах станции
    // обработка графиков
    // if(Tab['station_id'] && typeof Tab['station_id'] != "undefined" && typeof $('.trend-block-up').attr('st_id') != "undefined" ) {
    //     if(Tab['station_id'] == $('.trend-block-up').attr('st_id')){
    //         $('.trend-block-up').removeClass('halfOpacity');
    //         $('.chartFieldName').addClass('green');
    //     } else {
    //         $('.trend-block-up').addClass('halfOpacity');
    //         $('.chartFieldName').removeClass('green');
    //     }
    // }
    if ($(Tab['station_tab']+" .trend")){
  	 $(Tab['station_tab']+" .trend").hide()
	  }
    // СДЕЛАТЬ !!! у месторождения нужно всю страницу обновить!
}

function ajax(url, select, callback) {
    $.ajax({
        url: url,
        success: function (data) {
            
            var Data = $.parseJSON(data);
            select.html(Data['content']);
            // для карт
            afterAjaxSetMapData(); // map.js
            afterAjaxSets();
            if (callback) {
                callback(Data['params']);
            }
            $('body').find('[data-toggle="tooltip"]').tooltip();
        }
    });
}
// Обновляем данные в зависимости от PageFolder/PageStation,
// Смотрим массивы обновляемых табов, остальные табы не обновляются.
// Время настраивается в setInterval, сейчас 120 сек.
function reload_data(actual_tab) {

    //alert(actual_tab);
    loadTreeStatus(); //обновляем дерево
    
    if (Tab['page'] == 'PageFolder') {
        var page = $('.PageFolder .tab-content'),
            id = '?place=' + Tab['place_id'],
            arr = actual_tab == undefined ? ReloadPlaceTabs : actual_tab;
    
            // Дерево в отчете перезагружаем при клике {
        //    generate_svod_params_tree();
            // }
    }
    if (Tab['page'] == 'PageStation') {
        var page = $('.PageStation .tab-content'),
            id = '?st_id=' + Tab['station_id'],
            arr = actual_tab == undefined ? ReloadStationTabs : actual_tab;
    }
    for (var i = 0; i < arr.length; i++) {

        var tab = ajax_url[ arr[i] ];

        // проверяем есть ли этот таб в стоп массиве
        if ($.inArray(arr[i], noReloadTab) == -1) {
            var url = tab['url'] + id,
                select = $(tab['select'], page),
                callback = tab['callback'];
            if (url) ajax(url, select, callback);
        }
    }
}
//reload_data();  tree.activateKey('pl1');

TimerId = setInterval(reload_data, 120 * 1000); // обновление текущего таба 2 минуты
//clearInterval(TimerId);
//TimerId = setInterval(reload_commands, 5000); // обновление commands


$(function () {
    var st_info = $("#station_info");

    st_info.delegate('.edit', "click", function () {
        var form = $('#form_station_info');
        $(this).fadeOut(0);
        $('.mess', st_info).fadeOut(0);
        $('.save, .cancel', st_info).fadeIn(300);
        $('.field', form).each(function () {
            if ($(this).val() == '-') $(this).val('');
        }).addClass('ch');
        // нужно остановить обновление этого таба
        if ($.inArray('station_info', noReloadTab) == -1) noReloadTab.push('station_info');
    });

    st_info.delegate('.save', "click", function () {
        var form = $('#form_station_info');
        // сначала отправляем данные и ждем ответ что все хорошо
        // скрываем кнопки, для защиты от повторного нажатия
        $('.save, .cancel', st_info).fadeOut(0);
        $('.mess', st_info).html(_SAVEDATAS_).removeClass('alert-danger').fadeIn(500);
        $.ajax({
            url: "/ajax/save_station_info.php",
            type: "POST",
            dataType: "html",
            data: form.serialize(),
            success: function (response) {
                // !!!!!! написать обработчик!
                $('.mess', st_info).html(response);
                $('.cancel', st_info).click();
            },
            error: function (err) {
                $('.mess', st_info).html(_NOTCOMERRSERVER_).addClass('alert-danger').fadeIn(500);
                $('.cancel', st_info).click();
            }
        });
    });

    st_info.delegate('.cancel', "click", function () {
        var form = $('#form_station_info');
        $('.save, .cancel', st_info).fadeOut(0);
        $('.edit', st_info).fadeIn(300);
        $('.field', form).each(function () {
            if ($(this).val() == '') $(this).val('-');
        }).removeClass('ch');
        // нужно восстновить обновление этого таба
        noReloadTab.splice($.inArray('station_info', noReloadTab), 1);
        // обновляем этот таб (таблицу)
        var id = Tab['station_id'],
            url = ajax_url['station_info']['url'] + '?st_id=' + id,
            select = $('.PageStation .tab-content' + ajax_url['station_info']['select']);
        if (url) ajax(url, select);
    });
    
    
    var st_history = $("#station_history");

    st_history.delegate('.edit', "click", function () {
        var form = $('#form_station_history');
        $(this).fadeOut(0);
        $('.mess', st_history).fadeOut(0);
        $('.save, .cancel', st_history).fadeIn(300);
        $('.field', form).each(function () {
            if ($(this).val() == '-') $(this).val('');
        }).addClass('ch');
        // нужно остановить обновление этого таба
        if ($.inArray('station_info', noReloadTab) == -1) noReloadTab.push('station_info');
    });

    st_history.delegate('.save', "click", function () {
        var form = $('#form_station_history');
        // сначала отправляем данные и ждем ответ что все хорошо
        // скрываем кнопки, для защиты от повторного нажатия
        $('.save, .cancel', st_history).fadeOut(0);
        $('.mess', st_history).html(_SAVEDATAS_).removeClass('alert-danger').fadeIn(500);
        $.ajax({
            url: "/ajax/save_station_history.php",
            type: "POST",
            dataType: "html",
            data: form.serialize(),
            success: function (response) {
                // !!!!!! написать обработчик!
                $('.mess', st_history).html(response);
                $('.cancel', st_history).click();
            },
            error: function (err) {
                $('.mess', st_history).html(_NOTCOMERRSERVER_).addClass('alert-danger').fadeIn(500);
                $('.cancel', st_history).click();
            }
        });
    });

    st_history.delegate('.cancel', "click", function () {
        var form = $('#form_station_history');
        $('.save, .cancel', st_history).fadeOut(0);
        $('.edit', st_history).fadeIn(300);
        $('.field', form).each(function () {
            if ($(this).val() == '') $(this).val('-');
        }).removeClass('ch');
        // нужно восстновить обновление этого таба
        noReloadTab.splice($.inArray('station_info', noReloadTab), 1);
        // обновляем этот таб (таблицу)
        var id = Tab['station_id'],
            url = ajax_url['station_info']['url'] + '?st_id=' + id,
            select = $('.PageStation .tab-content' + ajax_url['station_info']['select']);
        if (url) ajax(url, select);
    });
});


// TREND

function checked_params_trend(){

    var bl = $('#station_trend'),
        bl2 = $('.station_trend_in', bl2);

    $('.control-block .checkbox [type="checkbox"]', bl).each(function (i, el) {
        var e = $(el);
        if(e.is(':checked')){
            $('input[value="'+e.val()+'"]', bl2).prop('checked', true);
        }
    });
    $('.control-block .checkbox-block-in', bl).empty();
    $('.control-block .checkbox-block-in', bl).append($('.checkbox-block .checkbox', bl2));
}

$(function () {
    var trend_Tab = $("#station_trend");
    moment.tz.setDefault(_TIMEZONE_);
    var Options = {
        global: {
            useUTC: true,
            timezone: _TIMEZONE_
        },
        colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        chart: {
            isMain: true,
            type: 'spline',
            high: 300,
            marginLeft: 50,
            backgroundColor: 'transparent',//'#fafafa',
            borderColor: '#ccc',
            borderWidth: 0,
            plotBackgroundColor: '#fff',
            shadow: false
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        labels: {
            style: {
                color: '#99b'
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        lang: {
            downloadJPEG: _DOWNLOADJPEG_,
            downloadPDF: _DOWNLOADPDF_,
            downloadPNG: _DOWNLOADPNG_,
            downloadSVG: _DOWNLOADSVG_,
            printChart: _PRINTCHART_,
            
        },
        scrollbar: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%e.%m',
                week: '',
                month: '%m',
                year: '%Y'
            },
            gridLineWidth: 1,
            crosshair: true,
            events: {
            //    setExtremes: syncExtremes
            }
        }
    };

    $('.trend-block').bind('mousemove touchmove touchstart', function (e) {
        var chart,
            point,
            i,
            event;

        for (i = 0; i < Highcharts.charts.length; i = i + 1) {
            chart = Highcharts.charts[i];
            if (chart !== undefined) {
                event = chart.pointer.normalize(e.originalEvent); // Find coordinates within the chart
                point = chart.series[0].searchPoint(event, true); // Get the hovered point
                if (point) {
                    point.highlight(e);
                }
            } // chart.series[0].compareValue    chart.series[0].userOptions.new_point
        }
    });
    /**
     * Override the reset function, we don't need to hide the tooltips and crosshairs.
     */
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };

    /**
     * Highlight a point by showing tooltip, setting hover state and draw crosshair
     */
    Highcharts.Point.prototype.highlight = function (event) {
        this.onMouseOver(); // Show the hover marker
        //this.series.chart.tooltip.refresh(this); // Show the tooltip
        this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
    };

    /**
     * Synchronize zooming through the setExtremes event handler.
     */
    function syncExtremes(e) {
        var thisChart = this.chart;

        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
            Highcharts.each(Highcharts.charts, function (chart) {
                if (chart !== thisChart) {
                    if (chart.xAxis[0].setExtremes) { // It is null while updating
                        chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                    }
                }
            });
        }
    }

    Highcharts.setOptions(Options);

    trend_Tab.delegate('.load-trend', "click", function () {

        $('.trend-block-up', trend_Tab).after($('.trend-block .trend', trend_Tab));

        var reg = '';

        $('input[name="reg-trend"]').each(function (i, el) {
            if ($(this).prop('checked') == true && $(this).val() !== 'all') {
                var r = $(this).val();
                reg += r + ',';
                $('#trend_' + r, trend_Tab).appendTo('.trend-block-up', trend_Tab).css('display', 'block');
                $('#trend_' + r + ' .highcharts-container', trend_Tab).css('opacity', '0.5');
                $('#trend_' + r + ' .load', trend_Tab).css('display', 'block').html(_LOAD_+'...');
            }
        });

        var d_from = DATE_FROM.data("DateTimePicker").date().format('YYYY-MM-DD'), // начало дня
            d_to = DATE_TO.data("DateTimePicker").date().format('YYYY-MM-DD'); // конец дня
            $.cookie('TREND_DATE', [d_from, d_to], { expires: 7, path: '/' });

        $.ajax({
            url: "/ajax/get_trend.php",
            type: "POST",
            dataType: "html",
            data: {
                st_id: Tab['station_id'],
                r: reg,
                d_from: d_from, // начало дня
                d_to: d_to // конец дня
            },
            success: function (response) {
                var detailChart = [];
                var is_json = true,
                    Res = [];
                try {
                    var Res = $.parseJSON(response);
                } catch (e) {
                    is_json = false;
                }
                
                //Доп обработка графиков
                if(is_json) {
                    $('.trend-block-up').removeClass('halfOpacity');
                    $('.chartFieldName').addClass('green');
                    var bl = $('.bl-value');
                    bl.find('tr:not(.time)').hide();
                    $('.trend-block-up').attr('st_id', Res['station'].id).find(".chartFieldName")
                    .text(Res['station'].name+' ('+Res['place'][Res['station'].place_id].name+')');
                    
                    if(Res['showTrends'] != 0) {
                        $('.trend').hide();
                        $.each(Res['showTrends'], function (i, value) {
                            $('#trend_'+value).show();
                            bl.find('.reg_'+value).show();
                        });
                    }
                }
                
                if (is_json && Res['res'] == 1) {
                    
                    $.each(Res['TRENDS'], function (i, value) {

                        var Data = value,
                            block = $('#trend_' + Data['reg'], trend_Tab);

                        //console.log(Data['Data']);

                        if (Data['Data'] != null) {
                            var d_f = moment(Data['Data'][0][0]).format('DD.MM.YYYY HH:mm:ss'),
                                end = Data['Data'][ Data['Data'].length - 1 ][0],
                                d_t = moment(end).format('DD.MM.YYYY HH:mm:ss');
                        } else {
                            var d_f = moment(Res['d_f']).format('DD.MM.YYYY HH:mm:ss'),
                                d_t = moment(Res['d_t']).format('DD.MM.YYYY HH:mm:ss');
                        }


                        $('#trend_' + Data['reg'] + ' .highcharts-container', trend_Tab).css('opacity', '1');

                        // Create the chart
                    //    $('h3', block).html(Data['title']);
                        $('.period', block).html(_PERIODDATA_+': ' + d_f + ' - ' + d_t);

                        if (Data['Data'] !== null) {

                            $('#trend_' + Data['reg'], trend_Tab).removeClass('err-data');

                            $('#trend_' + Data['reg'] + ' .load', trend_Tab).css('display', 'none');

                            

                            detailChart[Data['reg']] = $('#chart_' + Data['reg'], block).highcharts({
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
                                           $('.reset-trend', trend_Tab).fadeIn( "slow");
                                           var extremesObject = event.xAxis[0],
                                               min = extremesObject.min,
                                               max = extremesObject.max;

                                           $.each($('.trend:visible .chart', trend_Tab), function( key, value ) {
                                               
                                               var index = $("#"+$(this).attr('id')).attr('data-highcharts-chart');
                                               var chart = Highcharts.charts[index];
                                               var detailData = [];
                                               if(typeof chart == 'undefined')
                                                   return true;
                                               
                                               $.each(chart.series[0].data, function () {
                                                   if (this.x > min && this.x < max) {
                                                       detailData.push([this.x, this.y]);
                                                   }
                                               });
                                               detailChart[$(this).attr('id').replace(/[^0-9]+/g, "")].series[0].setData(detailData);
                                           });
                                           return false;
                                       }
                                   }
                               },
                                tooltip: {
                                    xDateFormat: '%H:%M %d/%m/%Y', // '%H:%M:%S %d/%m/%Y',

                                    formatter: function () { //console.log(this);
                                        NOW = this;
                                        var ser = this.points[0].series,
                                            new_point = ser.options.new_point[this.y];
                                        if (new_point == undefined) {
                                            new_point = this.y;
                                        }
                                        $('.trend-block .bl-value .time .value').html(moment(this.x).format('HH:mm DD.MM.YY'));
                                        $('.trend-block .bl-value .reg_' + ser.options.register + ' .value').html(new_point + ' ' + ser.tooltipOptions.valueSuffix);
                                        $('.trend-block .bl-value').css('display', 'block');
                                        return Highcharts.dateFormat('%H:%M %d/%m/%Y', this.x) + '<br/>' + ser.name + ': <b>' + new_point + '</b>' + ser.tooltipOptions.valueSuffix;
                                    },

                                    valueDecimals: Data['decimal'],
                                    valueSuffix: Data['suffix'],
                                    shared: true
                                },
                                resetZoomData: Data['Data'],
                                series: [
                                    {
                                        data: Data['Data'],
                                        name: _VALUE_,
                                        isMain: true,
                                        register: Data['reg'],
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

                        } else {
                            $('#trend_' + Data['reg'] + ' .load', trend_Tab).html(_NOTDATAFROMPARAM_);
                            $('#trend_' + Data['reg'], trend_Tab).addClass('err-data');
                        }
                    });
                } else {
                    $('.trend .load', trend_Tab).html(_NOTALLDATAFROMPARAM_);
                }
            },
            error: function (err) {
                $('.trend .load', trend_Tab).html(_COMERROR1_);
                $('#trend_' + Data['reg'], trend_Tab).addClass('err-data');
            }
        });
    });

    var date_opt = {
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
            nextMonth:  _NEXTMONTH_,
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
    
        DATE_FROM = $("#date_from", trend_Tab).datetimepicker(date_opt);
        DATE_TO = $("#date_to", trend_Tab).datetimepicker(date_opt);
    if(typeof $.cookie('TREND_DATE') == 'undefined'){

        DATE_TO.data("DateTimePicker").date(moment().endOf("day")); // период по -  конец текущего дня
        DATE_FROM.data("DateTimePicker").date(moment().subtract(2, 'days').startOf('day')); // период с -  начало дня -2 от текущего
    } else {
        let dates = $.cookie('TREND_DATE');
        dates = dates.split(',');

        DATE_FROM.data("DateTimePicker").date(moment(dates[0])); 
        DATE_TO.data("DateTimePicker").date(moment(dates[1]));
    }

    var reg_block = $('.reg-block');

    reg_block.delegate('.input-group-addon', "click", function () {
        $('.checkbox-block', reg_block).addClass('open');
        $(this).css('display', 'none');
        $('.close', reg_block).css('display', 'block');
    });

    reg_block.delegate('.close', "click", function () {
        $('.checkbox-block', reg_block).removeClass('open');
        $(this).css('display', 'none');
        $('.input-group-addon', reg_block).css('display', 'block');
    });

    reg_block.delegate('input[name="reg-trend"]', "click", function () {
        if ($(this).val() == 'all') {
            if ($(this).prop('checked') == true) {
                $('input[name="reg-trend"]').each(function (i, el) {
                    $(this).prop('checked', true);
                });
            } else {
                $('input[name="reg-trend"]').each(function (i, el) {
                    $(this).prop('checked', false);
                });
            }
        }
        var count = 0;

        $('input[name="reg-trend"]').each(function (i, el) {
            if ($(this).prop('checked') == true && $(this).val() !== 'all') {
                count++;
            }
        });

        $('.count b', reg_block).html(count);

        //console.log( $(this).prop('checked') );
    });

});

// DATA_STATION
$(function () {
    var station_data = $("#station_data");

    station_data.delegate('[name="reg"]', "change", function () {
        if ($(this).val() == 1) {
            $('[name="reg"]').addClass('other');
            $('[name="reg2"]').fadeIn(400);
        } else {
            $('[name="reg"]').removeClass('other');
            $('[name="reg2"]').fadeOut(0);
        }
    });
    
    station_data.delegate('.sendingToReport', "click", function () {
        alert(_INWORK_)
    });
    
    station_data.delegate('.addFH', "click", function () {
        $('.last-crashes-res', station_data).toggleClass('fh');
    });
    
    station_data.delegate('.open_crashes', "click", function () {
        
        var parentContainer = $(this).parents('.last-crashes');
        container = parentContainer.find('.last-crashes-res');
        var hiddenCounter = 0;
        var crashes = container.find('.crash');
        var limitFrom = crashes.length;
        
        $.ajax({
            url: "/ajax/station_crash.php",
            type: "POST",
            data: {from:limitFrom, st_id: $(this).attr('data-id')},
            dataType:"html",
            success: function (d) {

                if(d.length) {
                    container.append(d);
                    container.removeClass('notcrashes');
                    if(d.length > 700) {
                        parentContainer.find('.addFH').css({visibility:'visible'}).animate({
                          opacity: 1
                        },400);
                    }
                } else {
                    alert(_EMPTY_CRASH_);
                }
                
            },
            error: function (err) {
                $('.mess', form).html('<b>'+_NOTCOMERRSERVER_+'</b>').addClass('alert-danger').fadeIn(500);
            },
            complete: function () {

            }
        });

        
        
    });

    station_data.delegate('.save', "click", function () {

        var form = $('#fcd');

        //console.log(aReg);
        $('.mess', form).html("<b>"+_SAVE1_+"...</b>");

        // отправляем запрос на запись команды
        $.ajax({
            url: "/ajax/save_station_command.php",
            type: "POST",
            dataType: "html",
            data: form.serialize(),
            success: function (d) {
                var res = $.parseJSON(d);
                $('.mess', form).html(res.mess);
                if (res.res == 1) {
                    $('.last-command-res', form).html(res.lastCommand);
                }
            },
            error: function (err) {
                $('.mess', form).html('<b>'+_NOTCOMERRSERVER_+'</b>').addClass('alert-danger').fadeIn(500);
            },
            complete: function () {

            }
        });
    });
});


// COMMAND
$(function () {
    var command_tab = $("#command_tab");

    command_tab.on('change', 'input[type="checkbox"]', function () {

            var id = $(this).attr('id'),
                val = $(this).is(':checked');

            //console.log(id + ' ' + val);

            if (id == 'reg_1969') {
                if (val) {
                    remove_dis($('#reg_1971'));
                    remove_dis($('#reg_1903'));
                    if ($('#reg_1903').is(':checked')) {
                        remove_dis($('#reg_1972'));
                    }
                } else {
                    get_dis($('.control-line:not(.line-1969) input', command_tab));
                }
            }

            if (id == 'reg_1903') {
                if (val) {
                    remove_dis($('.control-line-range input', command_tab));
                } else {
                    get_dis($('.control-line-range input', command_tab));
                }
            }

        }
    );

    function get_dis(a) {
        a.attr('disabled', true).closest('.control-line').addClass('dis');
    }

    function remove_dis(a) {
        a.attr('disabled', true).removeAttr('disabled').closest('.control-line').removeClass('dis');
    }

    command_tab.delegate('.save', "click", function () {

        if ($(this).hasClass('dis')) {
            return false;
        }

        var form = $('#form-control'),
            aReg = {};

        // ПРОВЕРКИ сделать

        $(this).addClass('dis');
        //$('.mess', st_info).html('Сохраняю данные...').removeClass('alert-danger').fadeIn(500);
        if ($('#reg_1969').is(':checked')) {
            aReg[0] = [1969, 1];

            if ($('#reg_1971').is(':checked')) {
                aReg[1] = [1971, 2];
            } else {
                aReg[1] = [1971, 0];
            }
            /*
            if ($('#reg_1903').is(':checked')) {
                aReg[2] = [1903, 0];

                var speed = $('#reg_1972').val(),
                    speed = 1000 * (speed - Tab['station_params']['min']) / (Tab['station_params']['max'] - Tab['station_params']['min']);
                aReg[3] = [1972, speed.toFixed()];

            } else {
                aReg[2] = [1903, 1];
            }
            */
        } else {
            aReg[0] = [1969, 0];
        }

        //console.log(aReg);
        $('.mess', command_tab).html("<b>"+_TRYRECPARAM_+"</b>");

        // отправляем запрос на запись регистров
        $.ajax({
            url: "/ajax/setReg.php",
            type: "POST",
            dataType: "html",
            data: {'aReg': JSON.stringify(aReg), 'st_id': Tab['station_id'], '1972_user': $('#reg_1972').val()},
            success: function (response) {
                $('.mess', command_tab).html(response);
            },
            error: function (err) {
                $('.mess', command_tab).html('<b>'+_NOTCOMERRSERVER_+'</b>').addClass('alert-danger').fadeIn(500);
            },
            complete: function () {
                $('.save', form).removeClass('dis');
            }
        });

    });
});

function range(params) {
    Range = document.querySelector('.range');
    Speed = document.getElementById('reg_1972');
    Tab['station_params'] = {
        'min': (typeof params == 'undefined') ? 'false' : params['min'],
        'max': (typeof params == 'undefined') ? 'false' : params['max'],
    };
    //console.log(elem);
    if (Range) {
        var elem = new Powerange(Range, {
            callback: changeRange,
            min: params['min'],
            max: params['max'],
            start: params['start'],
            decimal: true
            //step: 0.1
        });
        Speed.value = params['start'];

        // устраняем глюк
        if (!(Tab['page'] == 'PageStation' && Tab['station_tab'] == '#command_tab')) {
            var w = Math.round(( $('.control .control-range').width() - $('.control .range-handle').width() ) * ( params['start'] - params['min'] ) / ( params['max'] - params['min'] ));
            //console.log(w);
            $('.control .range-handle').css('left', w + 'px');
            $('.control .range-quantity').css('width', w + 'px');
        }
    }
}

function changeRange() {
    Speed.value = Range.value;
}

function res_modal_h() {
    var chat = $('#modalChat'),
        display = chat.css('display'); // запомним старое значение

    chat.css('display', 'block'); // outerHeight не считается пока блок none
    var wh = $(window).height(),
        mh = $('.modal-dialog', chat).outerHeight(true) - $('.modal-dialog', chat).outerHeight(), //outerHeight(true),
        hh = $('.modal-header', chat).outerHeight(),
        fh = $('.modal-footer', chat).outerHeight(),
        mb = $('.modal-body', chat).outerHeight(),
        res = wh - mh - hh - fh - 2;
    chat.css('display', display); // вернем старое значение
    if (res < 100) {
        res = 100;
    }
    $('.modal-body', chat).css('max-height', res + 'px');
}


$(function () {
    function myresize() {
        // зададим высоту модальному окну!
        res_modal_h();

    }

    $(window).resize(function () {
        myresize();
    });
    $(document).ready(function () {
        myresize();
    });

    window.onload = function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() < 60) {
                $('.sidebar').css({top: 61 - $(window).scrollTop() + 'px'});
            } else {
                $('.sidebar').css({top: '1px'});
            }
        });
    }
});

function print_page() {
    $('html').addClass('print');
    window.print();
    $('html').removeClass('print');
}
// MODAL
$(function () {
    var modal = $('#Modal');
    $('.modal-help').click(function () {
        $('.modal-title', modal).text(_HELP_);
        
        $.ajax({
            url: "/ajax/get_help.php",
            dataType: "html",
            success: function (response) {
                $('.modal-body', modal).html(response);
            },
            error: function (err) {
                $('.modal-body', modal).html('<b>'+_NOTCOMERRSERVER_+'</b>').addClass('alert-danger').fadeIn(500);
            }
        });        
    });
    
    $('.modal-user').click(function () {
        $('.modal-title', modal).text(_ACCOUNT_);
        $('.modal-body', modal).html(_INWORK_);
    });
    $('.modal-task').click(function () {
        $('.modal-title', modal).text(_TASKS_);
        $.ajax({
            url: "/ajax/task.php",
            dataType: "html",
            success: function (response) {
                $('.modal-body', modal).html(response);
            },
            error: function (err) {
                $('.modal-body', modal).html('<b>'+_NOTCOMERRSERVER_+'</b>').addClass('alert-danger').fadeIn(500);
            }
        });
    });
    modal.delegate('.save-task', "click", function () {
        $.ajax({
            url: "/ajax/task-save.php",
            dataType: "html",
            data: $('form').serialize(),
            success: function (response) {
                $('.task-table', modal).html(response);
            },
            error: function (err) {
                $('.modal-body', modal).html('<b>'+_NOTCOMERRSERVER_+'</b>').addClass('alert-danger').fadeIn(500);
            }
        });
        return false;
    });
});

// st_sel
$(function () {
    st_sel = $('.st-sel');
    st_sel.delegate(".plc .glyphicon", "click", function () {
        $(this).parent().toggleClass('open');
    });
    st_sel.delegate(".plc label", "click", function () {
        var el = $(this),
            ch = $('input', el).prop('checked') == true;
        if (ch == true) {
            el.addClass('check');
        } else {
            el.removeClass('check');
        }
        if (el.parent().hasClass('div-plc')) {
            if (ch == true) {
                $('.st input[type="checkbox"]', el.parent().parent()).prop('checked', true).parent('label').addClass('check');
            } else {
                $('.st input[type="checkbox"]', el.parent().parent()).prop('checked', false).parent('label').removeClass('check');
            }
        }
        //console.log($('.st input[type="checkbox"]', el.parent().parent()));
    });
});

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

$(document).on('click', "#leftSideBarToggle", function(){
    var slide = $(this);
    var span = slide.find('span');
    var sideBar = slide.parent();
    var sideBarWidth = sideBar.width();
    var main = $('.main');
    if(span.is('.glyphicon-chevron-left')) {
        span.removeClass('glyphicon-chevron-left').addClass('glyphicon-chevron-right');
        sideBar.animate({
	      left: - sideBarWidth + 5, // ширина элемента
	    });
        main.animate({
	      marginLeft: 5, // ширина элемента
	    });    
            
        $("#tree").animate({
            width: 180
            });
    } else {
         $("#tree").width("100%")
        span.removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-left');
        sideBar.animate({
          left: 0, // ширина элемента
        });
        main.animate({
          marginLeft: 215, // ширина элемента
        }); 
        $("#tree").animate({
            width: "100%"
        });
    }
    
})

function afterAjaxSets(){
    var statContent = $(".place_svod_table");

    var th = $('#svod').find('th').eq(statContent.attr('sort_type'));
    var countClicks = Number(statContent.attr('sort_click'));

    for(var i=1; i<=countClicks; i++){
        th.trigger('click');
    }
}

function loadTreeStatus(){
    $.ajax({
        url: "/ajax/get_tree.php",
        dataType: "json",
        success: function (response) {
            updateTreeStatus(response);
        },
    });
}

function updateTreeStatus(json){

    for (var i in json) {
        node = tree.getNodeByKey(json[i].key);
        var $span = $(node.span);
        var titleSpan = $span.find("> span.fancytree-title");
        var iconSpan = $span.find("> span.fancytree-icon");
        
        if(json[i].folder == true){
            updateTreeStatus(json[i].children);
            var statuses = json[i].status;
            if(statuses){
               
                if($.inArray(1, statuses) >= 0){
                    titleSpan.find('.green').removeClass('hidden');
                }else {
                    titleSpan.find('.green').addClass('hidden');
                }
                
                if($.inArray(2, statuses) >= 0){
                    titleSpan.find('.yellow').removeClass('hidden');
                }else {
                    titleSpan.find('.yellow').addClass('hidden');
                }
                if($.inArray(0, statuses) >= 0){
                    titleSpan.find('.grey').removeClass('hidden');
                }else {
                    titleSpan.find('.grey').addClass('hidden');
                }
                if($.inArray(-1, statuses) >= 0){
                    titleSpan.find('.red').removeClass('hidden');
                } else {
                    titleSpan.find('.red').addClass('hidden');
                }
                if($.inArray(-2, statuses) >= 0){
                    titleSpan.find('.crash').removeClass('hidden');
                } else {
                    titleSpan.find('.crash').addClass('hidden');
                }

            } else {
                titleSpan.find('.folder_status').addClass('hidden')
            }
        } else {
            if(json[i].status == 1) {
                iconSpan.css({
                    background: "#019810",
                    animation: "",
                });
            } else if(json[i].status == 0) {
                iconSpan.css({
                    background: "#aaa",
                    animation: "",
                });
            } else if(json[i].status == -1) {
                iconSpan.css({
                    background: "red",
                    animation: "",
                });
            } else if(json[i].status == 2) {
                iconSpan.css({
                    background: "#F1C900",
                    animation: "",
                });
            } else if(json[i].status == -2) {
                iconSpan.css({
                    background: "#F1C900",
                    animation: "glowing 2s infinite ease-in-out",
                });
            }
        }
    }
}

function generate_svod_params_tree(){
    
    let activePlace = tree.getActiveNode();
    $("#svod_params_tree").fancytree({
        autoCollapse: false,
        autoExpand: true,
        leavesOnly: true,
        checkbox: true,
        selectMode: 3,
        source: {url: "/ajax/get_report_tree.php"},
        init: function (event, data) { //create
            data.tree.getRootNode().visit(function (node) {
                if(activePlace.key == node.key)
                    node.setSelected(true);
            });
        },
    });
}

//Функция открывает вкладку осциллограмм при клике на дисбаланс в place_svod_table
$(document).on('click', '#imbalance', function(){
    open_station($(this).attr('st-id'));
    $('a[href="#station_osc').trigger('click');
})
