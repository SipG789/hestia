var apiKey = '7657d829bc488b1c62813a7e28777fcb';
var userInput = document.getElementById('user-input');
var userInputData = userInput.textContent.trim(); // this will get us the user input value, and trim any extra space
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var currentCity = document.querySelector('.current-city');
var humidity = document.querySelector('.humidity ');
var index = document.querySelector('.uv-index');
var cityBtnSerach =  document.querySelectorAll('.city');
var cityText = document.querySelectorAll('.city').textContent;


// all the buttons that will listen for event
var searchBtn = document.getElementById('search'); //1 search button by input value
var austinBtn = document.querySelector('.austin'); //2 austin p tag class name
var chicagoBtn = document.querySelector('.chicago'); //3 chicago p tag class name
var orlandoBtn = document.querySelector('.orlando'); //4 orlando p tag class name
var sanFranciscoBtn = document.querySelector('.san-francisco');//5 san francisco p tag class name
var seattleBtn = document.querySelector('.seattle');//6 seattle p tag class name
var newYorkBtn = document.querySelector('.new-york');//7 new york p tag class name
var denverBtn = document.querySelector('.denver');//8 denver p tag class name
var atlantaBtn = document.querySelector('.atlanta');//9  atlanta p tag class name


// all the variables that the event listeners will get the values from 
var austin = document.getElementById('city-austin-value'); 
var chicago = document.getElementById('city-chicago-value');
var newYork = document.getElementById('city-new-york-value');
var orlando = document.getElementById('city-orlando-value');
var sanFrancisco = document.getElementById('city-san-francisco-value');
var seattle = document.getElementById('city-seattle-value');
var denver = document.getElementById('city-denver-value');
var atlanta = document.getElementById('city-atlanta-value');
var sanAntonio = document.getElementById('city-san-antonio-value');


function getApi (city){
  return function(e) {

  if(city){
    // //API url to get the weather data
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value},us&appid=${apiKey}`;   
    fetch(requestUrl).then(function(response) {  // this will take the response and turn it to an object 
      // request was successful
      if (response.ok) {
        response.json().then(function(data){
          console.log(data);
          var lat = data.coord.lat
          var lon = data.coord.lon
          console.log(`coord are:${lat},${lon}`);


          var valueHumidityName = data.main.humidity;
          var currentCityName = data.name;
          var curentCityState =  data.sys.country;

          // convert unix time to current date format using moment.js 
          var curentCitytime =  data.sys.sunrise;
          var date = moment.unix(curentCitytime).format('MM/DD/YYYY');
            console.log(`date is:${date}`);
          var valueTempName = data['main']['temp'];
          var valueWindName = data['wind']['speed'];

          //display data
          currentCity.innerHTML  = currentCityName + ' ' + curentCityState + ' ' + '' + date;
          humidity.innerHTML = valueHumidityName;
          wind.innerHTML = valueWindName;
          temp.innerHTML = valueTempName;
        
        });
        
      }else {
        alert('Error: city User Not Found');
      }

    }).catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      console.error(error)
      alert("Unable to connect to weather");
    });
  }
  } 
};


function getApiFiveDay(latitude, longitude) {
  
    // var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=32&lon=32&appid=${apiKey}`;   
    // var oneCallUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
    var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly&units=imperial&appid=${apiKey}`;
    fetch( oneCallUrl).then(function(response) {  // this will take the response and turn it to an object 
      // request was successful
      if (response.ok) {
        response.json().then(function(data){
          console.log(`data for onecall is: ${data}`);
          for (i=0; i<=5; i++){ 
          // var fiveDayForecast = data.daily[i];
          var hum = document.querySelector('.day-humidity');
          hum.textContent = data.daily[0].clouds
          
          }
         
        });
       
      }else {
        alert('Error: city User Not Found');
      }

    }).catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      console.error(error)
      alert("Unable to connect to weather");
    });
  }


searchBtn.addEventListener('click', getApi(userInput));
austinBtn.addEventListener('click', getApi(austin));
chicagoBtn.addEventListener('click', getApi(chicago));
newYorkBtn.addEventListener('click', getApi(newYork));
orlandoBtn.addEventListener('click', getApi(orlando));
sanFranciscoBtn.addEventListener('click', getApi(sanFrancisco));
seattleBtn.addEventListener('click', getApi(seattle));
denverBtn.addEventListener('click', getApi(denver));
atlantaBtn.addEventListener('click', getApi(atlanta));
window.addEventListener("DOMContentLoaded", getApi(sanAntonio));

