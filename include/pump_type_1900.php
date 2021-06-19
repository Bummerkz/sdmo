<?php
$pump_type_1900 = [
    1 => Dictionary::t('INCLUDES', 'PUMP_TYPE_1'), //'ШГН',
    2 => Dictionary::t('INCLUDES', 'PUMP_TYPE_2'), //'ШГН Rotaflex',
    3 => Dictionary::t('INCLUDES', 'PUMP_TYPE_3'), //'ЭЦН',
    4 => Dictionary::t('INCLUDES', 'PUMP_TYPE_4'), //'ЭЦН с обр. связью',
    5 => Dictionary::t('INCLUDES', 'PUMP_TYPE_5'), //'Не используется',
    6 => Dictionary::t('INCLUDES', 'PUMP_TYPE_6'), //'ЭВН',
    7 => Dictionary::t('INCLUDES', 'PUMP_TYPE_7'), //'ЭВН с обр. связью',
    8 => Dictionary::t('INCLUDES', 'PUMP_TYPE_8'), //'ЭВН / ПИД-регулирование крут. момента',
]
/*
 * Если ТИП НАСОСА был изменен, пистание СТАНЦИИ должно быть отключено и подано повторно
 * Перед тем, как повторно покадть питание, убедитесь, что дисплей панели управления СТАНЦИИ выключен
 */
?>