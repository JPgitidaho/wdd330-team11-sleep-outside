import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `
    <section class="product-detail">
      <img src="${product.Images.PrimaryLarge}" alt="${product.Name}">
      <h2>${product.Name}</h2>
      <p class="price">$${product.ListPrice}</p>
      <p>${product.DescriptionHtmlSimple}</p>
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </section>
  `;
}

export default class ProductDetails {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = element;
  }

  async init() {
    const productId = getParam("product");
    const product = await this.dataSource.findProductById(productId);
    this.renderProductDetails(product);
    this.addToCartHandler(product);
  }

  renderProductDetails(product) {
    this.element.innerHTML = productDetailsTemplate(product);
  }

  addToCartHandler(product) {
    const button = document.querySelector("#addToCart");
    button.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
      const idx = cart.findIndex((i) => i.Id === product.Id);
      if (idx >= 0) {
        cart[idx].quantity = (cart[idx].quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("so-cart", JSON.stringify(cart));
    });
  }
}
