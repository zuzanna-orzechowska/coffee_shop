// changing menu icon
let menu = document.getElementById("menu-icon");
let navListUl = document.getElementById("ul-menu");

function changeMenuIcon() {
    menu.classList.toggle("ri-menu-5-line");
    menu.classList.toggle("ri-close-large-line");
    navListUl.classList.toggle("nav-open");
};



// resizing image - slider (so img will take whole space of div element)
document.addEventListener('DOMContentLoaded', function() { //when website is fully loaded
    const swiperSlides = document.querySelectorAll('.swiper-slide'); //NodeList
    
    function resizeImages() {
        swiperSlides.forEach(slide => { //slide is single element in div ".swiper-slide"
            const img = slide.querySelector('img');
            if (img) {
                img.style.height = slide.clientHeight + 'px'; //height of an element in pixels, including padding, but not the border, scrollbar or margin
            }
        });
    }

    resizeImages();

    //when changing the width of the website
    window.addEventListener('resize', resizeImages);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        //console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        };
    });
});

const hiddenEl = document.querySelectorAll(".hidden");

hiddenEl.forEach((el) => observer.observe(el));

//menu.html - changing menu content
let contentName = document.querySelector(".content-name");
let menuNewContent = document.querySelector(".menu-new-content");

//coffee
let firstIcon = document.getElementById("first-icon");
let menuCoffeeContent = document.querySelector(".menu-coffee-content");
//dessert
let secondIcon = document.getElementById("second-icon");
let menuDessertContent = document.querySelector(".menu-dessert-content");
//drinks
let thirdIcon = document.getElementById("third-icon");
let menuDrinksContent = document.querySelector(".menu-drinks-content");

//coffee
firstIcon.addEventListener("click", displayCoffeeContent);
function displayCoffeeContent () {
    menuCoffeeContent.classList.remove("menu-hidden");
    menuDessertContent.classList.add("menu-hidden");
    menuNewContent.classList.add("menu-hidden");
    menuDrinksContent.classList.add("menu-hidden");

    firstIcon.classList.add("icons-show");
    secondIcon.classList.remove("icons-show");
    thirdIcon.classList.remove("icons-show");

    contentName.innerText = "Coffee";
};

//dessert
secondIcon.addEventListener("click", displayDessertContent);
function displayDessertContent () {
    menuDessertContent.classList.remove("menu-hidden");
    menuNewContent.classList.add("menu-hidden");
    menuCoffeeContent.classList.add("menu-hidden");
    menuDrinksContent.classList.add("menu-hidden");

    firstIcon.classList.remove("icons-show");
    secondIcon.classList.add("icons-show");
    thirdIcon.classList.remove("icons-show");

    contentName.innerText = "Dessert";
}

//drinks
thirdIcon.addEventListener("click", displayDrinksContent);
function displayDrinksContent () {
    menuDrinksContent.classList.remove("menu-hidden");
    menuNewContent.classList.add("menu-hidden");
    menuCoffeeContent.classList.add("menu-hidden");
    menuDessertContent.classList.add("menu-hidden");

    firstIcon.classList.remove("icons-show");
    secondIcon.classList.remove("icons-show");
    thirdIcon.classList.add("icons-show");

    contentName.innerText = "Drinks";
}