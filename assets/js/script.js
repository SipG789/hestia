var menu = document.getElementById('menu');
var modal = document.querySelector('.modal-overlay');
const hexArray = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
const hexBtn  = document.getElementById('color-hex');
const colorTwo = document.querySelector('.color');

function getInputValue() {
  // Selecting the input element and get its value 
  let food = document.getElementById("inputId").value;
  // Displaying the value
  apiCall(food)
}


var apiCall = function(food) {
// show the modal
modal.style.visibility = 'visible'; 

var requestUrl1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + food;

fetch(requestUrl1)
.then(function (response){
  return response.json();
})
.then(function (data) {
if(data.meals != null){

console.log(data.meals)
var meal = data.meals[0]
var listHeader = document.querySelector('.header-status');
var listInstructions = document.querySelector('.header-header')

for (var i = 1; i <= 20; i++){
  // creates dynamic response
  var listE1 =document.createElement("li")//li
  listE1.classList ='list-item'
  var ingredient = "strIngredient" + i
  if(meal[ingredient] != null && meal[ingredient] != ''){
    listE1.textContent = (meal[ingredient] + ",  " + meal['strMeasure' + i])//li + texts
    var listItems = document.querySelector('.list-items');
    listItems.appendChild(listE1)//ul + li (text)    
  }
  

  listInstructions.textContent = (meal['strMeal'])
  listHeader.textContent = (meal['strInstructions'])



}
//YoutubeLink
var link = document.querySelector('.link-content');
link.innerHTML = ('<a href=" ' + meal['strYoutube'] + '">watch video</a>' )
listHeader.appendChild(listHeader);
}
else{
 var error = document.createElement('h1')
 error.textContent = "No recipes found, try another one."
menu.appendChild(error)
}
})


}

// function that will take you over the first section and reload the page, to delete the previous searched item
function startAgain(){
  modal.style.visibility = 'hidden';
  document.location.reload(true);
}

//add a listener to change the color every time you move the mouse
hexBtn.addEventListener('mouseover', function(e){
  let hexColor ='#';
  for(let i= 0; i<6; i++){
    hexColor+=hexArray[ getRandomNumberTwo()];
  }

  document.body.style.backgroundColor = hexColor;
  colorTwo.textContent = hexColor;

  e.preventDefault();
})
function getRandomNumberTwo(){
  return Math.floor(Math.random()*hexArray.length);
}

document.getElementById('button-search').addEventListener('click', getInputValue);
document.querySelector('.btn-close').addEventListener('click', startAgain)




