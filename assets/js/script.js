var APIKey = "b640be0d343daf02b19e601754b23be5";

var today = dayjs();
var currentDayFormat = today.format('M/D/YYYY');

var cityInputBoxEl = document.getElementById("city-finder");
var cityButtonEl = document.getElementById("search-btn");
var currentNameDayIconEl = document.getElementById('city-current');
var searchHistoryEl = document.getElementById('search-history');

var cityArray = [];

var day1card =document.getElementById('card-1');
var day2card =document.getElementById('card-2');
var day3card =document.getElementById('card-3');
var day4card =document.getElementById('card-4');
var day5card =document.getElementById('card-5');


//listen for a mouse click on the search button and fetch the city coordinates based on city entered
cityButtonEl.addEventListener('click', function(event){ 
    event.preventDefault();
    var city = cityInputBoxEl.value;
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey) 
        .then(function(response){
        return response.json();
    })
    .then(function(data){
        var cityLat = data[0].lat;  //city lattitude
        var cityLong = data[0].lon;     //city longitute

        getCityCurrent(cityLat, cityLong); //call getCityCurrent function to get current forecast
        getCityFiveDay(cityLat, cityLong); //call getCityFiveDay function to get 5 day forecast
        createCityHistoryBtns(city);
    })
    return;
  
})

// listen for a mouse click on a search history button and run the function with the id of the button clicked (the id equals the city name)
searchHistoryEl.addEventListener('click', function(event){
    event.preventDefault();
    getCityHistory(event.target.id);
    return;
})

//function getCityCurrent() fetches current weather data
function getCityCurrent(lat, long) { 
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + APIKey + "&units=imperial")
    .then(function(response){
        return response.json();
    })
    .then(function (data) {

        var weatherIcon = data.weather[0].icon;
        currentNameDayIconEl.textContent = data.name + " (" + currentDayFormat + ")  ";
    
        document.getElementById('icon').src="https://openweathermap.org/img/wn/" + weatherIcon+ ".png";  
        
        var temp = "Temp: " + data.main.temp + " &degF";
        var wind = " Wind: " + data.wind.speed + " MPH";
        var humidity = "Humidity: " + data.main.humidity + " %";

        document.getElementById('weather-current').innerHTML = temp + "<br><br>" + wind + "<br><br>"+ humidity;
    })
    return;
}

//function getCityFiveDay() fetches 5 day forecast weather data at the 3pm timestamp
function getCityFiveDay (lat, long) { 
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
            
            if (timeOnly==15) { //If timestamp is equal to 15 (3pm) then record that particular timestamp info for the 5 day forecast
                
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

// function createCityHistoryBtns() creates a new search history button for each city searched in the input box
function createCityHistoryBtns(city){
   
    var cityHistoryList = document.createElement("BUTTON");

    cityHistoryList.classList.add("btn", "btn-secondary");
    cityHistoryList.setAttribute('id', city);
    cityHistoryList.textContent = city;
   
    searchHistoryEl.appendChild(cityHistoryList);
    cityArray.push(city);

    localStorage.setItem("city-finder", JSON.stringify(city));
    localStorage.setItem("city-storage", JSON.stringify(cityArray));
}

//function getCityHistory() fetches city coordinates based on the city button clicked in the search history
function getCityHistory(data){
    var city = data;
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey) 
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


// function renderLastCity(){
//     var lastCity = JSON.parse(localStorage.getItem("city-finder"));
//     if(lastCity !== null){
//       cityInputBoxEl.value = lastCity;
//     } else {
//       return;
//     }
// }

// function renderLastCity() gets the last city name from local storage and writes it to the search input box
// the function also gets the array data from local storage and creates clickable buttons for the searh history
function renderLastCity(){
    var lastCity = JSON.parse(localStorage.getItem("city-finder"));
    var lastArray = JSON.parse(localStorage.getItem("city-storage"));
    if(lastCity !== null){

      cityInputBoxEl.value = lastCity;
      
      for(var i=0; i<lastArray.length; i++){
        var lastcityHistoryList = document.createElement("BUTTON");
    
        lastcityHistoryList.classList.add("btn", "btn-secondary");
        lastcityHistoryList.setAttribute('id', lastArray[i]);
        lastcityHistoryList.textContent = lastArray[i];
     
        searchHistoryEl.appendChild(lastcityHistoryList);
      }
    } else {
      return;
    }
}

 //function initial() calls the renderLastCity()
function initial(){ 
    renderLastCity();
}

//calls function initial() upon browser page load and/or browser refresh
initial(); 

