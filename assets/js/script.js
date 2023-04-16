var APIKey = "b640be0d343daf02b19e601754b23be5";
var city = "Atlanta";
// var state = "GA";
// var country = "US";
var cityLat = "";
var cityLong = "";


fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey) //Fetch city coordinates based on city entered
.then(function(response){
    return response.json();
    })
.then(function(data){
    // console.log(data);
    cityLat = data[0].lat;  //city lattitude
    cityLong = data[0].lon;     //city longitute
    console.log(cityLat);
    console.log(cityLong);

    cityCurrent(cityLat, cityLong); //call cityCurrent function to get current forecast
    cityFiveDay(cityLat, cityLong); //call cityFiveDay function to get 5 day forecast
})


function cityCurrent(lat, long) { //Fetch current weather data
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + APIKey + "&units=imperial")
    .then(function(response){
        return response.json();
    })
    .then(function (data) {
        console.log(data.main.temp); //object returned
        console.log(data.main.humidity); 
        console.log(data.weather[0].icon); 
        console.log(data.wind.speed); 
        console.log(data.name); 

    })
}

function cityFiveDay (lat, long) { //Fetch 5 day forecast weather data at noon timestamp
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + APIKey  +"&units=imperial")
    .then(function(response){
        return response.json();
    })
    .then(function (data) {
        // for (let index = 0; index < array.length; index++) {
        //     const element = array[index];

        //     if (condition) {
            
        //     } else {
                
        //     }
            
        // }
        
        console.log(data.list);     // all forecast time points
        console.log(data.list[0]);      // first forecast time points
        console.log(data.list[0].dt_txt);       // date and time
        console.log(data.list[0].main.humidity);        // humidity
        console.log(data.list[0].main.temp);        // temp
        console.log(data.list[0].weather[0].icon);      // weather icon
        console.log(data.list[0].wind.speed);       // wind speed
    })
}

