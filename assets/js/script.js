// console.log("Hello! What City do you live in?");

var APIKey = "b640be0d343daf02b19e601754b23be5";
var city = "Atlanta";
// var state = "GA";
var country = "US";
var cityLatA = 44.34;
var cityLongB = 10.99;

// var currentWeather = 

fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + country + "&limit=5&appid=" + APIKey)
.then(function(response){
    return response.json();
    })
.then(function(data){
    console.log(data);
    var cityLat = data[0].lat;
    var cityLong = data[0].lon;
    // console.log(cityLat);
    // console.log(cityLong);
    cityDataLatLong(cityLat, cityLong);
})


// fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&limit=5&appid=" + APIKey)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//     })


function cityDataLatLong(lat, long) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid="+APIKey)
    .then(function(response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
};
