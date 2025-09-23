const baseURL =
  import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";

async function convertToJson(res) {
  if (!res.ok) {
    throw new Error(`Bad Response: ${res.status}`);
  }
  return await res.json();
}

export default class ProductData {
  async getData(category) {
    const url = `${baseURL.replace(/\/$/, "")}/products/search/${category}`;
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id, category = "tents") {
    const products = await this.getData(category);
    return products.find(
      (item) =>
        String(item.Id).trim().toLowerCase() ===
        String(id).trim().toLowerCase(),
    );
  }
}
