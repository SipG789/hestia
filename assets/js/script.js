var menu = document.getElementById('menu-result');
var btnSearch = document.getElementById('button-search')
var listGroupE1 = document.querySelector('.menu-result')
var btnClose = document.querySelector('.btn-close');
var modal = document.querySelector('.modal-overlay');


function getInputValue() {
  // show the modal
  modal.style.visibility = 'visible';
  // Selecting the input element and get its value 
  let food = document.getElementById("inputId").value;
  // Displaying the value
  apiCall(food)
}

// apiCall function start
var apiCall = function(food) {
var requestUrl1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + food;

fetch(requestUrl1)
.then(function (response){
  return response.json();
}).then(function (data) {
console.log(data);
var meal = data.meals[0]

for (var i = 1; i <= 10; i++){
  var mealName = document.querySelector('mealName');
  console.log(mealName);
  var instructions = document.querySelector('instructions');
  var meal = data.meals[0]
  instructions.innerHTML = meal;
}
});
}

// hide the modal
function startAgain(){
  modal.style.visibility = 'hidden';
}


btnSearch.addEventListener('click', getInputValue);
btnClose.addEventListener('click', startAgain)

