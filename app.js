let menu = document.getElementById("menu-icon");
let navListUl = document.getElementById("ul-menu");

function changeMenuIcon() {
    menu.classList.toggle("ri-menu-5-line");
    menu.classList.toggle("ri-close-large-line");
    navListUl.classList.toggle("nav-open");
};
