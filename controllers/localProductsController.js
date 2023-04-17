import fs from "fs";
import { translateApi } from "../utils/translateApi.js";
import {translateNutValues} from "../utils/translateNutValues.js"

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
    let { category, name, company, ingredients, nutritionalValues } = JSON.parse(product);
    if (!category) {
      category = "Missing information";
    }
    if (!name) {
      name = "Missing information";
    }
    if (!company) {
      name = "Missing information";
    }
    if (!ingredients) {
      ingredients = "Missing information";
    }
    const translateInfo = await translateApi(
      category,
      name,
      company,
      ingredients
    );
    if (nutritionalValues){

    }

  } catch (error) {}
};

export { createProductLocally };
