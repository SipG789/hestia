var apiKey = '7657d829bc488b1c62813a7e28777fcb';
var userInput = document.getElementById('user-input');
var userInputData = userInput.textContent.trim(); // this will get us the user input value, and trim any extra space
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var currentCity = document.querySelector('.current-city');
var cityDate = document.querySelector('.city-date');
var humidity = document.querySelector('.humidity ');
var index = document.querySelector('.uv-index');
var cityBtnSerach =  document.querySelectorAll('.city');
var cityText = document.querySelectorAll('.city').textContent;
var isDark =document.querySelector('.is-dark');


// all elements that will listen for events
var searchBtn = document.getElementById('search'); //1 search button by input value
var austinBtn = document.querySelector('.austin'); //2 austin p tag class name
var chicagoBtn = document.querySelector('.chicago'); //3 chicago p tag class name
var orlandoBtn = document.querySelector('.orlando'); //4 orlando p tag class name
var sanFranciscoBtn = document.querySelector('.san-francisco');//5 san francisco p tag class name
var seattleBtn = document.querySelector('.seattle'); //6 seattle p tag class name
var newYorkBtn = document.querySelector('.new-york'); //7 new york p tag class name
var denverBtn = document.querySelector('.denver'); //8 denver p tag class name
var atlantaBtn = document.querySelector('.atlanta'); //9  atlanta p tag class name


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



//function to search by city name 
function getApi (city){
  return function(e) {
  
  if(city){
    // //API url to get the weather data
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`;   
    fetch(requestUrl).then(function(response) {  // this will take the response and turn it to an object 
      // request was successful
      if (response.ok) {
        response.json().then(function(data){
          console.log('data for request is', data);
          // getting the lat and lon of the current city data
          var lat = data.coord.lat
          var lon = data.coord.lon
          // get the name of the city selected
          var name = data.name
            console.log(`city name is ${name}`)
            currentCity.innerHTML = `Today weather for ${name}`;
            console.log(`lat is:${lat} long is${lon}`);
          getApiFiveDay(lat, lon)
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



//function to get the whole data by using the function getApi data response
function getApiFiveDay(latitude, longitude) {
  //check if the function is working 
  console.log(`checking if the getApiFiveDay function is called`);
  //calling the api and fetching it  
  var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly&units=imperial&appid=${apiKey}`;
  fetch( oneCallUrl).then(function(response) {
    //request was successful
    if (response.ok) {
      response.json().then(function(data){// this will take the response and turn it to an object 
        console.log('data for onecall is:',data);

      //calling the current data to display on the DOM 
      var curentCitytime = data.current.dt
      var date = moment.unix(curentCitytime).format('MM/DD/YYYY');
        console.log(`date is:${date}`)
        cityDate.innerHTML = date
        temp.innerHTML = data.current.temp
        humidity.innerHTML = data.current.humidity
        wind.innerHTML = data.current.wind_speed

      // getting the value of sunset and change the color using the darkMode function YYYYAAAAAYYYYYY!!!
      var sunDown = data.current.sunset;
        console.log(`sun down in unix time down is ${sunDown}`);
        var sunDownUnix = JSON.parse(moment.unix(sunDown).format('h'));
        console.log(`sundown unix is:${sunDownUnix}`);
 
      darkMode(sunDownUnix);

      // using a for loop to display the data of the 5 days on the DOM
      for (i=1; i<=6; i++){ 
      var dailyDateUnix = data.daily[i].dt
      // var fiveDayForecast = data.daily[i];
      var dailyDate = moment.unix(dailyDateUnix).format('MM/DD/YYYY');
      //get the uvi value
      index.innerHTML = data.daily[0].uvi
      //if the uvi is low or equal to 0 change the color to red, of its greater than 0 leave it green 
      if( data.daily[0].uvi<=0){
        index.style.backgroundColor = 'red'
      }else{
        index.style.backgroundColor = 'green'
      }
      document.querySelector('.day-date_' + i).innerHTML = dailyDate;
      document.querySelector('.day-date_' + i).style.backgroundColor ='green'
      document.querySelector('.img_'+ i).src= `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`
      document.querySelector('.day-humidity_' + i).innerHTML = data.daily[i].humidity + ' ' + '%'
      document.querySelector('.day-temp_' + i).innerHTML = data.daily[i].temp.day + ' ' + '°F'
      document.querySelector('.day-wind_' + i).innerHTML = data.daily[i].wind_speed + ' ' +'MPH'
      document.querySelector('.day-ui-index_' + i).innerHTML = data.daily[i].uvi
      }
        
      });
      
    }else{
      alert('Error: city User Not Found');
    }

  }).catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    console.error(error)
    alert("Unable to connect to weather");
  });
}

var darkMode = function(sunsett){
  var currentTime =  moment().format('h')
    console.log(`current time is:${currentTime}`);

  if(currentTime >= sunsett){
    var body = document.getElementById('body')
    var header = document.getElementById('weather-color')
    var headerHeading = document.querySelector('.header-heading')
    var cityInfo = document.getElementById('first-col');

    body.style.backgroundColor = 'black';
    header.style.backgroundColor = 'transparent'
    headerHeading.style.color = 'white'
    header.style.borderBottom = '2px solid  white'
    body.style.color = 'white';
    cityInfo.style.border = '2px solid white';
    currentCity.style.color = 'white'
  }
}


// all event listeners
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