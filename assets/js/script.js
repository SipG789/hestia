

// var apiCall = function(){



// fetch("www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata", {
//   "method": "GET",
//   "headers": {
//     "x-rapidapi-host": "wyre-data.p.rapidapi.com",
//     "x-rapidapi-key": "8a2b8cfca4msh25430a8b7cfaa1fp16b84fjsn7e759bdbf8a9"
//   }
//   })
//   .then(function (response){
//     if(response.ok){
//       response.json().then(function(data){
//         console.log(data);
//       })
//     }
//   })
// .catch(err => {
//   console.error(err);
//   console.log(data)
// });
// }
// var verb = document.getElementById("verb").value;
var food = document.getElementById("fname").value;

var apiCall = function(food){
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + food)
      .then(response => response.json()) .then(responseData => { console.log(responseData) });
      
    }
     

// apiCall()


console.log(food)

// document.getElementById("submit").addEventListener("click", testVerbs);
document.getElementById('Submit').addEventListener('click', apiCall(food));
