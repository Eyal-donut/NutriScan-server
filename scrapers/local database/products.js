import fs from "fs";

const createProductLocally = (prod) => {
  const products = loadProducts();
  const duplicateProduct = products.find(
    (product) => product.barcode === prod.barcode
  );
  if (!duplicateProduct) {
    products.push(prod);
  }
  saveProducts(products);
};

const loadProducts = () => {
  try {
    const dataBuffer = fs.readFileSync("products.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveProducts = (products) => {
  const dataJSON = JSON.stringify(products);
  fs.writeFileSync("products.json", dataJSON);
};

export { createProductLocally }