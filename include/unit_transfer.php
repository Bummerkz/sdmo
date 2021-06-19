<?php


function unit_transfer($reg, $value){

    switch ($reg) {
        case 1662:
        //    $value = round((6.25 * ($value*0.001) - 25) / 10, 2); //4222 => 4-20 мА (0-100 бар) в мПа(0 - 10)
        //    $value = recalc($value, 4, 20, 0, 10);
    $value = recalc($value, 4, 20, 0, 10);
            break;
        case 1675:
          //  $value = round((6.25 * ($value*0.001) - 25) / 10, 2); //4222 => 4-20 мА (0-100 бар) в мПа(0 - 10)
            $value = recalc($value, 0, 10, 0, 10);
	// $value =  $value/1000;
            break;
        case 1676:
            //$value = round((6.25 * ($value*0.001) - 25) , 2); //Трубный датчик температуры, 4-20 мА (0-100 С)
            $value = recalc($value, 0, 10, 0, 100);
            break;
    }
    return $value;
}

function recalc($i, $i_min, $i_max, $p_min, $p_max){
  if ($i<0) $i = 1;
  $p = $p_min + ($p_max - $p_min)*($i*0.001 - $i_min)/($i_max - $i_min);
  return round($p, 3);
}
