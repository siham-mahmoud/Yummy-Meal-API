//inputs
let Data = document.getElementById("Data");
let searchContainer = document.getElementById("searchContainer");
let nameInputDone = false;
let emailInputDone = false;
let phoneInputDone = false;
let ageInputDone = false;
let passwordInputDone = false;
let repasswordInputDone = false;


$(document).ready(() => {
  // Initiate a search for meals with an empty string as the initial search term
    searchByName("").then(() => {
        // After the search is completed:
        
        // Fade out the loading screen over 500 milliseconds
        $(".loading-screen").fadeOut(500);
       
    });
});

// Function to open the side navigation menu
function openSideNav() {
    $(".side-nav-menu").animate({ left: 0 }, 500);

    // Change icon
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");

    // Animate the links
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 100);
    }
}

// Function to close the side navigation menu
function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").innerWidth();
    console.log(boxWidth);

    $(".side-nav-menu").animate({ left: -boxWidth }, 500);

    // Change icon
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");

    // Animate the links
    $(".links li").animate({ top: 300 }, 500);
}



// Toggle side navigation menu on icon click
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav();
    } else {
        openSideNav();
    }
});


// Function to fetch categories data asynchronously
async function getCategories() {
    // Clear existing content
    Data.innerHTML = "";

    // Show inner loading screen and clear search container
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";

    // Fetch categories data from the API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);

    
    if (response.ok && response.status !== 400) {
        const data = await response.json();

        // Display categories using the fetched data
        displayCategories(data.categories);

        // Hide inner loading screen
        $(".inner-loading-screen").fadeOut(300);
    }
}

// Function to display categories
function displayCategories(arr) {
    let categories = "";

    // Loop through the categories array and create HTML for each category
    for (let i = 0; i < arr.length; i++) {
        categories += `
            <div class="col-md-3">
                <div onclick="getCategoryMeal('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Set the generated HTML to the Data container
    Data.innerHTML = categories;
}

// Function to fetch meals according to the chosen category
async function getCategoryMeal(category) {
    // Clear search container and data container, show inner loading screen
    searchContainer.innerHTML = "";
    Data.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    // Fetch meals data based on the selected category from the API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

    
    if (response.ok && response.status !== 400) {
        const data = await response.json();

        // Display the fetched meals
        displayMeals(data.meals.slice(0, 20));

        // Hide inner loading screen
        $(".inner-loading-screen").fadeOut(300);
    }
}

// Function to display meals
function displayMeals(arr) {
    let meal = "";

    // Loop through the meals array and create HTML for each meal
    for (let i = 0; i < arr.length; i++) {
        meal += `
            <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }

    // Set the generated HTML to the Data container
    Data.innerHTML = meal;
}

// Function to fetch area data
async function getArea() {
    // Clear search container and data container, show inner loading screen
    searchContainer.innerHTML = "";
    Data.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    // Fetch area data from the API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);

    
    if (response.ok && response.status !== 400) {
        const data = await response.json();

        // Display area data using the fetched data
        displayArea(data.meals);

        // Hide inner loading screen
        $(".inner-loading-screen").fadeOut(300);
    }
}

// Function to display area data
function displayArea(arr) {
    let area = "";

    // Loop through the area array and create HTML for each area
    for (let i = 0; i < arr.length; i++) {
        area += `
            <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${arr[i].strArea}</h3>
                </div>
            </div>
        `;
    }

    // Set the generated HTML to the Data container
    Data.innerHTML = area;
}

// Function to fetch meals based on the chosen area
async function getAreaMeals(area) {
    // Clear data container, show inner loading screen and clear search container
    Data.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";

    // Fetch meals data based on the selected area from the API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);

    
    if (response.ok && response.status !== 400) {
        const data = await response.json();

        // Display the fetched meals
        displayMeals(data.meals.slice(0, 20));

        // Hide inner loading screen
        $(".inner-loading-screen").fadeOut(300);
    }
}

// Function to fetch ingredients data
async function getIngredients() {
    // Clear data container, show inner loading screen and clear search container
    Data.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";

    // Fetch ingredients data from the API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);

    
    if (response.ok && response.status !== 400) {
        const data = await response.json();

        // Display ingredients data using the fetched data
        displayIngredients(data.meals.slice(0, 20));

        // Hide inner loading screen
        $(".inner-loading-screen").fadeOut(300);
    }
}

// Function to display ingredients data
function displayIngredients(arr) {
    let Ingredients = "";

    // Loop through the ingredients array and create HTML for each ingredient
    for (let i = 0; i < arr.length; i++) {
        Ingredients += `
            <div class="col-md-3">
                <div onclick="getIngredientsMeal('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${arr[i].strIngredient}</h3>
                    <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        `;
    }

    // Set the generated HTML to the Data container
    Data.innerHTML = Ingredients;
}

