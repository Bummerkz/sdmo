<?php
$station_status = [
    "1" => Dictionary::t('INCLUDES', 'STATION_STATUS_1'), //Эксплуатирующая скважина
    "2" => Dictionary::t('INCLUDES', 'STATION_STATUS_2'), //Фонтанная скважина
    "3" => Dictionary::t('INCLUDES', 'STATION_STATUS_3'), //Нагнетательная скважина
    "4" => Dictionary::t('INCLUDES', 'STATION_STATUS_4')  //Консервированная скважина
];

// ALTER TABLE `stations` ADD `status` INT(11) NOT NULL DEFAULT '1' AFTER `router_soft_ver`, ADD INDEX `st_status` (`status`);
