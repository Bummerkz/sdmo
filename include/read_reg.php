<?php
$tree = get_stations_select();
echo $tree;
?>

    <div class="rr-bl">

    </div>

    <p>
        <button class="btn btn-link add-reg" type="button"><?= Dictionary::t('INCLUDES', 'ADD_REG')?></button>
    </p>

    <p class="btn-menu">
        <button class="btn btn-primary go-read_reg" type="button"><?= Dictionary::t('INCLUDES', 'START_READ')?></button>
        <button class="btn btn-warning abort-read-reg" type="button"><?= Dictionary::t('INCLUDES', 'UNDO_CURRENT')?></button>
        <button class="btn btn-danger stop-read-reg" type="button"><?= Dictionary::t('INCLUDES', 'UNDO_ALL')?></button>
    </p>

    <div class="read_reg_res"></div>

    <script>
        var read_reg = $('#read_reg');

        // при запуске выделим все станции
        //$('.plc input[type="checkbox"]', read_reg).prop('checked', true).parent('label').addClass('check');

        read_reg.delegate(".add-reg", "click", function () {
            var div = '<p class="form-inline"><label>'+_REGISTER_+' <input type="text" class="form-control input-sm" placeholder="'+_EXAMPLE_+': 1622"></label> <select class="form-control input-sm"><option>Uint32</option><option>Uint16</option><option>Int32</option><option>Int16</option></select> <span class="glyphicon glyphicon-remove del"></span></p>';
            $('.rr-bl', read_reg).append(div);
        });

        read_reg.delegate(".rr-bl .del", "click", function () {
            $(this).parent().remove();
        });

        function get_reg_ajax(i, st, reg) {

            //console.log(i);
            var name = $(st[i]).parent().text(),
                id = $(st[i]).prop('value'),
                div = $(document.createElement('div')),
                span = '<span>'+_WAIT_+'... <button class="btn btn-warning btn-xs abort-read-reg" type="button">'+_UNDOCURRENT_+'</button> <button class="btn btn-danger btn-xs stop-read-reg" type="button">'+_UNDOALL_+'</button></span>';

            div.html('<p><b>' + name + '</b> '+span+'</p>');
            $('.read_reg_res', read_reg).append(div);

            Get_Reg_Ajax = $.ajax({
                url: "/ajax/get_Reg.php",
                type: "POST",
                dataType: "html",
                data: {'aReg': JSON.stringify(reg), 'st_id': id},
                success: function (date) {
                    div.append('<div class="res">' + date + '</div>');
                },
                error: function (err) {
                    //console.log(err);
                    if(err.statusText == "abort"){
                        div.append('<div class="res"><p class="red">'+_READUNDOUSER_+'</p></div>');
                    } else {
                        div.append('<div class="res"><p class="red">'+_NOTCOMERRSERVER_+'</p></div>');
                    }
                },
                complete: function () {
                    $('p span', div).remove();
                    if (st[i + 1] == undefined || STOP_Reg_Ajax == true) { // конец
                        $('.go-read_reg', read_reg).removeClass('disabled');
                        $('.abort-read-reg, .stop-read-reg', read_reg).css('display', 'none');
                    } else {
                        get_reg_ajax(i + 1, st, reg);
                    }
                }
            });
        }

        read_reg.delegate(".go-read_reg", "click", function () {

            if ($(this).hasClass('disabled')) {
                return false;
            }

            var st = $('.plc .st input[type="checkbox"]:checked', read_reg),
                read_reg_res = $('.read_reg_res', read_reg),
                reg = {};

            $('.rr-bl .form-inline', read_reg).each(function (i, el) {
                var r = $('input', $(this)).val();
                if (r > 0) {
                    reg[i] = [r, $('select', $(this)).val()];
                }
            });

            if ($.isEmptyObject(reg)) {
                read_reg_res.html('<p class="red">'+_NOTREGISTERFORREAD_+'</p>');
                return false;
            }
            if (st.length == 0) {
                read_reg_res.html('<p class="red">'+_CHECKWELLSELECTED_+'</p>');
                return false;
            }
            read_reg_res.html('');
            $(this).addClass('disabled');
            $('.abort-read-reg, .stop-read-reg', read_reg).css('display', 'inline-block');

            STOP_Reg_Ajax = false;
            get_reg_ajax(0, st, reg);
        });

        read_reg.delegate(".abort-read-reg", "click", function () {
            Get_Reg_Ajax.abort();
        });

        read_reg.delegate(".stop-read-reg", "click", function () {
            STOP_Reg_Ajax = true;
            Get_Reg_Ajax.abort();
        });

    </script>

<?php
//echo '<pre>' . htmlspecialchars(print_r($arr, 1)) . '</pre>';
?>