var menu = document.getElementById('menu');
var modal = document.querySelector('.modal-overlay');

function getInputValue() {
  // Selecting the input element and get its value 
  let food = document.getElementById("inputId").value;
  // Displaying the value
  apiCall(food)
}


var apiCall = function(food) {
// show the modal
modal.style.visibility = 'visible'; 

//var requestUrl1 = "https://cors-anywhere.herokuapp.com/" + "https://www.themealdb.com/api/json/v1/1/search.php?s=" + food;
var requestUrl1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + food;

fetch(requestUrl1)
.then(function (response){
  return response.json();
})
.then(function (data) {
if( data.meals != null){
  console.log("yes")

console.log(typeof(data.meals))
console.log(data);
// if(data.meals)
var meal = data.meals[0]

// console.log(test.length)

var listGroupE1 = document.createElement("ul");//ul 
listGroupE1.classList = 'ul'
var listHeader = document.createElement('lh')
listHeader.classList = 'header';
var listInstructions = document.createElement('lh')
listGroupE1.appendChild(listHeader)
listGroupE1.appendChild(listInstructions)



for (var i = 1; i <= 20; i++){
  // creates dynamic response
  var listE1 =document.createElement("li")//li
  var ingredient = "strIngredient" + i

  if(meal[ingredient] != null && meal[ingredient] != ''){
    listE1.textContent = (meal[ingredient] + ",  " + meal['strMeasure' + i])//li + texts
    listGroupE1.appendChild(listE1)//ul + li (text)
  }
  
 
  // console.log(meal[ingredient].length)

  listHeader.textContent = (meal['strMeal'])
  listInstructions.textContent = (meal['strInstructions'])


}
menu.appendChild(listHeader);
menu.appendChild(listGroupE1);//html + ul (li's)
}
else{
 var error = document.createElement('h1')
 error.textContent = "No recipes found, try another one."
menu.appendChild(error)
}
})


}

function startAgain(){
  modal.style.visibility = 'hidden';
  document.location.reload(true);
}

document.getElementById('button-search').addEventListener('click', getInputValue);
document.querySelector('.btn-close').addEventListener('click', startAgain)




