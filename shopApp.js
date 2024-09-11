import { items } from "./items.js";
//console.log('items', items.map(item => item.id)) // zwraca tylko name

const elName = ["coffeeList", "teaList", "mugsList", "accessoriesList", "coffeeProduct", "teaProduct", "mugsProduct","accessoriesProduct"];
const idName = ["coffee-li", "tea-li", "mugs-li", "accessories-li", "coffee-product", "tea-product", "mugs-product", "accessories-product"];
const elements = {}; //store references to DOM elements from above arrays

let defaultProductTxt = document.getElementById("default-product");
let sortWrapper = document.querySelector(".sort-wrapper");

for (let i = 0; i<idName.length; i++) {
    elements[elName[i]] = document.getElementById(idName[i]);
}

//reset all elements classes
function resetClassAll () {
    for (let i = 0; i < 4; i++) { //first 4 are list elements
        elements[elName[i]].classList.remove("shown"); //ex. elements[0] = coffeeList
    }

    for (let i = 4; i<elName.length; i++) { // another 4 are product elements
        elements[elName[i]].classList.add("hidden");
    }
};

//sort elements
let sortSelect = document.getElementById("sortSelect");

function sortProducts (product, type) {
    switch(type) {
        case "price-asc":
            return product.sort((a,b) => a.price - b.price);
        case "price-desc":
            return product.sort((a,b) => b.price - a.price);
        case "name-asc":
            return product.sort((a,b) => a.name.localeCompare(b.name));
        case "name-desc":
            return product.sort((a,b) => b.name.localeCompare(a.name));
        default:
            return product;
    };
};

sortSelect.addEventListener("change", () => {
    //first elements active (and seen) which doesn't have .hidden class / replace() deletes -product txt so active category (ex.coffee) is displayed
    const activeCategory = document.querySelector(".product-wrapper > div:not(.hidden)").id.replace("-product", "");
    renderProducts(activeCategory); // after changing sort, display elements again
});

//search input
const searchInput = document.getElementById("search");
const searchWrapper = document.querySelector(".search-wrapper");

searchInput.addEventListener("input", function() {
    const searchTxt = this.value.toLowerCase(); // text written in search input
    const activeCategory = document.querySelector(".product-wrapper > div:not(.hidden)").id.replace("-product", "");

    const searchProducts = document.querySelectorAll(`#${activeCategory}-product .product`);

    searchProducts.forEach(searchProduct => {
        const productName = searchProduct.querySelector("h4").innerText.toLowerCase();
        if (productName.includes(searchTxt)) {
            searchProduct.classList.remove("hidden");
        } else {
            searchProduct.classList.add("hidden");
        }
    });
});

//render products in proper div
function renderProducts(category) {
    const productContent = document.getElementById(`${category}-product`);
    productContent.innerHTML = ""; // clearing other product div

    let filteredProducts = items.filter(item => item.category === category); // elements which matches category ex. only coffee products
    
    const selectedSort = sortSelect.value;
    filteredProducts = sortProducts(filteredProducts,selectedSort);

    filteredProducts.forEach(item => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        // extra-info depending on product category
        let extraInfo = "";
        if (category === "coffee" || category === "tea") {
            extraInfo = `<span>${item.weight}</span>`;
        } else if (category === "mugs") {
            extraInfo = `<span>${item.capacity}</span>`;
        }
        else if (category === "accessories") {
            extraInfo = `<span>${item.unit}</span>`;
        }

        // creating proper div element
        productDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <div class="stars">
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <span title="Reviews">(${item.reviews})</span>
                    </div>
                    <h4>${item.name}</h4>
                    <div class="extra-info">
                        ${extraInfo}
                        <p>${item.price.toFixed(2)} $</p>
                    </div>
                    <div class="cart-wrapper">
                        <i class="ri-shopping-cart-line cart-icon" title="Add to cart"></i>
                    </div>
        `;
        productContent.appendChild(productDiv);

        const imgEl = productDiv.querySelector("img");
        imgEl.addEventListener("click", () => {
            alert("Ups, nothing more to see here, work in progress ;-)");
        });
        
    });
};


//change display
function displayEl (activeList, activeProduct, activeCategory) {
    resetClassAll();
    sortSelect.selectedIndex = 0; // default select value when changing category
    defaultProductTxt.classList.add("hidden");
    sortWrapper.classList.remove("hidden");
    searchWrapper.classList.remove("hidden");
    elements[activeList].classList.add("shown");
    elements[activeProduct].classList.remove("hidden");
    renderProducts(activeCategory);
};

// () => {} is like a "wrapper" so the displayEl( function can be called properly (not instantly on click))
elements.coffeeList.addEventListener("click", () => displayEl("coffeeList", "coffeeProduct","coffee"));
elements.teaList.addEventListener("click", () => displayEl("teaList", "teaProduct", "tea"));
elements.mugsList.addEventListener("click",() => displayEl("mugsList", "mugsProduct", "mugs"));
elements.accessoriesList.addEventListener("click",() => displayEl("accessoriesList", "accessoriesProduct", "accessories")); 

// shopping cart
