var menu = document.getElementById('menu');
// var food = document.getElementById("username");
// var submit = document.getElementById("Submit");
//  let inputId = document.getElementById("inputId");
function getInputValue() {
  // Selecting the input element and get its value 
  let food = document.getElementById("inputId").value;
  // Displaying the value
  apiCall(food)
}

var apiCall = function(food) {

//var requestUrl1 = "https://cors-anywhere.herokuapp.com/" + "https://www.themealdb.com/api/json/v1/1/search.php?s=" + food;
var requestUrl1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + food;

fetch(requestUrl1)
.then(function (response){
  return response.json();
})
.then(function (data) {
console.log(data);
var meal = data.meals[0]

// console.log(test.length)

var listGroupE1 = document.createElement("ul");//ul 
var listHeader = document.createElement('lh')
var listInstructions = document.createElement('lh')
listGroupE1.appendChild(listHeader)
listGroupE1.appendChild(listInstructions)



for (var i = 1; i <= 20; i++){
  // console.log(data[i].strIngredient1 + "  " + data[i].strMeasure1)
  var listE1 =document.createElement("li")//li
  var ingredient = "strIngredient" + i

  if(meal[ingredient] != null && meal[ingredient] != ''){
    listE1.textContent = (meal[ingredient] + ", " + meal['strMeasure' + i])//li + texts
  }
  
 
  // console.log(meal[ingredient].length)
  listGroupE1.appendChild(listE1)//ul + li (text)
  listHeader.textContent = (meal['strMeal'])
  listInstructions.textContent = (meal['strInstructions'])


}
menu.appendChild(listHeader);
menu.appendChild(listGroupE1);//html + ul (li's)
})

// submit.addEventListener('click', apiCall(food));





}



document.getElementById('button').addEventListener('click', getInputValue);
// submit.addEventListener('click', console.log(food));


// console.log(food)






// fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + food)
// .then(response => response.json()).then(responseData => {
//   console.log(responseData) 
//   var listGroupE1 = document.createElement("ul");
  // for (var i = 0; i < food.length; i++) {
  //   console.log(food[i].strIngredient1, '  ', food[i].strMeasure1)
  // }

// });