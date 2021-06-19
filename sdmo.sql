-- phpMyAdmin SQL Dump
-- version 4.3.12
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Июл 10 2018 г., 00:23
-- Версия сервера: 5.6.33-0ubuntu0.14.04.1
-- Версия PHP: 7.0.14-1+deb.sury.org~trusty+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `sdmo`
--

-- --------------------------------------------------------

--
-- Структура таблицы `chat`
--

CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(10) NOT NULL,
  `station_id` int(10) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `text` text,
  `del` int(1) DEFAULT NULL,
  `savetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `command`
--

CREATE TABLE IF NOT EXISTS `command` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `station_id` int(10) NOT NULL,
  `reg` int(10) NOT NULL,
  `value` float NOT NULL,
  `status` int(1) DEFAULT NULL,
  `savetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `daily_data`
--

CREATE TABLE IF NOT EXISTS `daily_data` (
  `id` bigint(20) NOT NULL,
  `station_id` int(10) NOT NULL,
  `day` date NOT NULL,
  `electric_cons` float NOT NULL,
  `debit_theoretical` float NOT NULL,
  `energy_cons` float NOT NULL,
  `work` float DEFAULT NULL,
  `no_work` float DEFAULT NULL,
  `nakoplenie` float DEFAULT NULL,
  `avg_1614` float DEFAULT NULL,
  `avg_1617` float DEFAULT NULL,
  `avg_1997` float DEFAULT NULL,
  `avg_1998` float DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=65758 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `electric_data`
--

CREATE TABLE IF NOT EXISTS `electric_data` (
  `id` bigint(20) unsigned NOT NULL,
  `station_id` int(10) NOT NULL DEFAULT '0',
  `reg_id` int(2) DEFAULT NULL,
  `value` float DEFAULT NULL,
  `savetime` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10262661 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `electric_data_last`
--

CREATE TABLE IF NOT EXISTS `electric_data_last` (
  `station_id` int(10) NOT NULL,
  `reg_id` int(2) NOT NULL,
  `value` float NOT NULL,
  `savetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `fc_data`
--

CREATE TABLE IF NOT EXISTS `fc_data` (
  `id` bigint(20) unsigned NOT NULL,
  `station_id` int(10) unsigned NOT NULL,
  `reg` int(10) unsigned NOT NULL,
  `value` float NOT NULL COMMENT 'значение регистра',
  `savetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `day` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=165154801 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `fc_data_day`
--

CREATE TABLE IF NOT EXISTS `fc_data_day` (
  `id` bigint(20) unsigned NOT NULL,
  `station_id` int(10) unsigned NOT NULL,
  `reg` int(10) unsigned NOT NULL,
  `value` float NOT NULL COMMENT 'значение регистра',
  `savetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `day` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=101270376 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `fc_data_last`
--

CREATE TABLE IF NOT EXISTS `fc_data_last` (
  `station_id` int(10) unsigned NOT NULL,
  `reg` int(10) unsigned NOT NULL,
  `value` float NOT NULL COMMENT 'значение регистра',
  `savetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `osc_data`
--

CREATE TABLE IF NOT EXISTS `osc_data` (
  `id` bigint(20) NOT NULL,
  `station_id` int(10) NOT NULL,
  `reg` int(10) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `value` longtext NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=209827 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `report_ping`
--

CREATE TABLE IF NOT EXISTS `report_ping` (
  `id` bigint(20) unsigned NOT NULL,
  `station_id` int(10) unsigned NOT NULL,
  `reg` int(10) unsigned NOT NULL,
  `value` float NOT NULL COMMENT 'значение регистра',
  `savetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `day` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1178841 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `report_status`
--

CREATE TABLE IF NOT EXISTS `report_status` (
  `id` bigint(20) unsigned NOT NULL,
  `station_id` int(10) unsigned NOT NULL,
  `value` float NOT NULL COMMENT 'значение регистра',
  `value_1660` int(1) DEFAULT NULL,
  `savetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `day` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16461176 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users_login`
--

CREATE TABLE IF NOT EXISTS `users_login` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `cookie` int(10) NOT NULL,
  `savetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=1148 DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `command`
--
ALTER TABLE `command`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `daily_data`
--
ALTER TABLE `daily_data`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `indx` (`station_id`,`day`) USING BTREE;

--
-- Индексы таблицы `electric_data`
--
ALTER TABLE `electric_data`
  ADD PRIMARY KEY (`id`,`station_id`) USING BTREE;

--
-- Индексы таблицы `electric_data_last`
--
ALTER TABLE `electric_data_last`
  ADD UNIQUE KEY `station_id` (`station_id`,`reg_id`);

--
-- Индексы таблицы `fc_data`
--
ALTER TABLE `fc_data`
  ADD PRIMARY KEY (`id`), ADD KEY `idx3` (`station_id`,`reg`,`day`);

--
-- Индексы таблицы `fc_data_day`
--
ALTER TABLE `fc_data_day`
  ADD PRIMARY KEY (`id`), ADD KEY `idx3` (`station_id`,`reg`,`day`);

--
-- Индексы таблицы `fc_data_last`
--
ALTER TABLE `fc_data_last`
  ADD UNIQUE KEY `UNIQ` (`station_id`,`reg`);

--
-- Индексы таблицы `osc_data`
--
ALTER TABLE `osc_data`
  ADD PRIMARY KEY (`id`), ADD KEY `indx` (`station_id`,`date`) USING BTREE;

--
-- Индексы таблицы `report_ping`
--
ALTER TABLE `report_ping`
  ADD UNIQUE KEY `id` (`id`), ADD KEY `idx3` (`station_id`,`reg`,`day`) USING BTREE;

--
-- Индексы таблицы `report_status`
--
ALTER TABLE `report_status`
  ADD UNIQUE KEY `id` (`id`), ADD KEY `idx3` (`station_id`,`day`) USING BTREE;

--
-- Индексы таблицы `users_login`
--
ALTER TABLE `users_login`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=235;
--
-- AUTO_INCREMENT для таблицы `command`
--
ALTER TABLE `command`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT для таблицы `daily_data`
--
ALTER TABLE `daily_data`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=65758;
--
-- AUTO_INCREMENT для таблицы `electric_data`
--
ALTER TABLE `electric_data`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10262661;
--
-- AUTO_INCREMENT для таблицы `fc_data`
--
ALTER TABLE `fc_data`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=165154801;
--
-- AUTO_INCREMENT для таблицы `fc_data_day`
--
ALTER TABLE `fc_data_day`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=101270376;
--
-- AUTO_INCREMENT для таблицы `osc_data`
--
ALTER TABLE `osc_data`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=209827;
--
-- AUTO_INCREMENT для таблицы `report_ping`
--
ALTER TABLE `report_ping`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1178841;
--
-- AUTO_INCREMENT для таблицы `report_status`
--
ALTER TABLE `report_status`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16461176;
--
-- AUTO_INCREMENT для таблицы `users_login`
--
ALTER TABLE `users_login`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1148;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
