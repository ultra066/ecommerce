// Static credentials
const STATIC_USERNAME = "guest";
const STATIC_PASSWORD = "123123";

// Attach event listener to the form
document.getElementById("loginForm")?.addEventListener("submit", validateLogin);

function validateLogin(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    // Get user input
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate credentials
    if (username === STATIC_USERNAME && password === STATIC_PASSWORD) {
        alert(`Welcome, ${username}! Login successful.`);
        // Redirect to index.html
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

// Function to add product to cart
function addToCart(productName, productImage, productPrice) {
    const product = {
        name: productName,
        image: productImage,
        price: productPrice,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to your cart!`);
}

// Function to display cart items on the cart page
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTableBody = document.querySelector("#cart tbody");

    cartTableBody.innerHTML = "";

    cart.forEach((product, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
            <td><img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;"></td>
            <td>${product.name}</td>
            <td>₱${product.price.toFixed(2)}</td>
            <td>
                <input type="number" min="1" value="${product.quantity}" onchange="updateQuantity(${index}, this.value)" />
            </td>
            <td>₱${(product.price * product.quantity).toFixed(2)}</td>
        `;

        cartTableBody.appendChild(row);
    });

    updateCartTotal();
}

// Function to update the cart total
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    document.querySelector("#subTotal table td:nth-child(1)").textContent = `₱${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Function to update the quantity of a product
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (quantity < 1) {
        removeFromCart(index);
    } else {
        cart[index].quantity = parseInt(quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

// Automatically display cart items if on the cart page
if (window.location.pathname.includes("cart.html")) {
    displayCartItems();
}

// Function to transfer cart items to Purchase History
function transferToPurchaseHistory() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const currentDate = new Date().toLocaleString(); // Get the current date and time

    cart.forEach((product) => {
        purchaseHistory.push({
            ...product,
            date: currentDate,
            status: "Completed",
        });
    });

    localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
    localStorage.removeItem("cart"); // Clear the cart after transferring
}

document.addEventListener("DOMContentLoaded", () => {
    const confirmCheckout = document.getElementById("confirmCheckout");

    confirmCheckout?.addEventListener("click", () => {
        alert("Thank you for your purchase! Your order has been confirmed.");
        transferToPurchaseHistory(); // Transfer cart items to Purchase History

        setTimeout(() => {
            // Redirect to Purchase History page
            window.location.href = "purchases.html";
        }, 100); // Add delay to ensure storage is complete
    });
});

// Function to display purchase history on the Purchase History page
function displayPurchaseHistory() {
    const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const purchasesTableBody = document.querySelector("#purchases tbody");

    purchasesTableBody.innerHTML = ""; // Clear existing table rows

    purchaseHistory.forEach((item) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" /></td>
            <td>${item.name}</td>
            <td>₱${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>${item.date}</td>
            <td>${item.status}</td>
        `;

        purchasesTableBody.appendChild(row);
    });
}

// Automatically display Purchase History when on the purchases page
if (window.location.pathname.includes("purchases.html")) {
    document.addEventListener("DOMContentLoaded", displayPurchaseHistory);
}

document.addEventListener("DOMContentLoaded", () => {
    const checkoutBtn = document.getElementById("checkoutBtn");
    const modal = document.getElementById("checkoutModal");
    const closeModal = document.getElementById("closeModal");
    const confirmCheckout = document.getElementById("confirmCheckout");
    const cancelCheckout = document.getElementById("cancelCheckout");

    checkoutBtn?.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    confirmCheckout?.addEventListener("click", () => {
        alert("Thank you for your purchase! Your order has been confirmed.");
        transferToPurchaseHistory(); // Transfer cart items to Purchase History
        modal.style.display = "none";

        setTimeout(() => {
            // Redirect to Purchase History page
            window.location.href = "purchases.html";
        }, 100); // Add delay to ensure storage is complete
    });

    cancelCheckout?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
