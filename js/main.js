var weather;
var $ul = document.querySelector('.days');
var $place = 37217;
var url = 'http://api.wunderground.com/api/79f88a3ca5e3e1e8/geolookup/forecast10day/q/' + $place + '.json';
var baseurl = 'http://api.wunderground.com/api/79f88a3ca5e3e1e8/geolookup/forecast10day/q/';
var $button = document.querySelector('.send');
var $geo = document.querySelector('.geo');
var $city = document.querySelector('.city')
var latitude;
var longitude;

function awesome(data){
  weather = data;
  $city.innerHTML = weather.location.city;
  for(var i=0 ; i < 5 ; i++){
    var $img = document.createElement('img')
    $img.src = weather.forecast.simpleforecast.forecastday[i].icon_url;
    var $li = document.createElement('li');
    $li.innerHTML = weather.forecast.simpleforecast.forecastday[i].date.weekday + " high: " + weather.forecast.simpleforecast.forecastday[i].high.fahrenheit + "&#176; low: " + weather.forecast.simpleforecast.forecastday[i].low.fahrenheit + "&#176; ";
    $li.appendChild($img);
    $ul.appendChild($li);
  }
}


function getJSONP(url, cbString){
  var $script = document.createElement('script');
  $script.src = url + '?callback=' + cbString;
  document.body.appendChild($script);
}

function show_map(position){
   latitude = position.coords.latitude;
   longitude = position.coords.longitude;
   $place = latitude + ',' + longitude;
   $ul.innerHTML="";
   var newurl = baseurl + $place + '.json';
   getJSONP(newurl, 'awesome');
}

document.addEventListener('DOMContentLoaded', function(){
  getJSONP(url, 'awesome');
  $button.addEventListener('click', function(){
    $place = document.querySelector('.place').value;
    if($place.length != 5){
        alert('please enter a valid 5 digit zip code');
    } else{
      $ul.innerHTML="";
      var newurl = baseurl + $place + '.json';
      getJSONP(newurl, 'awesome');
    }
  });
  $geo.addEventListener('click', function(){
    navigator.geolocation.getCurrentPosition(show_map);

  });
});
