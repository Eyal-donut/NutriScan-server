import fs from "fs";
import { translateApi } from "../utils/translateApi.js";

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

const translateAndCreateJson = async (productJson) => {
  try {
    let { category, name, company, ingredients } = JSON.parse(product);
    if (!category) {
      category = "";
    }
    if (!name) {
      name = "";
    }
    if (!company) {
      name = "";
    }
    if (!ingredients) {
      ingredients = "";
    }
    const translateInfo = await translateApi(
      category,
      name,
      company,
      ingredients
    );
  } catch (error) {}
};

export { createProductLocally };
