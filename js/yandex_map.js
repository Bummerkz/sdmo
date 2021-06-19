var yandexMap;
var stData;

var stStatus = [];
var placemarks = [];

ymaps.ready(init);


function init(){     
    try{
        yandexMap = new ymaps.Map ("mapContainer", {
            center: [40.018710304319015, 53.00665034763605],
            zoom: 12,
            controls: ['fullscreenControl'],
        });
        yandexMap.behaviors.enable('scrollZoom');
        yandexMap.events.add('sizechange', function(e){
            afterAjaxSetMapData();
        })
        yandexMap.controls.add('typeSelector');
        yandexMap.controls.add('FullscreenControl');
    } catch (err) {
        console.log('yandex api load');
    }
}

function afterAjaxSetMapData() {

   if(typeof stData == 'undefined'){
       $('#mapContainer').hide();
       $('#mapNullCoords').show();
       return;
   }
   var obj = JSON.parse(JSON.stringify(stData));
   
   
   var xArr = [];
   var yArr = [];
    for (var i = 0; i < placemarks.length; i++) {
        yandexMap.geoObjects.remove(placemarks[i]);
    }
    
   if(!obj) {
       $('#mapContainer').hide();
       $('#mapNullCoords').show();
       return false;
   }
   
    $('#mapNullCoords').hide();
    $('#mapContainer').show();
   for (key in obj) {
       obj[key].x = Number(obj[key].x);
       obj[key].y = Number(obj[key].y);
       if((obj[key].x!= false && obj[key].x>-90 && obj[key].x<90) && (obj[key].y != 0 && obj[key].y>-180 && obj[key].y<180)){
            xArr.push(obj[key].x);
            yArr.push(obj[key].y);
       }
    }
    if(xArr.length == 0){
       $('#mapContainer').hide();
       $('#mapNullCoords').show();
       return false;
    } else {
        $('#mapNullCoords').hide();
        $('#mapContainer').show();
    }
    
    var minX = getminOfArray(xArr);
    var maxX = getmaxOfArray(xArr);
    var minY = getminOfArray(yArr);
    var maxY = getmaxOfArray(yArr);
    
    
    if(minX == maxX && minY == maxY) {
        yandexMap.setCenter([minX, minY], 12, {
            checkZoomRange: true
        })
    } else {
        try {
            yandexMap.setBounds([[minX, minY], [maxX, maxY]], {checkZoomRange:true});
        } catch (err) {
            return;
        }
    }
    
    placemarks = [];
    preset = '';

    for (key in obj) {
        
        if(obj[key].status >= 1)
            preset = 'islands#greenStretchyIcon';
        else if(obj[key].status == 0)
            preset = 'islands#grayStretchyIcon';
        else
            preset = 'islands#redStretchyIcon';
        
        if(obj[key].pump_type == _PUMPTYPE1_)
            var stroke_per_minute = _SPEED_+': <strong>'+obj[key].stroke_per_minute+' '+_SPEEDTYPE1_+'</strong>';
        else 
            var stroke_per_minute = _SPEED_+': <strong>'+obj[key].stroke_per_minute+' '+_SPEEDTYPE1_+'</strong>';
        
        if(obj[key].status != 0) {
        var balloonContent = '<strong>'+obj[key].data.name+'</strong>&nbsp;&nbsp;&nbsp;<span class="sviaz mapIcons">'+obj[key].icons+'</span><br /><br />'+_TYPEINSTALLATION_+' : <strong>'+obj[key].pump_type+'</strong>\n\
            <br />'+_MODE_+' : <strong>'+obj[key].mode+'</strong>\n\
            <br />'+_WARNING_+' : <strong>'+obj[key].alert+'</strong>\n\
            <br />'+stroke_per_minute+'\n\
            <br />'+_FILLING_+' : <strong>'+obj[key].filling+'</strong>\n\
            <br />'+_INTRVIEW_+' : <strong>'+obj[key].savetime+'</strong>';
        } else {
            var balloonContent = '<strong>'+obj[key].data.name+'</strong>&nbsp;&nbsp;&nbsp;<span class="sviaz mapIcons">'+obj[key].icons+'</span><br />'+_TYPEINSTALLATION_+' : <strong>'+obj[key].pump_type+'</strong>\n\
            <br />'+_INTRVIEW_+' : <strong>'+obj[key].savetime+'</strong>';
        }
        
        
        var placemark = new ymaps.Placemark([obj[key].x, obj[key].y], {
            iconContent: obj[key].data.name,
            balloonContent: balloonContent,
        }, {
            preset: preset,
        });
        
        placemarks.push(placemark);
        yandexMap.geoObjects.add(placemark);
    }
}

function getminOfArray(numArray) {
  return Math.min.apply(null, numArray);
}
function getmaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}