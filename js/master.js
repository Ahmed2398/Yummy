let rowShowData = document.getElementById("rowShowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})
// 1- open Side Nav Menu
function openNav() {
    $(".side-nav-menu").animate({
        left:0
    }, 500)

    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");

    for(let i = 0; i < 5 ; i++ ){
        $(".links li").eq(i).animate({
            top:0
        }, (i + 5) * 100)
    }
}

// 2- close side Nav Menu
function closeNav(){
    let navBoxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -navBoxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");

    $(".links li").animate({
        top: 300
    }, 500)
}

closeNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if($(".side-nav-menu").css("left") == "0px") {
            closeNav()
    }else{
            openNav()
    }
})

// 3- Display Meal Function
function displayMeals(array){
    let box = "";

    for(let i = 0; i < array.length; i++){
        box += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${array[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${array[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${array[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
        rowShowData.innerHTML = box
    }
}

// 4- Display Get Categories

async function getCategories() {
    rowShowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)
}

function displayCategories(array) {
        let cartoona = "";
    
        for (let i = 0; i < array.length; i++) {
            cartoona += `
            <div class="col-md-3">
                    <div onclick="getCategoryMeals('${array[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${array[i].strCategoryThumb}" alt="" srcset="">
                        <div class="meal-layer position-absolute text-center text-black p-2">
                            <h3>${array[i].strCategory}</h3>
                            <p>${array[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
            </div>
            `
        }
    
        rowShowData.innerHTML = cartoona
    }


// 5- Display Get Area

async function getArea(){
    rowShowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
response = await response.json()
    console.log(response.meals);
    displayArea(response.meals);
    $(".inner-loading-screen").fadeOut(300);
}

function displayArea(array){
    let box = "";

    for(let i = 0; i < array.length; i++){
        box += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${array[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${array[i].strArea}</h3>
                </div>
        </div>
        `
    }
    rowShowData.innerHTML = box
}
// 6- Display Ingredients Meals
//   first get ingredients
async function getIngredients() {
    rowShowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
        console.log(respone.meals);
    
        displayIngredients(respone.meals.slice(0, 20))
        $(".inner-loading-screen").fadeOut(300)
    }
// Second Display Ingredients
    function displayIngredients(array){
        let box = "";

        for(let i = 0; i < array.length; i++){
            box += `
            <div class="col-md-3">
                <div onclick="getIngredientsMeals('${array[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${array[i].strIngredient}</h3>
                        <p>${array[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
            `
        }
            rowShowData.innerHTML = box

    }
// thired Gey Ingredients Meals
    async function getIngredientsMeals (ingredients){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    // Display Meals Details
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)
    }

    // 7- Get meal Details
    async function getMealDetails(mealID){
        closeNav()
        rowShowData.innerHTML = ""
        $(".inner-loading-screen").fadeIn(300)
        searchContainer.innerHTML = "";
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        respone = await respone.json();
        displayMealDetails(respone.meals[0])
        $(".inner-loading-screen").fadeOut(300)
}

function displayMealDetails(meal){
    searchContainer.innerHTML = "";
    let ingredients = ``

    for(let i = 0 ; i <= 20; i ++){
        if(meal[`strIngredient${i}`]){
        ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`

        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let box = `
    <div class="col-md-4">
                    <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                        alt="">
                        <h2>${meal.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${ingredients}
                    </ul>
    
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${tagsStr}
                    </ul>
    
                    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>`
    
        rowShowData.innerHTML = box
    
}

function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowShowData.innerHTML = ""
}

async function searchByName(term) {
    closeNav()
    rowShowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(term) {
    closeNav()
    rowShowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}


function showContacts(){
    rowShowData.innerHTML = `
    <h1>Contact Us</h1>
    <form name="contactForm" onsubmit="return validateForm()" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>

        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required><br><br>

        <label for="age">Age:</label>
        <input type="number" id="age" name="age" required><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <label for="repassword">Confirm Password:</label>
        <input type="password" id="repassword" name="repassword" required><br><br>

        <input type="submit" value="Submit">
    </form>
    `
}

function showContacts() {
    rowShowData.innerHTML = `
    <div class="container">
    <h1 class="text-center text-uppercase">Contact Us</h1>
    <form name="contactForm" onsubmit="return validateForm()" method="post">
    <div class="row">
    <div class="col-md-6">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" class="form-control" required>
    <span id="nameError" class="error"></span><br><br>
    </div>

    <div class="col-md-6">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" class="form-control" required>
    <span id="emailError" class="error"></span><br><br>
    </div>
    <div class="col-md-6">
    <label for="phone">Phone:</label>
    <input type="tel" id="phone" name="phone" class="form-control" required>
    <span id="phoneError" class="error"></span><br><br>
    </div>
    <div class="col-md-6">
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" class="form-control" required>
    <span id="ageError" class="error"></span><br><br>
    </div>
    <div class="col-md-6">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" class="form-control" required>
    <span id="passwordError" class="error"></span><br><br>
    </div>
    <div class="col-md-6">
    <label for="repassword">Confirm Password:</label>
    <input type="password" id="repassword" name="repassword" class="form-control" required>
    <span id="repasswordError" class="error"></span><br><br>
    </div>
    <div class="col-md-12">
    <input class="form-control" type="submit" value="Submit">
    </div>
    </div>
    </form>
    </div>
    
    `
}

function validateForm() {
    var name = document.forms["contactForm"]["name"].value;
    var email = document.forms["contactForm"]["email"].value;
    var phone = document.forms["contactForm"]["phone"].value;
    var age = document.forms["contactForm"]["age"].value;
    var password = document.forms["contactForm"]["password"].value;
    var repassword = document.forms["contactForm"]["repassword"].value;

    // Regular expressions
    var nameRegex = /^[a-zA-Z ]{2,30}$/;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneRegex = /^\d{11}$/;
    var ageRegex = /^\d{1,3}$/;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var phoneError = document.getElementById("phoneError");
    var ageError = document.getElementById("ageError");
    var passwordError = document.getElementById("passwordError");
    var repasswordError = document.getElementById("repasswordError");

    nameError.innerHTML = "";
    emailError.innerHTML = "";
    phoneError.innerHTML = "";
    ageError.innerHTML = "";
    passwordError.innerHTML = "";
    repasswordError.innerHTML = "";

    var isValid = true;

    if (!nameRegex.test(name)) {
        nameError.innerHTML = "Please enter a valid name.";
        isValid = false;
    }

    if (!emailRegex.test(email)) {
        emailError.innerHTML = "Please enter a valid email address.";
        isValid = false;
    }

    if (!phoneRegex.test(phone)) {
        phoneError.innerHTML = "Please enter a valid phone number.";
        isValid = false;
    }

    if (!ageRegex.test(age)) {
        ageError.innerHTML = "Please enter a valid age.";
        isValid = false;
    }

    if (!passwordRegex.test(password)) {
        passwordError.innerHTML = "Please enter a valid password.<br>Password must contain at least six characters, including one uppercase letter, one lowercase letter, and one digit.";
        isValid = false;
    }

    if (password !== repassword) {
        repasswordError.innerHTML = "Passwords do not match.";
        isValid = false;
    }

    if (isValid) {
        // Form is valid, submit the form or perform further actions
        alert("Form submitted successfully!");
        return true;
    } else {
        return false;
    }
}