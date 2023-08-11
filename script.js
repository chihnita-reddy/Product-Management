// script.js

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartCount = document.querySelector(".cart-count");
const cartItemsContainer = document.querySelector(".cart-items");

let cartItems = [];

addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productName = button.getAttribute("data-product");
        addToCart(productName);
    });
});

function addToCart(productName) {
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name: productName, quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    cartCount.textContent = cartItems.length;

    cartItemsContainer.innerHTML = "";
    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${item.name} - Quantity: ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}
