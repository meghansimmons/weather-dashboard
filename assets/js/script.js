var APIKey = "b640be0d343daf02b19e601754b23be5";

var today = dayjs();
var currentDayFormat = today.format('M/D/YYYY');

var cityInputBox = document.getElementById("city-finder");
var cityButton = document.getElementById("search-btn");
var currentNameDayIcon = document.getElementById('city-current');
var searchHistoryEl = document.getElementById('search-history');

var day1card =document.getElementById('card-1');
var day2card =document.getElementById('card-2');
var day3card =document.getElementById('card-3');
var day4card =document.getElementById('card-4');
var day5card =document.getElementById('card-5');




cityButton.addEventListener('click', function(event){ //  add error if cannot find city!?
    event.preventDefault();
    var city = cityInputBox.value;
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey) //Fetch city coordinates based on city entered
        .then(function(response){
        return response.json();
    })
    .then(function(data){
        var cityLat = data[0].lat;  //city lattitude
        var cityLong = data[0].lon;     //city longitute

        getCityCurrent(cityLat, cityLong); //call getCityCurrent function to get current forecast
        getCityFiveDay(cityLat, cityLong); //call getCityFiveDay function to get 5 day forecast
        createCityHistory(city);
    })
    return;
  
})


function searchHistorycityBtn(data){

    var city = data;
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey) //Fetch city coordinates based on city entered
        .then(function(response){
        return response.json();
    })
    .then(function(data){
        var cityLat = data[0].lat;  //city lattitude
        var cityLong = data[0].lon;     //city longitute
      
        getCityCurrent(cityLat, cityLong); //call getCityCurrent function to get current forecast
        getCityFiveDay(cityLat, cityLong); //call getCityFiveDay function to get 5 day forecast
    
    })

}



searchHistoryEl.addEventListener('click', function(event){
    event.preventDefault();
    // console.log("a button was clicked");
    // console.log(event.target.id);
    searchHistorycityBtn(event.target.id);
})

function createCityHistory(city){
   
    var cityHistoryList = document.createElement("BUTTON");
    cityHistoryList.classList.add("btn");
    cityHistoryList.classList.add("btn-secondary");
    cityHistoryList.setAttribute('id', city);
    cityHistoryList.textContent = city;

    var searchHistoryButtons = document.getElementsByClassName("btn-secondary");
    // console.log(searchHistoryButtons);
    
    // var cityHistoryList = document.createElement("li");
   
    searchHistoryEl.appendChild(cityHistoryList);
    // console.log(cityHistoryList);

    localStorage.setItem("city-finder", JSON.stringify(city));
}

function getCityCurrent(lat, long) { //Fetch current weather data
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

        document.getElementById('weather-current').innerHTML = temp + "<br><br>" + wind + "<br><br>"+ humidity;
    })
    return;
}

function getCityFiveDay (lat, long) { //Fetch 5 day forecast weather data at noon timestamp
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + APIKey  +"&units=imperial")
    .then(function(response){
        return response.json();
    })
    .then(function (data) {
        var count = 0;
        for (var i=0; i < data.list.length; i++) {
            var timestamp = data.list[i].dt_txt;
            var dateOnly = dayjs(data.list[i].dt_txt).format('M/D/YYYY');
            var timeOnly = dayjs(data.list[i].dt_txt).format('H');
            
            var weatherIcon = data.list[i].weather[0].icon;
            var temp = data.list[i].main.temp;
            var wind = data.list[i].wind.speed;
            var humidity = data.list[i].main.humidity;
            
            if (timeOnly==15) { //If timestamp is equal to 15 (3pm) then record that info for the 5 day forecast
                
                var cardArray = [day1card, day2card, day3card, day4card, day5card]

                cardArray[count].children[0].textContent = dateOnly;
                cardArray[count].children[1].src = "https://openweathermap.org/img/wn/" + weatherIcon+ ".png";
                cardArray[count].children[2].innerHTML = "Temp: " + temp + " &degF<br><br>Wind: " + wind + " MPH<br><br>Humidity: " + humidity + "%";
                
                count++;  
            } else {
            } 
        }
    })
    return;
}

function renderLastEvent(){
    var lastCity = JSON.parse(localStorage.getItem("city-finder"));
    if(lastCity !== null){
      cityInputBox.value = lastCity;
    } else {
      return;
    }
}

      
function initial(){  //function initial() populates the time-blocks with the last saved data from local storage
    renderLastEvent();
}

initial(); //calls function initial() upon browser page load and/or browser refresh

