var userInput = document.getElementById('user-input');
console.log(`user input: ${userInput}`);
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


function getApi (city){
  return function(e) {
  console.log(`city = ${city}`);

  if(city.value){
    //API url to get the weather data
    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city.value + ',us&appid=d43b06dc5d3db058fa0badac12a7945a';   

    fetch(requestUrl).then(function(response) {  // this will take the response and turn it to an object 
      // request was successful
      if (response.ok) {
        response.json().then(function(data){
         
          
          // convert the date to real time numbers
          var valueLon = data['coord']['lon'];
          var valueLat = data['coord']['lat'];
          console.log(`time is: ${valueLat},${valueLon}`);

          var valueHumidityName = data['main']['humidity'];
          var currentCityName = data['name'];
          var curentCityState =  data['sys']['country'];
          var valueTempName = data['main']['temp'];
          var valueWindName = data['wind']['speed'];

          currentCity.innerHTML  = currentCityName + ' ' + curentCityState + ' ';
          humidity.innerHTML = valueHumidityName;
          wind.innerHTML = valueWindName;
          temp.innerHTML = valueTempName;

          var oneCallUrl = 'http://api.openweathermap.org/data/2.5/onecall?lat='+ valueLat + '&lon='+ valueLon +'&lang=zh_cn&appid=d43b06dc5d3db058fa0badac12a7945a';
          fetch(oneCallUrl).then(function(data){
            console.log(data);
            console.log(Date('1647475026'));

            // var date = new Date('1647475026')
            // // var datte = new Date(Date'1647475026');

          })
        });
      }else {
        alert('Error: city User Not Found');
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      console.error(error)
      alert("Unable to connect to weather");
    });
  }
};
}

searchBtn.addEventListener('click', getApi(userInput));
