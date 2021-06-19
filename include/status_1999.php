<?php

$status_1999 = [
    "-1" => Dictionary::t('INCLUDES', "STATUS_1999_-1"), //НЕ НАСТРОЕН
    "0" => Dictionary::t('INCLUDES', "STATUS_1999_0"), // ОСТАНОВЛЕН
    "1" => Dictionary::t('INCLUDES', "STATUS_1999_1"), // РЕЖИМ АВТО
    "2" => Dictionary::t('INCLUDES', "STATUS_1999_2"), // НАКОПЛЕНИЕ
    "4" => Dictionary::t('INCLUDES', "STATUS_1999_4"),   // РУЧНОЙ РЕЖИМ
    "8" => Dictionary::t('INCLUDES', "STATUS_1999_8"),  // ВОССТАНОВЛЕНИЕ
    "32" => Dictionary::t('INCLUDES', "STATUS_1999_32"),  // ПАРАФИНИЗАЦИЯ
    "64" => Dictionary::t('INCLUDES', "STATUS_1999_64"),  // BUS TIME
    "256" => Dictionary::t('INCLUDES', "STATUS_1999_256"),  // ПОТЕРЯ ДАТЧИКА
    "512" => Dictionary::t('INCLUDES', "STATUS_1999_512"),  // ЗАКЛИНИВАНИЕ
    "1024" => Dictionary::t('INCLUDES', "STATUS_1999_1024"),  // СРЫВ ПОДАЧИ
    "4096" => Dictionary::t('INCLUDES', "STATUS_1999_4096"),  //ОШИБКА ПРИВОДА БЕЗ БЛОКИРОВКИ СТАНДАРТНАЯ ОШИБКА ПРИВОДА
    "8192" => Dictionary::t('INCLUDES', "STATUS_1999_8192"), //ОШИБКА ПРИВОДА С БЛОКИРОВКОЙ DRIVE TRIP LOG
    "16384" => Dictionary::t('INCLUDES', "STATUS_1999_16384"),  // АВТОПЕРЕЗАПУСК
    "32768" => Dictionary::t('INCLUDES', "STATUS_1999_32768"),  // ВХОД 1 ВЫСОКОЕ ДАВЛЕНИЕ
    "65536" => Dictionary::t('INCLUDES', "STATUS_1999_65536"),  // ВХОД 53 ВЫСОКОЕ ДАВЛЕНИЕ
    "262144" => Dictionary::t('INCLUDES', "STATUS_1999_262144"),  // ВХОД 53 НИЗКОЕ ДАВЛЕНИЕ
    "1048576" => Dictionary::t('INCLUDES', "STATUS_1999_1048576"),  // ВРЕМЯ ДО ПЕРЕЗАПУСКА
];
// > 1048576 = -1

$red_status = Array(
    -1, 0, 512, 1024, 2048, 4096, 8192, 9999, 32768, 65536, 262144, 8421376, 16809984, 33587200, 67141632, 134250496
);

$green_status = Array(
    1, 2, 4, 16384, 1048576
);

$red_crash_status = array(
    32, 256, 512, 1024, 4096, 8192
);

$status_1999_trend = [
    "-1" => -1,
    "0" => 0,
    "1" => 1,
    "2" => 2,
    "4" => 3,
    "8" => 4,
    "32" => 5,
    "64" => 6,
    "256" => 7,
    "512" => 8,
    "1024" => 9,
    "4096" => 10, // СТАНДАРТНАЯ ОШИБКА ПРИВОДА
    "8192" => 11, // DRIVE TRIP LOG
    "16384" => 12,
    "32768" => 13,
    "65536" => 14,
    "262144" => 15,
    "1048576" => 16
];

