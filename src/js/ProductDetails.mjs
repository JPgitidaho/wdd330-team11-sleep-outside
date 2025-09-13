import ProductData from './ProductData.mjs';

function getIdFromUrl() {
  return new URLSearchParams(window.location.search).get('id');
}

function renderProduct(product) {
  const template = document.querySelector('template.product-detail');
  const container = document.querySelector('main.divider');
  
  if (!product) return container.innerHTML = '<p>Product not found.</p>';
  const clone = template.content.cloneNode(true);
  const [h3, h2, img, p1, p2, p3] = clone.querySelectorAll('h3, h2, img, p, p, p');
  if (h3) h3.textContent = product?.Brand?.Name ?? '';
  if (h2) h2.textContent = product.Name ?? product.Title ?? '';
  if (img) { img.src = product.Image ?? product.image ?? ''; img.alt = product.Name ?? ''; }
  if (p1) p1.textContent = product.Description ?? '';
  if (p2) p2.textContent = product.SuggestedRetailPrice ?? product.price ?? '';
  if (p3) p3.textContent = product.FinalPrice ?? '';

  // Button
  const addToCartBtn = clone.querySelector('#addToCart');
  if (addToCartBtn) {
    addToCartBtn.dataset.id = product.Id ?? product.id ?? '';
    addToCartBtn.addEventListener('click', () => {
      let cart = JSON.parse(localStorage.getItem('so-cart')) || [];
      cart.push(product);
      localStorage.setItem('so-cart', JSON.stringify(cart));
      alert('Product added to cart');
    });
  }

  container.innerHTML = '';
  container.appendChild(clone);
}

(async function () {
  const data = await new ProductData('tents').getData();
  const id = getIdFromUrl();
  let product = null;
  if (Array.isArray(data)) product = data.find(item => String(item.Id ?? item.id) === String(id));
  else if (data && typeof data === 'object') product = data[String(id)] ?? null;
  renderProduct(product);
})();