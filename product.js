document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const cartCount = document.querySelector(".cart-count");
    const totalPriceElement = document.querySelector(".total-price");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-product");
            addToCart(productName);
        });
    });

    function addToCart(productName) {
        // Retrieve cart items from Local Storage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existingItem = cartItems.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name: productName, quantity: 1 });
        }

        // Update Local Storage with new cart items
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        updateCartUI();
        updateTotalPrice();
    }

    function updateCartUI() {
        cartCount.textContent = getCartItemCount();
        displayCartItems();
    }

    function updateTotalPrice() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let totalCost = 0;

        cartItems.forEach(item => {
            const product = getProductByName(item.name);
            totalCost += item.quantity * product.cost;
        });

        totalPriceElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
    }

    function getProductByName(name) {
        // Replace this with your actual product data retrieval logic
        const products = [
            { name: "Curry Leaves", cost: 5.99 },
            { name: "Coriander", cost: 3.49 },
            { name: "Moringa", cost: 6.95 },
            { name: "Mint", cost: 4.25 }
            // Add more products as needed
        ];

        return products.find(product => product.name === name);
    }

    function getCartItemCount() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let totalCount = 0;

        cartItems.forEach(item => {
            totalCount += item.quantity;
        });

        return totalCount;
    }

    function displayCartItems() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartItemsContainer = document.querySelector(".cart-items");
        cartItemsContainer.innerHTML = "";

        cartItems.forEach(item => {
            const product = getProductByName(item.name);
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} - Quantity: ${item.quantity} - Subtotal: $${(item.quantity * product.cost).toFixed(2)}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Initial update of cart UI and total price
    updateCartUI();
    updateTotalPrice();
});


document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${item.name} - Quantity: ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
});