// Function to fetch meals based on the chosen ingredient
async function getIngredientsMeal(ingredients) {
    // Clear data container, show inner loading screen and clear search container
    Data.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";

    // Fetch meals data based on the selected ingredient from the API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);

    
    if (response.ok && response.status !== 400) {
        const data = await response.json();

        // Display the fetched meals
        displayMeals(data.meals.slice(0, 20));

        // Hide inner loading screen
        $(".inner-loading-screen").fadeOut(300);
    }
}

// Function to fetch meal details based on the chosen meal ID
async function getMealDetails(mealID) {
    // Clear data container, show inner loading screen
    Data.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    // Fetch meal details based on the selected meal ID from the API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);

    
    if (response.ok && response.status !== 400) {
        const data = await response.json();

        // Display meal details using the fetched data
        displayMealDetails(data.meals[0]);

        // Hide inner loading screen
        $(".inner-loading-screen").fadeOut(300);
    }
}

// Function to display meal details
function displayMealDetails(meal) {
    // Close side navigation and clear search container
    closeSideNav();
    searchContainer.innerHTML = "";

    // Generate HTML for meal details including ingredients, tags, and other details
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags?.split(",") ?? [];
    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }

    let details = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
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
            <a href="${meal.strSource}" class="btn btn-success">Source</a>
            <a href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>
    `;

    // Set the generated HTML to the Data container
    Data.innerHTML = details;
}

// Function to show search inputs for name or first letter search
function showSearchInputs() {
    // Close side navigation and generate HTML for search inputs
    closeSideNav();
    searchContainer.innerHTML = `
        <div class="row py-4">
            <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
            </div>
        </div>
    `;

    // Clear data container
    Data.innerHTML = "";
}

// Function to fetch meals based on the search term (name)
async function searchByName(term) {
    // Clear data container, show inner loading screen, close side navigation
    Data.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    closeSideNav();

    // Fetch meals based on the search term (name) from the API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);

    
    if (response.ok && response.status !== 400) {
        const data = await response.json();

        // Display the fetched meals or an empty array if no results
        data.meals ? displayMeals(data.meals) : displayMeals([]);

        // Hide inner loading screen
        $(".inner-loading-screen").fadeOut(300);
    }
}

// Function to fetch meals based on the search term (first letter)
async function searchByFirstLetter(term) {
    // Close side navigation, clear data container, show inner loading screen
    closeSideNav();
    Data.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    // Set default term if empty
    term == "" ? term = "a" : "";

    // Fetch meals based on the search term (first letter) from the API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);

    
    if (response.ok && response.status !== 400) {
        const data = await response.json();

        // Display the fetched meals or an empty array if no results
        data.meals ? displayMeals(data.meals) : displayMeals([]);

        // Hide inner loading screen
        $(".inner-loading-screen").fadeOut(300);
    }
}

// Function to display contact form
function showContacts() {
    // Clear search container and set HTML for contact form in data container
    searchContainer.innerHTML = "";
    Data.innerHTML = `
        <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
            <div class="container w-75 text-center">
                <div class="row g-4">
                    <div class="col-md-6">
                        <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Special characters and numbers not allowed
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Email not valid *exemple@yyy.zzz
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid Phone Number
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid age
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid password *Minimum eight characters, at least one letter and one number:*
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid repassword 
                        </div>
                    </div>
                </div>
                <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
            </div>
        </div>
    `;

    // Enable/disable submit button based on input validations
    submitBtn = document.getElementById("submitBtn");
    document.getElementById("nameInput").addEventListener("focus", () => { nameInputDone = true });
    document.getElementById("emailInput").addEventListener("focus", () => { emailInputDone = true });
    document.getElementById("phoneInput").addEventListener("focus", () => { phoneInputDone = true });
    document.getElementById("ageInput").addEventListener("focus", () => { ageInputDone = true });
    document.getElementById("passwordInput").addEventListener("focus", () => { passwordInputDone = true });
    document.getElementById("repasswordInput").addEventListener("focus", () => { repasswordInputDone = true });
}

// Function to validate all input fields
function inputsValidation() {
    // Validate each input field based on its corresponding validation function
    if (nameInputDone) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block");
        }
    }
    if (emailInputDone) {
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
        }
    }
    if (phoneInputDone) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
        }
    }
    if (ageInputDone) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block");
        }
    }
    if (passwordInputDone) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
        }
    }
    if (repasswordInputDone) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
        }
    }

    // Enable/disable submit button based on all input validations
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

// Regular expression functions for input validations
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value));
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value));
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value));
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value));
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value));
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value;
}
