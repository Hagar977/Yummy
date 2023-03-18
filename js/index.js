/// <reference types="../@types/jquery" />

let data = document.querySelector("#data")
// let search = document.querySelector("#search")
// let Category = document.querySelector("#Category")
// let area = document.querySelector("#area")
// let ingredients = document.querySelector("#ingredients")
// let contact = document.querySelector("#contact")




$(document).ready(function(){
    $(".loading-screen").fadeOut(500)
    $("body").css("overflow", "auto")
})



let sideNavPosition = $(".nav-tab").innerWidth();
$(".side-nav").animate({left : -sideNavPosition},500);

$(".side-nav .nav-header i").click(function(){
    console.log("hi" , $(".side-nav").css("left"));
    console.log(sideNavPosition);
    if ($(".side-nav").css("left") == "0px") {
        $(".side-nav").animate({ left : -sideNavPosition},500);
    } else {
        $(".side-nav").animate({left : "0px"},500)
    }
})



// https://www.themealdb.com/api/json/v1/1/categories.php 
// https://www.themealdb.com/api/json/v1/1/list.php?a=list 
// https://www.themealdb.com/api/json/v1/1/list.php?i=list



// SECTION main meal

async function getMainMeal(){
    $(".loading-screen").fadeIn(1)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    api = await api.json();
    // console.log(api.meals);
    displayMainMeal(api.meals)
    $(".loading-screen").fadeOut(4000)
    $(".side-nav").animate({left : -sideNavPosition},500);
}
getMainMeal()

