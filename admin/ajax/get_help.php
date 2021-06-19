<?php

include("../../init/db_connect.php");
include("../../init/func.php");
$fc_reg = get_all_fc_reg();
?>

<ul class="nav navbar-nav help-page" style="width: 100%;min-height: 60vh">
    <li style="width: 100%"><a href="#" data-help="regs"><?= Dictionary::t('WORD', 'REGISTERS')?></a>
        <div style="display: none">
            <table class="table-them table table-bordered table-hover table-center" >
                <thead>
                    <th><?= Dictionary::t('WORD', 'PUMP_TYPE')?></th>
                    <th><?= Dictionary::t('WORD', 'REG_NUMBER')?></th>
                    <th><?= Dictionary::t('WORD', 'TITLE')?></th>
                    <th><?= Dictionary::t('WORD', 'UNITS')?></th>
                    <th><?= Dictionary::t('WORD', 'DESCRIPTION')?></th>
                </thead>
                <tbody>
                <?php 
                    foreach ($fc_reg as $row){
                        
                        $pump_string = '';
                        $row['info'] = '';
                        $row['units'] = '';
                        $row['name'] = Dictionary::t('FC_REG', $pump_type."_".$row['addr']);
                        $pumps_type = explode(',', $row['type_1900']);
                        
                        foreach($pumps_type as $pump_type) {
                            $str = Dictionary::t('INCLUDES', 'PUMP_TYPE_'.$pump_type)."<br />";
                            $pump_string .= $str;
                            $row['info'].= $str.Dictionary::t('FC_REG_DESC', $pump_type."_".$row['addr'])."<br />";
                            if((Dictionary::t('FC_REG_UNITS', $pump_type."_".$row['addr']) != $row['units']) && $row['units'])
                                $row['units'].= "<br />"."<br />".Dictionary::t('FC_REG_UNITS', $pump_type."_".$row['addr']);
                            elseif(!$row['units'])
                                $row['units'].= Dictionary::t('FC_REG_UNITS', $pump_type."_".$row['addr']);

                        }
                ?>
                    <tr>
                        <td><?= $pump_string?></td>
                        <td><?= $row['addr']?></td>
                        <td><?= $row['name']?></td>
                        <td><?= $row['units']?></td>
                        <td><?= $row['info']?></td>
                    </tr>
                <?php
                    }
                ?>
                </tbody>
            </table>
            <div style="clear:both"></div>
        </div>
    </li>
    
</ul>
<div style="clear:both"></div>

<script>

    $('.help-page > li').on('click', 'a', function(){
        var li = $(this).parent('li');
        li.find('div').first().fadeToggle();
    })
</script>