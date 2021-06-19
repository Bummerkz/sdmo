<?php
set_time_limit(0);

$DIR = '/var/www/sdmo/';
include($DIR . 'init/db_connect.php');

$stmt = $pdo->query("
SELECT reg, savetime, value FROM fc_data
WHERE station_id = 1002 AND day between '2017-09-10' AND '2017-09-11'
order by savetime ASC
");
$file=fopen($DIR . 'st_15.txt', "w+");
 
while ($r = $stmt->fetch()) {
    fputs($file,$r['reg'].';'.$r['value'].';'.$r['savetime'].';'.PHP_EOL);
    //file_put_contents($DIR . 'st_15.txt', $r['reg'].';'.$r['value'].';'.$r['savetime'].';'.PHP_EOL, FILE_APPEND);
}
echo 'конец';
fclose($file);
?>
