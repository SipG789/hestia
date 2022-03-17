
var food = document.getElementById("fname").value;

var apiCall = function(food){
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + food)
      .then(response => response.json()) .then(responseData => { console.log(responseData) });
      
    }
     

// apiCall()


console.log(food)


document.getElementById('Submit').addEventListener('click', apiCall(food));
