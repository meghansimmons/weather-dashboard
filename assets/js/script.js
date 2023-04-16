var APIKey = "b640be0d343daf02b19e601754b23be5";

var today = dayjs();
var currentDayFormat = today.format('M/D/YYYY');

var cityInputBox = document.getElementById("city-finder");
var cityButton = document.getElementById("search-btn");
var currentNameDayIcon = document.getElementById('city-current');





//  add error if cannot find city!?

cityButton.addEventListener('click', function(event){
    event.preventDefault();
    var city = cityInputBox.value;
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey) //Fetch city coordinates based on city entered
        .then(function(response){
        return response.json();
    })
    .then(function(data){
        var cityLat = data[0].lat;  //city lattitude
        var cityLong = data[0].lon;     //city longitute

        cityCurrent(cityLat, cityLong); //call cityCurrent function to get current forecast
        cityFiveDay(cityLat, cityLong); //call cityFiveDay function to get 5 day forecast
    })
    return;
   
})


function cityCurrent(lat, long) { //Fetch current weather data
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + APIKey + "&units=imperial")
    .then(function(response){
        return response.json();
    })
    .then(function (data) {

        var weatherIcon = data.weather[0].icon;
        currentNameDayIcon.textContent = data.name + " (" + currentDayFormat + ")  ";
    
        document.getElementById('icon').src="https://openweathermap.org/img/wn/" + weatherIcon+ ".png";  
        
        var temp = "Temp: " + data.main.temp + " &degF";
        var wind = " Wind: " + data.wind.speed + " MPH";
        var humidity = "Humidity: " + data.main.humidity + " %";

        document.getElementById('weather-current').innerHTML = temp + "<br>" + wind + "<br>"+ humidity;
        // console.log(weatherCurrent);
       
        
        // console.log(); //temp
        // console.log(); //humidity
        // console.log(data.weather[0].icon); //weather icon
        // console.log(); //wind speed
        // console.log(data.name); //city name



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
        
        // console.log(data.list);     // all forecast time points
        // console.log(data.list[0]);      // first forecast time points
        console.log(data.list[0].dt_txt);       // date and time
        // console.log(data.list[0].main.humidity);        // humidity
        // console.log(data.list[0].main.temp);        // temp
        // console.log(data.list[0].weather[0].icon);      // weather icon
        // console.log(data.list[0].wind.speed);       // wind speed
    })
}

