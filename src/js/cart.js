import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Images?.PrimarySmall || item.Images?.PrimaryLarge || "/images/placeholder.png"}" alt="${item.Name}">
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
      <p class="cart-card__price">$${item.ListPrice}</p>
    </li>
  `;
}

function renderCartContents() {
  const cartElement = document.querySelector("#cart-list");
  const cart = getLocalStorage("so-cart") || [];

  if (cart.length === 0) {
    cartElement.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cart.map(cartItemTemplate);
  cartElement.innerHTML = htmlItems.join("");
}

renderCartContents();
