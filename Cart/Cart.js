let cartData = JSON.parse(localStorage.getItem("cart")) || {};
let cartArr = Object.entries(cartData);
let cartItem = document.querySelector(".cart-items");
let cartSummary = document.querySelector(".cart-summary");

// Function to display all products in the cart
function displayCartProduct(arr) {
  cartItem.innerHTML = ""; // Clear existing items
  arr.forEach(([id, product]) => {
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.id = id;
    div.innerHTML = `
      <div class="item-details">
        <img src="${product.product_img}" alt="${product.product_name}" />
        <div class="item-info">
          <h2>${product.product_name}</h2>
          <h3>${product.description}</h3>
          <p>Size: ${product.size}</p>
        </div>
      </div>
      <div class="item-actions">
        <p>₹<span class="unit-price">${parseInt(product.product_cost.replace("₹", ""))}</span></p>
        <div class="item-quantity">
          <button class="quantity-btn decrease-btn">−</button>
          <span class="quantity">${product.quantity || 1}</span>
          <button class="quantity-btn increase-btn">+</button>
        </div>
        <p>₹<span class="total-price">${parseInt(product.product_cost.replace("₹", "")) * (product.quantity || 1)}</span></p>
        <button class="item-remove">Remove</button>
      </div>
    `;
    cartItem.appendChild(div);
  });

  updateCartSummary();
}

// Update the cart summary section
function updateCartSummary() {
  let total = 0;
  cartArr.forEach(([id, product]) => {
    total += parseInt(product.product_cost.replace("₹", "")) * (product.quantity || 1);
  });

  cartSummary.innerHTML = `
    <h2>Order Summary</h2>
    <div class="summary-item">
      <p>Subtotal</p>
      <p>₹${total}</p>
    </div>
    <div class="summary-item total">
      <p>Total</p>
      <p>₹${total}</p>
    </div>
    <button class="checkout-btn">Checkout</button>
  `;
}

// Event listener for cart interactions
cartItem.addEventListener("click", (e) => {
  const target = e.target;
  const parent = target.closest(".cart-item");
  const id = parent.id;
  const product = cartData[id];

  if (target.classList.contains("increase-btn")) {
    product.quantity = (product.quantity || 1) + 1;
    cartData[id] = product;
    updateLocalStorage();
    displayCartProduct(Object.entries(cartData));
  }

  if (target.classList.contains("decrease-btn")) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      cartData[id] = product;
      updateLocalStorage();
      displayCartProduct(Object.entries(cartData));
    }
  }

  if (target.classList.contains("item-remove")) {
    delete cartData[id];
    updateLocalStorage();
    cartArr = Object.entries(cartData);
    displayCartProduct(cartArr);
  }
});

// Update localStorage with the current cart data
function updateLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cartData));
}

// Initial display of cart items
if (cartArr.length > 0) {
  displayCartProduct(cartArr);
} else {
  cartItem.innerHTML = "<p>Your cart is empty.</p>";
  cartSummary.innerHTML = "";
}


let hamburger=document.querySelector(".hamburger")
let cross=document.querySelector(".side-menu-cross")
let sideMenu=document.querySelector(".side-menu")
hamburger.addEventListener("click",()=>{
    CloseAndOpenSideMenu(true)
})
cross.addEventListener("click",()=>{
    CloseAndOpenSideMenu(false)
})
// side-menu Functionality
function CloseAndOpenSideMenu(bool){
   if(bool) sideMenu.classList.remove("hidden")
   else sideMenu.classList.add("hidden")
}