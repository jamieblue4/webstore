function openNav() {
    document.getElementById("navSidepanel").style.width = "250px";
}

function closeNav() {
    document.getElementById("navSidepanel").style.width = "0";
}

// open cart on click and hide accordingly
function openCart() {
    var cart = document.querySelector('.cart');
    if (cart.style.display === "none") {
        cart.style.display = "block";
    } else {
        cart.style.display = "none";
    }
}

// cart logic
var itemsInCart = document.getElementById("yourCartButton");
var shop = document.querySelector('.products');
var cartItems = document.querySelector('.cart-items');
var total = document.querySelector('.cart-total');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Products in shop
const product = [
    {
        id: 0,
        name: 'good kid, m.A.A.d city',
        artist: 'Kendrick Lamar',
        price: 19.99,
    },
    {
        id: 1,
        name: 'Currents',
        artist: 'Tame Impala',
        price: 14.99,
    },
    {
        id: 2,
        name: 'The Intersteallar Tennis Championship',
        artist: 'Carter Vail',
        price: 19.99,
    },
    {
        id: 3,
        name: 'Infinity On High',
        artist: 'Fall Out Boy',
        price: 14.99,
    }
];

// empty cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// Add to cart
function addToCart(id) {
    // see if item is already in cart
    if(cart.some((item) => item.id === id)){
        changeNumberOfUnits("plus", id);
    } else {
        const item = product.find((product) => product.id === id);

        cart.push({
            ...item,
            numberOfUnits: 1,
        });
      }
      updateCart();
    }

// update cart
function updateCart() {
    renderCartItems();
    renderTotal();

    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}


// calculate and render subtotal
function renderTotal() {
    let totalPrice = 0; totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    total.innerHTML = `
    Total: $${totalPrice.toFixed(2)}
    (Items: ${totalItems})
    `
    itemsInCart.innerHTML = `Cart (${totalItems})`;
}

// render cart items
function renderCartItems() {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
        cartItems.innerHTML += `
            <div class="cart-content" style="padding:1rem; display:inline;">
            <h4 class="cart-name" onclick="removeItemFromCart(${item.id})">
            Item: 
            ${item.name}
            </h4>
            <h4 class="cart-artist>
            Artist:
            ${item.artist}
            </h4>
            <h4 class="cart-price" onclick="removeItemFromCart(${item.id})">
            Price: 
            ${item.price}
            </h6>
            <div class="quantity" style="display: inline; text-align: center;">
            Quantity
            <button type="button" id="btn-plus" style="display: inline; margin: auto;" onclick="changeNumberOfUnits('plus', ${item.id})">+</button>
            ${item.numberOfUnits}
            <button type="button" id="btn-minus" style="display: inline; margin: auto;" onclick="changeNumberOfUnits('minus', ${item.id})">-</button>
            </div>
            <button type="button" class="remove-button style="display: inline; margin: auto; border-radius: 0.75em;" id="removeButton" onclick="removeItemFromCart(${item.id})">Remove</button>
        </div>
            `;
    }
    );
}

// change number of units function
function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {

        let numberOfUnits = item.numberOfUnits;

        if(item.id === id) {
            if(action === "minus") {
                numberOfUnits--;
            } else if(action === "plus") {
                numberOfUnits++;
            }
        }
        return {
            ...item,
            numberOfUnits,
        };
    });

    updateCart();
}

// remove item from cart
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);

    updateCart();
}

// clear cart contents

let clearCart = document.getElementById('clearCartButton');

clearCart.onclick = function clearCart() {
    cart.length = 0;
    
    updateCart();
}

let checkoutButton = document.getElementById('checkoutButton');

checkoutButton.onclick = function clearCart() {
    cart.length = 0;
    alert('Thank you for your purchase!');

    updateCart();
}