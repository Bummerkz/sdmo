<?php
include_once 'station_status.php';
$serv_filter = '';
if (IS_SERVER) {
    $aServ = get_server();
    if ($aServ) {
        foreach ($aServ as $s) {
            $serv_filter .= '<label><input type="checkbox" name="server" value="' . $s['id'] . '">' . $s['name'] . ' ' . $s['IP'] . '</label></br>';
        }
    }
}
if ($serv_filter) {
    $serv_filter = '<div class="form-group"><p>'.Dictionary::t('INCLUDES', "SERVER").'</p>' . $serv_filter . '</div>';
}
?>
<div class="control-block">
    <form class="form-inline" role="form">
        <button type="button" class="btn btn-primary open-filter"><span class="glyphicon glyphicon-filter"></span>
            <?= Dictionary::t('INCLUDES', "FILTER") ?>
        </button>
        <button type="button" class="btn btn-warning remove-filter"><span class="glyphicon glyphicon-remove"></span>
            <?= Dictionary::t('INCLUDES', "CLEAR") ?>
        </button>
        <button type="button" class="btn btn-info type_svod_conclusion <?= (($_COOKIE['svod_type'] == 'list' || !$_COOKIE['svod_type']) ? 'type-list' : 'type-block') ?>"><span class="glyphicon glyphicon-th-large"></span>
            <?= (($_COOKIE['svod_type'] == 'list' || !$_COOKIE['svod_type'] ) ? Dictionary::t('SVOD_DATA', "TYPE_BLOCK") : Dictionary::t('SVOD_DATA', "TYPE_LIST") )  ?>
        </button>
    </form>
</div>

<!-- Table -->
<div class="place_svod_table"></div>

<!-- Modal Chat-->
<div class="modal fade " id="modalChat" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel"><?= Dictionary::t('INCLUDES', "NODES") ?></h4>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <input id="inp_st_id" type="hidden" value="">
                <textarea class="form-control" rows="3"></textarea>
                <button type="button" class="btn btn-default btn-xs arhiv"><span
                        class="glyphicon glyphicon-eye-open"></span> <?= Dictionary::t('INCLUDES', "ARCHIVE") ?>
                </button>
                <button type="button" class="btn btn-primary save"><?= Dictionary::t('INCLUDES', "ADD") ?></button>
                <button type="button" class="btn btn-default" data-dismiss="modal"><?= Dictionary::t('INCLUDES', "CLOSE") ?></button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Filter-->
