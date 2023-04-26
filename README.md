# Weather Dashboard

The Weather Dashboard website was created to allow the user to search the current and 5-day weather forecasts for user identified cities. The weather data displayed includes temperature, wind speed and humidity. A weather icon, representing the the weather, is also displayed. Once a city has been searched, a search history button labelled with the city name can be clicked to recall and search again for that city's weather forecasts. The Weather Dashboard website was created with HTML, CSS and Javascript. 


## Installation

The application is accessible through any web browser at the following address:

https://meghansimmons.github.io/weather-dashboard/


## Preview



## Usage

The Weather Dashboard website presents the user with a city search input box. The user will first type a city name and click the submit button. The website will fetch data from the Geocoding API to convert the city name to its geographical coordinates. Next, the city coordinates will be passed to the Weather API and fetch both the current and 5-day forecasts for the city. Two separate fetch calls will be used to report these current and 5-day forecasts. To assist the user in comparing forecasts for multiple cities, buttons will be created for previously searched city names. The user can click any city button to display the weather forecasts for that city.


## Contributing

The current version of the Weather Dashboard website utilizes the following programs, libraries and frameworks: HTML, CSS, Javascript, Bootstrap and Day.js. The Geocoding API and Weather API from OpenWeather were called to return city data and both the current and 5-day weather forecasts. Any information about issues or bugs with the website are appreciated. 


## License

[MIT](https://choosealicense.com/licenses/mit/)

