var weather;
var $ul = document.querySelector('.days');
var $place = 37217;
var url = 'http://api.wunderground.com/api/79f88a3ca5e3e1e8/forecast10day/q/' + $place + '.json';
var baseurl = 'http://api.wunderground.com/api/79f88a3ca5e3e1e8/forecast10day/q/';
var $button = document.querySelector('.send');

function awesome(data){
  weather = data;
  for(var i=0 ; i < 5 ; i++){
    var $li = document.createElement('li');
    $li.innerHTML = weather.forecast.simpleforecast.forecastday[i].date.weekday + " high: " + weather.forecast.simpleforecast.forecastday[i].high.fahrenheit + " low: " + weather.forecast.simpleforecast.forecastday[i].low.fahrenheit;
    $ul.appendChild($li);
  }
}

function getJSONP(url, cbString){
  var $script = document.createElement('script');
  $script.src = url + '?callback=' + cbString;
  document.body.appendChild($script);
}

document.addEventListener('DOMContentLoaded', function(){
  getJSONP(url, 'awesome');
  $button.addEventListener('click', function(){
    $place = document.querySelector('.place').value;
    $ul.innerHTML="";
    var newurl = baseurl + $place + '.json';
    getJSONP(newurl, 'awesome');
  });
});
