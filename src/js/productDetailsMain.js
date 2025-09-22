import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
const dataSource = new ProductData();
const element = document.querySelector("main.divider");

const product = new ProductDetails(productId, dataSource, element);
product.init();
