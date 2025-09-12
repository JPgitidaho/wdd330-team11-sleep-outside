import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector("#product-detail");
const product = new ProductDetails("tents", dataSource, element);

product.init();
