console.log("Hello! What City do you live in?");

var APIKey = "b640be0d343daf02b19e601754b23be5";
// var city = 
// var state = 
var cityLat = 44.34;
var cityLong = 10.99;
// var currentWeather = 

console.log(APIKey);

fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLong + "&appid="+APIKey)
.then(function(response){
    return response.json();
})
.then(function (data) {
    console.log(data);
})