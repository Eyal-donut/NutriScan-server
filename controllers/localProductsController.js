import fs from "fs";
import { translateApi } from "../utils/translate product/translateApi.js";
import { translateNutValues } from "../utils/translate product/translateNutValues.js";
import {createProduct} from "../controllers/productsController.js"


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


export { createProductLocally };
