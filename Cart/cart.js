const unitPrice = 51999;
let quantity = 1;

const unitPriceElement = document.getElementById("unit-price");
const quantityElement = document.getElementById("quantity");
const totalPriceElement = document.getElementById("total-price");

document.getElementById("increase-btn").addEventListener("click", () => {
  quantity += 1;
  updateQuantity();
});

document.getElementById("decrease-btn").addEventListener("click", () => {
  if (quantity > 1) {
    quantity -= 1;
    updateQuantity();
  }
});

function updateQuantity() {
  quantityElement.textContent = quantity;
  const totalPrice = (unitPrice * quantity).toFixed(2);
  totalPriceElement.textContent = totalPrice;
}