<div class="modal fade " id="modalFilter" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel"><?= Dictionary::t('INCLUDES', "INSTALL_FILTER") ?></h4>
            </div>
            <div class="modal-body">
                <form role="form">
                    <div class="form-group">
                        <p><?= Dictionary::t('INCLUDES', "COMMUNICATION") ?></p>
                        <table>
                            <tr>
                                <td><label class="green"><input type="checkbox" name="sviaz" value="yes"><?= Dictionary::t('INCLUDES', "IS") ?></label>
                                </td>
                                <td><label class="red"><input type="checkbox" name="sviaz" value="no"><?= Dictionary::t('INCLUDES', "NOT_IS") ?></label></td>
                            </tr>
                            <tr>
                                <td><label><input type="checkbox" name="sviaz" value="no_data"><?= Dictionary::t('INCLUDES', "IS_NOT_DATA") ?></label></td>
                                <td><label><input type="checkbox" name="sviaz" value="antena_no_ip"><?= Dictionary::t('INCLUDES', "ANTENA_NO_IP") ?></label></td>
                            </tr>
                            <tr>
                                <td><label class="green"><input type="checkbox" name="sviaz"
                                                                value="antena_svyaz_ok"><?= Dictionary::t('INCLUDES', "ANTENA_SVYAZ_OK") ?></label>
                                </td>
                                <td><label class="red"><input type="checkbox" name="sviaz"
                                                              value="antena_svyaz_error"><?= Dictionary::t('INCLUDES', "ANTENA_SVYAZ_ERROR") ?></label>
                                </td>
                            </tr>
                            <tr>
                                <td><label class="green"><input type="checkbox" name="sviaz"
                                                                value="router_svyaz_ok"><?= Dictionary::t('INCLUDES', "ROUTER_SVYAZ_OK") ?></label>
                                </td>
                                <td><label class="red"><input type="checkbox" name="sviaz"
                                                              value="router_svyaz_error"><?= Dictionary::t('INCLUDES', "ROUTER_SVYAZ_ERROR") ?></label>
                                </td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td><label><input type="checkbox" name="sviaz" value="antena_svyaz_ok_router_svyaz_error"><?= Dictionary::t('INCLUDES', "ANTENA_SVYAZ_OK_ROUTER_SVYAZ_ERROR") ?></label></td>
                            </tr>
                        </table>
                    </div>

                    <div class="form-group">
                        <p><?= Dictionary::t('INCLUDES', "TYPE_INSTALLATION") ?></p>
                        <label><input type="checkbox" name="type" value="1"><?= Dictionary::t('INCLUDES', "PUMP_TYPE_1") ?></label>
                        <label><input type="checkbox" name="type" value="6"><?= Dictionary::t('INCLUDES', "PUMP_TYPE_6") ?></label>
                    </div>

                    <div class="form-group">
                        <p><?= Dictionary::t('INCLUDES', "STATUS") ?></p>
                        <table>
                            <tr>
                                <td><label class="green"><input type="checkbox" name="status" value="1"><?= Dictionary::t('INCLUDES', "STATUS_1999_1") ?></label></td>
                                <td><label class="red"><input type="checkbox" name="status" value="-1"><?= Dictionary::t('INCLUDES', "STATUS_1999_-1") ?></label></td>
                            </tr>
                            <tr>
                                <td><label class="green"><input type="checkbox" name="status"
                                                                value="2"><?= Dictionary::t('INCLUDES', "STATUS_1999_2") ?></label></td>
                                <td><label class="red"><input type="checkbox" name="status" value="0"><?= Dictionary::t('INCLUDES', "STATUS_1999_0") ?></label>
                                </td>
                            </tr>
                            <tr>
                                <td><label class="green"><input type="checkbox" name="status" value="4"><?= Dictionary::t('INCLUDES', "STATUS_1999_4") ?></label></td>
                                <td><label class="red"><input type="checkbox" name="status"
                                                              value="512"><?= Dictionary::t('INCLUDES', "STATUS_1999_512") ?></label></td>
                            </tr>
                            <tr>
                                <td><label class="green"><input type="checkbox" name="status" value="16384"><?= Dictionary::t('INCLUDES', "STATUS_1999_16384") ?></label>
                                </td>
                                <td><label class="red"><input type="checkbox" name="status" value="4096"><?= Dictionary::t('INCLUDES', "STATUS_1999_4096") ?></label></td>
                            </tr>
                            <tr>
                                <td><label class="green"><input type="checkbox" name="status" value="1048576"><?= Dictionary::t('INCLUDES', "STATUS_1999_1048576") ?></label></td>
                                <td><label class="red"><input type="checkbox" name="status" value="8192"><?= Dictionary::t('INCLUDES', "STATUS_1999_8192") ?></label></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><label class="red"><input type="checkbox" name="status" value="32"><?= Dictionary::t('INCLUDES', "STATUS_1999_32") ?></label></td>
                            </tr>
                        </table>
                    </div>
                    <div class="form-group">
                        <p><?= Dictionary::t('INCLUDES', "WELL_EXECUTE_STATUS") ?></p>
                        <table>
                            
                            <?php foreach ($station_status as $key => $value) { ?>
                                    <tr>
                                        <td><label class="green"><input type="checkbox" name="exe_status" value="<?= $key ?>"><?= $value?></label></td>
                                    </tr>
                            <?php } ?>
                            
                        </table>
                    </div>
                    <div class="form-group">
                        <p><?= Dictionary::t('INCLUDES', "WARNING") ?></p>
                        <label><input type="checkbox" name="attention" value="min"><?= Dictionary::t('MAIN', "SVOD_ATTENTION_MIN") ?></label></br>
                        <label><input type="checkbox" name="attention" value="max"><?= Dictionary::t('MAIN', "SVOD_ATTENTION_MAX") ?></label></br>
                        <label class="red"><input type="checkbox" name="attention" value="temp"><?= Dictionary::t('INCLUDES', "BAD_TEMPERATURE") ?> < 10ºС</label></br>
                        <label class="red"><input type="checkbox" name="attention" value="imbalance"><?= Dictionary::t('AJAX_PLACE_SVOD_TABLE', 'IMBALANCE') ?> < 70%</label></br>

                    </div>

                    <?=$serv_filter?>
                    </br>
                    <span class="gray"><?= Dictionary::t('INCLUDES', "HELP_MESSAGE") ?></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary save" data-dismiss="modal"><?= Dictionary::t('INCLUDES', "SAVE") ?></button>
                <button type="button" class="btn btn-default" data-dismiss="modal"><?= Dictionary::t('INCLUDES', "CLOSE") ?></button>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function () {
        var svod = $("#svod_data"),
            modal = $('#modalFilter');

        function remove_filter_display() {
            $('.remove-filter', svod).css('display', 'inline-block');
        }

        <?php if(strlen($_COOKIE['FILTER']) > 2):?>
        remove_filter_display();
        <?php endif;?>

        svod.delegate(".open-filter", "click", function () {
            modal.modal('show');
        });
        svod.delegate(".type-list", "click", function () {
             $(this).removeClass('type-list').addClass('type-block').html('<span class="glyphicon glyphicon-th-large"></span> <?=  Dictionary::t('SVOD_DATA', "TYPE_LIST")?>');
             $.cookie('svod_type', 'block', { expires: 3, path: '/' });
             reload_data(ReloadPlaceTabs);
        });
        svod.delegate(".type-block", "click", function () {
            $(this).removeClass('type-block').addClass('type-list').html('<span class="glyphicon glyphicon glyphicon-th-list"></span> <?=  Dictionary::t('SVOD_DATA', "TYPE_BLOCK")?>');
             $.cookie('svod_type', 'list', { expires: 3, path: '/' });
             reload_data(ReloadPlaceTabs);
        });
        modal.delegate(".save", "click", function () {
            // запишем в куки фильтр
            var form = $('form', modal).serialize();
            //console.log(form);
            if (form == '') {
                document.cookie = "FILTER=''; expires=-1; path=/";
                $('.remove-filter', svod).css('display', 'none');
            } else {
                var d = new Date();
                d.setDate(d.getTime() + 3600 * 24 * 350);
                document.cookie = "FILTER=" + form + "; expires=" + d.toGMTString() + "; path=/";
                remove_filter_display();
            }
            reload_data();
        });

        svod.delegate(".remove-filter", "click", function () {
            $('form input', modal).attr("checked", false);
            $('.save', modal).click();
        });

        svod.on({
            mouseover:function(){
                var rel = $(this).attr('rel'),
                    div = $('<div class="desc">' + status_1999_desc[rel] + '</div>');
                $(this).parent().append(div);
            }
        }, '.status span');

    });
    // описание статусов
    status_1999_desc = {
        "-1": _STATUS1999DESC__1_,
        "0": _STATUS1999DESC0_,
        "1": _STATUS1999DESC1_,
        "2": _STATUS1999DESC2_,
        "4": _STATUS1999DESC4_,
        "8": _STATUS1999DESC8_,
        "32": _STATUS1999DESC32_,
        "64": _STATUS1999DESC64_,
        "256": _STATUS1999DESC256_,
        "512": _STATUS1999DESC512_,
        "1024": _STATUS1999DESC1024_,
        "4096": _STATUS1999DESC4096_, // СТАНДАРТНАЯ ОШИБКА ПРИВОДА
        "8192": _STATUS1999DESC8192_, // DRIVE TRIP LOG
        "16384": _STATUS1999DESC16384_,
        "2768": _STATUS1999DESC2768_,
        "65536": _STATUS1999DESC65536_,
        "262144": _STATUS1999DESC262144_,
        "1048576": _STATUS1999DESC1048576_
    };
</script>
