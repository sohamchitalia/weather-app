var API_KEY = "4f3421aab5990a4c4a3942fcc816df3d";
var cel = false;
var wd;

function displayTemp(num, c)
{
  if(c) return Math.round((num-32)*(5/9)) + " C ";
  return Math.round(num) + " F";
}

function render(wd, cel)
{
      var currentLocation = wd.name;
      var currentWeather = wd.weather[0].description;
      var currentTemp = displayTemp(wd.main.temp, cel);
      var high = displayTemp(wd.main.temp_max, cel);
      var low = displayTemp(wd.main.temp_min, cel);
      var icon = wd.weather[0].icon;
      
      $('#currentLocation').html(currentLocation);
      $("#currentTemp").html(currentTemp);
      $("#currentWeather").html(currentWeather);
      $("#high-low").html(high+" / "+low);
      
      var iconSrc = "https://openweathermap.org/img/w/" + icon + ".png";
      $('#currentTemp').prepend('<img src="'+ iconSrc + '"> <br>');
}

$(function(){
  var loc;
  $.getJSON('https://ipinfo.io',function(d){
    console.log("assigning the data...")
    loc = d.loc.split(",");
    console.log(loc);
    
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?&units=imperial&lat='+loc[0]+'&lon='+loc[1]+'&APPID=' +API_KEY, function(apiData){
      
      wd = apiData;
      
      render(apiData, cel);
      
      $("#toggle").click(function(){
        cel = !cel;
        render(wd, cel);
      })
    })
    
    //call to weather API
  })
})