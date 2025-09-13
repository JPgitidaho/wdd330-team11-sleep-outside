import { getParam, setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();
//
function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
//
