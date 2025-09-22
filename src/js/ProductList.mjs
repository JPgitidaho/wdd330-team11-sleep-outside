import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images?.PrimaryMedium ?? product.Images?.PrimaryLarge ?? ""}" alt="${product.Name}">
        <h3>${product.Brand?.Name ?? ""}</h3>
        <h2>${product.Name}</h2>
        <p class="price">$${product.FinalPrice ?? ""}</p>
      </a>
      <button class="addToCart" data-id="${product.Id}">Add to Cart</button>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const data = await this.dataSource.getData(this.category);
    this.renderList(data);
    this.addToCartHandler(data);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }

  addToCartHandler(data) {
    this.listElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".addToCart");
      if (!btn) return;
      const id = btn.dataset.id;
      const product = data.find((item) => item.Id === id);
      if (!product) return;

      let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
      const idx = cart.findIndex((i) => i.Id === id);
      if (idx >= 0) {
        cart[idx].quantity = (cart[idx].quantity || 1) + 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      localStorage.setItem("so-cart", JSON.stringify(cart));
    });
  }
}
