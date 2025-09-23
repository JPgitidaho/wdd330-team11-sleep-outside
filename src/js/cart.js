import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const listElement = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    listElement.innerHTML = "<li>Your cart is empty</li>";
    return;
  }

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  listElement.innerHTML = htmlItems.join("");

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice) * (item.quantity || 1),
    0,
  );
  listElement.innerHTML += `<li class="cart-total">Total: $${total.toFixed(2)}</li>`;

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      removeItem(index);
    });
  });
}

function cartItemTemplate(item, index) {
  const imageUrl =
    item.Images?.PrimarySmall ?? item.Images?.PrimaryMedium ?? "";
  return `
    <li class="cart-card divider">
      <a href="/product_pages/index.html?product=${item.Id}&category=${item.Category}">
        <img src="${imageUrl}" alt="${item.Name}" class="cart-card__image" />
      </a>
      <h2 class="card__name">
        <a href="/product_pages/index.html?product=${item.Id}&category=${item.Category}">${item.Name}</a>
      </h2>
      <p class="cart-card__quantity">Qty: ${item.quantity || 1}</p>
      <p class="cart-card__price">Price: $${item.FinalPrice}</p>
      <p class="cart-card__subtotal">Subtotal: $${(Number(item.FinalPrice) * (item.quantity || 1)).toFixed(2)}</p>
      <button class="remove-item" data-index="${index}">❌</button>
    </li>`;
}

function removeItem(index) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

renderCartContents();