$status_1999_point = [
    "-2" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_-2"),
    "-1" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_-1"),
    "0" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_0"),
    "1" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_1"),
    "2" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_2"),
    "3" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_3"),
    "4" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_4"),
    "5" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_5"),
    "6" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_6"),
    "7" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_7"),
    "8" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_8"),
    "9" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_9"),
    "10" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_10"), // СТАНДАРТНАЯ ОШИБКА ПРИВОДА
    "11" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_11"), // DRIVE TRIP LOG
    "12" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_12"),
    "13" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_13"),
    "14" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_14"),
    "15" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_15"),
    "16" => Dictionary::t('INCLUDES', "STATUS_1999_POINT_16"),
];
  const WORK_STATES = [
    1, // STATUS: RUN AUTO (СТАТУС: РАБОТА В АВТОМАТИЧЕСКОМ РЕЖИМЕ)
    4, // STATUS: RUN HAND (СТАТУС: РАБОТА В РУЧНОМ РЕЖИМЕ)
    8, // WARNING: RECOVERY (ПРЕДУПРЕЖДЕНИЕ: ВОССТАНОВЛЕНИЕ)
    16, // WARNING: FB LOSS (Transducer) (ПРЕДУПРЕЖДЕНИЕ: ПОТЕРЯ ОБРАТНОЙ СВЯЗИ (с датчиком))
    32, // WARNING: WAXING (ПРЕДУПРЕЖДЕНИЕ: ПАРАФИНИЗАЦИЯ)
    64, // WARNING: BUS TIME (ПРЕДУПРЕЖДЕНИЕ: ВРЕМЯ ОЖИДАНИЯ ОТВЕТА ШИНЫ)
    256, // STATUS: GAS/SAND PURGE (СТАТУС: ПРОДУВКА ОТ ГАЗОВ/ПЕСКА)
  ];

  const ACCUMULATION_STATES = [
    2, // STATUS: PUMP-OFF (СТАТУС: НАКОПЛЕНИЕ)
  ];

  const STOP_STATES = [
    -1, // Not commissioned –( не введена в эксплуатацию)
    0, // STATUS STOPPED/RESET (СТАТУС: ОСТАНОВЛЕН/ВОЗВРАТ В ИСХОДНОЕ СОСТОЯНИЕ)
    512, // ALARM: STALL or ALARM: BELT BRAKE (ОШИБКА: ПОТЕРЯ СКОРОСТИ или РАЗРЫВ РЕМНЯ)
    1024, // ALARM: RECOVERY FAULT (ОШИБКА: СРЫВ ПОДАЧИ)
    2048, // ALARM: DRIVE TRIP LOCK (ОШИБКА: БЛОКИРОВКА СТАНЦИИ ПОСЛЕ ВЫКЛЮЧЕНИЯ)
    4096, // ALARM: STANDARD DRIVE FAULT (ОШИБКА: ШТАТНАЯ НЕИСПРАВНОСТЬ СТАНЦИИ)
    8192, // ALARM: PROGRAM CHANGE (ОШИБКА: ИЗМЕНЕНИЕ ПРОГРАММЫ)
    9999, // Parameter 0-02 set incorrectly (параметр 0-02 введен неверно)
    16384, // STATUS: AUTO-RESTART (СТАТУС: АВТОМАТИЧЕСКИЙ ПЕРЕЗАПУСК)
    32768, // ALARM: HIGH PRESSURE INPUT TERMINAL 1 (ОШИБКА: ВХОД СИГНАЛА ТРЕВОГИ ВЫСОКОГО ДАВЛЕНИЯ клемма 1)
    32769, // ALARM: LOW PRESSURE INPUT TERMINAL 5 (ОШИБКА: ВХОД СИГНАЛА ТРЕВОГИ НИЗКОГО ДАВЛЕНИЯ клемма 5)
    65536, // ALARM: HIGH PRESSURE INPUT TERMINAL 53 (ОШИБКА: ВХОД СИГНАЛА ТРЕВОГИ ВЫСОКОГО ДАВЛЕНИЯ клемма 53)
    262144, // ALARM: LOW PRESSURE INPUT TERMINAL 53 (ОШИБКА: ВХОД СИГНАЛА ТРЕВОГИ НИЗКОГО ДАВЛЕНИЯ клемма 53)
    1048576, // Automatic Restart Time Delay (Время задержки автоматического перезапуска)
    8421376, // ALARM: VIBRATION, Input Terminal 6 (ОШИБКА: Вибрация, входная клемма 6)
    16809984, // ALARM: LEAK, Input Terminal 7 (ОШИБКА: НЕГЕРМЕТИЧНОСТЬ, входная клемма 7)
    33587200, // ALARM: LOW FLOW, Input Terminal 8 (ОШИБКА: Низкий приток, входная клемма 8)
    67,141,632, // ALARM: HIGH TEMPERATURE, Input Terminal 9 (ОШИБКА: Высокая температура, входная клемма 9)
    134250496, // ALARM: EXTERNAL FAULT, Input Terminal 10 (ОШИБКА: Внешняя ошибка, входная клемма 10)
  ];

  const NODATA = -100;

?>