function displayMainMeal(atrr){
    let cartona =``
    for (var i = 0; i < atrr.length; i++){
        cartona+= `<div class="col-md-3">
        <div onclick="getMealDetails('${atrr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
            <img src="${atrr[i].strMealThumb}" class="w-100" alt="">
            <div class="layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${atrr[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }
    
    document.getElementById("data").innerHTML = cartona;
    // console.log(cartona);
}






// SECTION search

    // let search = document.querySelector("#search")

    // search.addEventListener("click",function(e){
    //     console.log(e.target);
    //     let code = e.target.getAttribute("data-code")
    //     console.log(code);
    //     displaySearch()
    // })
    
    
    // function displaySearch(items){
    //     // $(".loading-screen").fadeIn(1)
    
    //     let cartona =``
    //         cartona += `<div class="col-md-6">
    //         <input onkeyup="searchByName(this.value)" type="text" placeholder="Search By Name" class="form-control bg-transparent text-white">
    //     </div>
    //     <div class="col-md-6">
    //         <input  onkeyup="searchByFLetter(this.value)" type="text" placeholder="Search By First Letter" class="form-control bg-transparent text-white">
    //     </div>`
    //     document.getElementById("data").innerHTML = cartona;
    //     $(".side-nav").animate({left : -sideNavPosition},500);
    //     console.log(cartona);
    //     }

     


// SECTION category


// let items = []
let Category = document.querySelector("#Category")

    Category.addEventListener("click",function(e){
        console.log(e.target);
        let code = e.target.getAttribute("data-code")
        console.log(code);
        getCategoryData(code)
    })

async function getCategoryData(code){
    $(".loading-screen").fadeIn(1)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    api = await api.json();
    console.log(api.categories);
    displayCategory(api.categories)
    $(".loading-screen").fadeOut(500)
    $(".side-nav").animate({left : -sideNavPosition},500);
}


function displayCategory(items){
    let cartona =``
    for (var i = 0; i < items.length; i++){
        cartona+= `<div class="col-md-3">
        <div onclick="getCategoryMeals('${items[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2">
            <img src="${items[i].strCategoryThumb}" class="w-100" alt="">
            <div class="layer position-absolute text-center text-black p-2">
                <h3>${items[i].strCategory}</h3>
                <p>${items[i].strCategoryDescription}</p>
            </div>
        </div>
    </div>`
    }
    document.getElementById("data").innerHTML = cartona;
    console.log(cartona);
}



//  SECTION area


let area = document.querySelector("#area")

area.addEventListener("click",function(e){
        console.log(e.target);
        let code = e.target.getAttribute("data-code")
        console.log(code);
        getareaData(code)
    })

async function getareaData(code){
    $(".loading-screen").fadeIn(1)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list `);
    api = await api.json();
    console.log(api.meals);
    displayarea(api.meals)
    $(".loading-screen").fadeOut(500)
    $(".side-nav").animate({left : -sideNavPosition},500);
}


function displayarea(items){
    let cartona =``
    for (var i = 0; i < items.length; i++){
        cartona+= `<div class="col-md-3">
        <div onclick="getAreaMeals('${items[i].strArea}')" class="text-center">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${items[i].strArea}</h3>
        </div>
        </div>`
    }
    document.getElementById("data").innerHTML = cartona;
    console.log(cartona);
}




// SECTION ingredients

let ingredient = document.querySelector("#ingredients")

ingredient.addEventListener("click",function(e){
    console.log(e.target);
    let code = e.target.getAttribute("data-code")
    console.log(code);
    getIngredientData(code)
})

async function getIngredientData(code){
$(".loading-screen").fadeIn(1)
let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
api = await api.json();
console.log(api.meals);
displayIngredient(api.meals.slice(0,20))
$(".loading-screen").fadeOut(500)
$(".side-nav").animate({left : -sideNavPosition},500);
}


function displayIngredient(items){
let cartona =``
for (var i = 0; i < items.length; i++){
    cartona+= `<div class="col-md-3">
    <div onclick="getIngredientsMeals('${items[i].strIngredient}')" class="rounded-2 text-center">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${items[i].strIngredient}</h3>
        <p>${items[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>
</div>`
}
document.getElementById("data").innerHTML = cartona;
console.log(cartona);
}


// SECTION contact

let contact = document.querySelector("#contact")

contact.addEventListener("click",function(e){
    console.log(e.target);
    let code = e.target.getAttribute("data-code")
    console.log(code);
    displaycontact()
})


function displaycontact(items){
    $(".loading-screen").fadeIn(1)

    let cartona =``
        cartona += `<div class="contact d-flex align-items-center justify-content-center">
    <div class="contain w-75 m-auto text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input onkeyup="validateName()" id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Special characters and numbers not allowed</p>
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="validateEmail()" id="emailInput" type="email" class="form-control" placeholder="Enter Your E-mail">
                <div id="emailAlert" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Email not valid *exemple@yyy.zzz</p>
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="validatePhone()" id="phoneInput" type="number" class="form-control" placeholder="Enter Your phone">
                <div id="phoneAlert" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Enter valid phone number</p>
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="validateAge()" id="ageInput" type="number" class="form-control" placeholder="Enter Your age">
                <div id="ageAlert" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Enter valid age</p>
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="validatepass()" id="passwordInput" type="password" class="form-control" placeholder="Enter Your password">
                <div id="passwordAlert" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Enter valid password *Minimum eight characters, at least one letter and one number</p>
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="validateRePassword()" id="repasswordInput" type="password" class="form-control" placeholder="Repassword">
                <div id="repasswordIn" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Enter valid repassword</p>
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>

    </div>
</div>`

    document.getElementById("data").innerHTML = cartona;
    $(".loading-screen").fadeOut(500)
    $(".side-nav").animate({left : -sideNavPosition},500);
    console.log(cartona);
    }




    async function getMealDetails(id){
        $(".loading-screen").fadeIn(1)
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        response = await response.json();
        displayMealDetails(response.meals[0])
        console.log(response.meals);
        $(".loading-screen").fadeOut(500)
        $(".side-nav").animate({left : -sideNavPosition},500);
    }

    getMealDetails()

function displayMealDetails(meal) {
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let cart = ''
    for (let i = 0; i < tags.length; i++) {
        cart += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let box = `
               <div class="col-md-4">
                    <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="">
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
                    ${cart}
                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

            document.getElementById("data").innerHTML = box
}




    async function getCategoryMeals(category) {
        $(".loading-screen").fadeIn(1)
    
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        api = await api.json()
    
    
        displayMainMeal(api.meals.slice(0, 20))
        $(".loading-screen").fadeOut(500)
        $(".side-nav").animate({left : -sideNavPosition},500);
    
    }

    async function getAreaMeals(area) {
        $(".loading-screen").fadeIn(1)
    
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        api = await api.json()
    
    
        displayMainMeal(api.meals.slice(0, 20))
        $(".loading-screen").fadeOut(500)
        $(".side-nav").animate({left : -sideNavPosition},500);
    
    }

    async function getIngredientsMeals(ingredients) {
        $(".loading-screen").fadeIn(1)
    
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
        api = await api.json()
    
    
        displayMainMeal(api.meals.slice(0, 20))
        $(".loading-screen").fadeOut(500)
        $(".side-nav").animate({left : -sideNavPosition},500);
    
    }




    // SECTION search

    let searchContainer = document.querySelector("#searchContainer")

    search.addEventListener("click",function(e){
        console.log(e.target);
        let code = e.target.getAttribute("data-code")
        console.log(code);
        showSearchInputs()
    })

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
        $(".side-nav").animate({left : -sideNavPosition},500);
        data.innerHTML = ""
    }
    
    async function searchByName(term) {
        data.innerHTML = ""
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        response = await response.json()
    
        response.meals ? displayMainMeal(response.meals) : displayMainMeal([])
    
    }
    
    async function searchByFLetter(term) {
        data.innerHTML = ""
    
        term == "" ? term = "a" : "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
        response = await response.json()
    
        response.meals ? displayMainMeal(response.meals) : displayMainMeal([])
    
    }
    

    // SECTION name validation


    // let nameInput = document.querySelector("#nameInput")
    // nameInput.addEventListener("keyup", function(e){
    //     validateName()
    // })


    function validateName(){
        let nameInput = document.getElementById("nameInput").value
        console.log(nameInput);
        var regex = /^[a-zA-Z]+$/;
        if (regex.test(nameInput) == true) {
            console.log(true);
            document.getElementById("nameAlert").classList.replace("d-block", "d-none");
            // document.getElementById("submitBtn").disabled = false;
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block");
            document.getElementById("submitBtn").disabled = true;
            console.log(false);
        }
    }


    // SECTION email validation

    
    function validateEmail(){
        let emailInput = document.getElementById("emailInput").value
        console.log(emailInput);
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(emailInput) == true) {
            // return true;
            console.log(true);
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");
            // document.getElementById("submitBtn").disabled = false;
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
            document.getElementById("submitBtn").disabled = true;
            // return false;
            console.log(false);
    
        }
         
    }


    // SECTION phone validation

    function validatePhone(){
        let phoneInput = document.getElementById("phoneInput").value
        console.log(phoneInput);
        var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (regex.test(phoneInput) == true) {
            // return true;
            console.log(true);
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
            // document.getElementById("submitBtn").disabled = false;
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
            document.getElementById("submitBtn").disabled = true;
            // return false;
            console.log(false);
    
        }
         
    }


    // SECTION age validation
  
    function validateAge(){
        let ageInput = document.getElementById("ageInput").value
        console.log(ageInput);
        var regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
        if (regex.test(ageInput)== true) {
            console.log(true);
            document.getElementById("ageAlert").classList.replace("d-block", "d-none");
            // document.getElementById("submitBtn").disabled = false;
        }else {
            document.getElementById("ageAlert").classList.replace("d-none","d-block")
            document.getElementById("submitBtn").disabled = true;
            console.log(false);
        }
         
    }

    // SECTION password validation


    function validatepass(){
        let passwordInput = document.getElementById("passwordInput").value
        console.log(passwordInput);
        var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
        if (regex.test(passwordInput)== true) {
            console.log(true);
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
            // document.getElementById("submitBtn").disabled = false;
        }else {
            document.getElementById("passwordAlert").classList.replace("d-none","d-block")
            document.getElementById("submitBtn").disabled = true;
            console.log(false);
        }
         
    }


    // SECTION repassword validation

    function validateRePassword(){
        let passwordInput = document.getElementById("passwordInput").value

        let repasswordInput = document.getElementById("repasswordInput").value
        console.log(repasswordInput);
        var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
        if (regex.test(repasswordInput)== true) {
            if (repasswordInput == passwordInput ) {
                console.log(true);
            document.getElementById("repasswordIn").classList.replace("d-block", "d-none");
            document.getElementById("submitBtn").disabled = false;
        }
        }
        else {
            document.getElementById("repasswordIn").classList.replace("d-none","d-block")
            document.getElementById("submitBtn").disabled = true;
            console.log(false);
        }
    }






    // function dataInvaled(){
    //     if (validateName() && validateEmail() && validateAge() && validatePhone()
    //      && validatepass() && validateRePassword()) {
    //         document.getElementById("submitBtn").disabled = false;
    //     } else {
    //         document.getElementById("submitBtn").disabled = true;
    //     }
    
    // }
    










   




    






















// function getCategoryData(code){
//     $(".loading-screen").fadeIn(1)
//     var myHttp = new XMLHttpRequest();
  
//     myHttp.open("GET",`https://www.themealdb.com/api/json/v1/1/categories.php`);
    
//     myHttp.send();
    
//     myHttp.addEventListener("readystatechange", function(){
//       if (myHttp.readyState == 4 && myHttp.status == 200) {
//         console.log(JSON.parse(myHttp.response));
//         items = JSON.parse(myHttp.response).categories;
//         console.log(items);
//         displayCategory();
//         $(".loading-screen").fadeOut(1000)
//         $(".side-nav").animate({left : -sideNavPosition},1000);
//       }
//     });
//   }

//  SECTION area



// let area = document.querySelector("#area")

//         area.addEventListener("click",function(e){
//         console.log(e.target);
//         let code = e.target.getAttribute("data-code")
//         console.log(code);
//         getAreaData(code)
//     })



// function getAreaData(code){
//     $(".loading-screen").fadeIn(1)
//     var myHttp = new XMLHttpRequest();
  
//     myHttp.open("GET",`https://www.themealdb.com/api/json/v1/1/list.php?a=list `);
    
//     myHttp.send();
    
//     myHttp.addEventListener("readystatechange", function(){
//       if (myHttp.readyState == 4 && myHttp.status == 200) {
//         console.log(JSON.parse(myHttp.response));
//         items = JSON.parse(myHttp.response).meals;
//         console.log(items);
//         displayArea();
//         $(".loading-screen").fadeOut(1000)
//         $(".side-nav").animate({left : -sideNavPosition},1000);
//       }
//     });
//   }


// function displayArea(){
//     let cartona =``
//     for (var i = 0; i < items.length; i++){
//         cartona+= `<div class="col-md-3">
//         <div class="text-center">
//             <i class="fa-solid fa-house-laptop fa-4x"></i>
//             <h3>${items[i].strArea}</h3>
//         </div>
//     </div>`
//     }
//     document.getElementById("data").innerHTML = cartona;
//     console.log(cartona);
// }


// // SECTION ingredients


// let ingredients = document.querySelector("#ingredients")

// ingredients.addEventListener("click",function(e){
//         console.log(e.target);
//         let code = e.target.getAttribute("data-code")
//         console.log(code);
//         getingredientsData(code)
//     })



// function getingredientsData(code){
//     $(".loading-screen").fadeIn(1)
//     var myHttp = new XMLHttpRequest();
  
//     myHttp.open("GET",`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    
//     myHttp.send();
    
//     myHttp.addEventListener("readystatechange", function(){
//       if (myHttp.readyState == 4 && myHttp.status == 200) {
//         console.log(JSON.parse(myHttp.response));
//         items = JSON.parse(myHttp.response).meals;
//         console.log(items);
//         displayingredients();
//         $(".loading-screen").fadeOut(1000)
//         $(".side-nav").animate({left : -sideNavPosition},1000);
//       }
//     });
//   }


// function displayingredients(){
//     let cartona =``
//     for (var i = 0; i < items.length; i++){
//         cartona+= `<div class="col-md-3">
//         <div class="rounded-2 text-center">
//             <i class="fa-solid fa-drumstick-bite fa-4x"></i>
//             <h3>${items[i].strIngredient}</h3>
//             <p>${items[i].strDescription}</p>
//         </div>
//     </div>`
//     }
//     document.getElementById("data").innerHTML = cartona;
//     console.log(cartona);
// }