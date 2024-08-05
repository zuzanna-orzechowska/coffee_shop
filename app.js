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

//scroll animation -> yt https://youtu.be/T33NN_pPeNI?si=EdLCjHGy0Yx60CrS
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

const hiddenEl = document.querySelectorAll(".hidden");

hiddenEl.forEach((el) => observer.observe(el));