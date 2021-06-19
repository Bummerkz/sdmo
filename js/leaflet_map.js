var stData;

var stStatus = [];
var placemarks = [];
var internetConnect;
var icons = [];

var leafletMap;

$(document).on("click","[href='#map']", function(){
    leafletMap.invalidateSize();
})
$( document ).ready(function() {
    
    try {
        leafletMap = L.map('mapContainer').setView([43, 54], 9);
    L.tileLayer('/images/leaflet/map/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 17,
        minZoom: 8,
        fullscreenControl: true,
    }).addTo(leafletMap);
        afterAjaxSetMapData()
    
    } catch(err) {
        console.log('leaflet api load');
    }
});


function afterAjaxSetMapData() {
    if(typeof stData == 'undefined'){
       $('#mapContainer').hide();
       $('#mapNullCoords').show();
       return;
   }
    if(icons.length < 1)
        addLeafletIcons();
   if(typeof stData == 'undefined')
       return;
   var obj = JSON.parse(JSON.stringify(stData));
   var xArr = [];
   var yArr = [];
    for (var i = 0; i < placemarks.length; i++) {
        leafletMap.removeLayer(placemarks[i])
    }
   
   for (key in obj) {
       obj[key].x = Number(obj[key].x);
       obj[key].y = Number(obj[key].y);
       if((obj[key].x!= false && obj[key].x>-90 && obj[key].x<90) && (obj[key].y != 0 && obj[key].y>-180 && obj[key].y<180)){
            xArr.push(obj[key].x);
            yArr.push(obj[key].y);
       }
    }
  // if(!obj) {
 if(xArr.length == 0){
       $('#mapContainer').hide();
       $('#mapNullCoords').show();
       return false;
       
   }
    $('#mapNullCoords').hide();
    $('#mapContainer').show();
    var minX = getminOfArray(xArr);
    var maxX = getmaxOfArray(xArr);
    var minY = getminOfArray(yArr);
    var maxY = getmaxOfArray(yArr);
    
    placemarks = [];
    if(minX == maxX && minY == maxY) {
        leafletMap.panTo(new L.LatLng(minX, minY));
    } else {
        mapBounds = L.latLngBounds([
                    [minX, minY],
                    [maxX, maxY]
                ]);
        leafletMap.fitBounds(mapBounds, {padding: [50,50]});
        setTimeout(function() { leafletMap.fitBounds(mapBounds, {padding: [50,50]}) }, 1100);
    }
    
    
    for (key in obj) {
        if(obj[key].pump_type == _PUMPTYPE1_)
            var stroke_per_minute = _SPEED_+': <strong>'+obj[key].stroke_per_minute+' '+_SPEEDTYPE1_+'</strong>';
        else 
            var stroke_per_minute = _SPEED_+': <strong>'+obj[key].stroke_per_minute+' '+_SPEEDTYPE2_+'</strong>';
        
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
        
        if(obj[key].status >= 1){
            preset = icons['green'];
            presetClassName = "green";
        }else if(obj[key].status == 0){
            preset = icons['grey'];
            presetClassName = "grey";
        }else{
            preset = icons['red'];
            presetClassName = "red";
        }
        var placemark = new L.marker([obj[key].x, obj[key].y], {icon: preset}).on('mouseout', function(e){
            placemark.openTooltip();
        });
        leafletMap.addLayer(placemark);
        placemark.bindTooltip(obj[key].data.name, {className: presetClassName, permanent: true, opacity:1, interactive:true, direction:"top"}).bindPopup(balloonContent).openTooltip();
        placemarks.push(placemark);
    }
}

function addLeafletIcons(){
    
    icons['green'] =  L.icon({
        iconUrl: '/images/leaflet/images/marker-icon-green.png',
        iconSize:     [20, 30], // size of the icon
        iconAnchor:   [8, 29],
        popupAnchor:  [1, -25]
    });
    icons['red'] =  L.icon({
        iconUrl: '/images/leaflet/images/marker-icon-red.png',
        iconSize:     [20, 30], // size of the icon
        iconAnchor:   [8, 29],
        popupAnchor:  [1, -25]
    });    
    icons['grey'] =  L.icon({
        iconUrl: '/images/leaflet/images/marker-icon-grey.png',
        iconSize:     [20, 30], // size of the icon
        iconAnchor:   [8, 29],
        popupAnchor:  [1, -25]
    });   
}

function getminOfArray(numArray) {
  return Math.min.apply(null, numArray);
}
function getmaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
