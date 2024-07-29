document.addEventListener("DOMContentLoaded", function() {
    const cart = [];
    const buttons = document.querySelectorAll(".add-to-cart");
    const cartItemsContainer = document.querySelector(".cart-items");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const itemName = this.getAttribute("data-name");
            const itemPrice = parseFloat(this.getAttribute("data-price"));
            addToCart(itemName, itemPrice);
        });
    });

    function addToCart(name, price) {
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCartItems();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = "";
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <p>${item.name} (x${item.quantity})</p>
                <p>₹${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-button" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        const removeButtons = document.querySelectorAll(".remove-button");
        removeButtons.forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                renderCartItems();
            });
        });
    }

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", function() {
        const query = searchInput.value.toLowerCase();
        const sections = document.querySelectorAll("h2.section-title");

        let found = false;
        sections.forEach(section => {
            if (section.innerText.toLowerCase().includes(query)) {
                section.scrollIntoView({ behavior: "smooth" });
                found = true;
            }
        });

        if (!found) {
            alert("Section not found. Please try a different keyword.");
        }
    });
});
