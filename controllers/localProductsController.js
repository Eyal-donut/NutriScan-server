import fs from "fs";
import { translateApi } from "../utils/translateApi.js";
import { translateNutValues } from "../utils/translateNutValues.js";

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



const test = {
  "category": "גבינת שמנת,מותכת",
  "imageURL": "https://www.rami-levy.co.il/_ipx/w_245,f_webp/https://img.rami-levy.co.il/product/7290000045580/small.jpg",
  "ingredients": "גבינות חצי קשות (55%) (חלב), מים, חמאה, רכיבי חלב, מלחים מתחלבים (E-450, E-452), מלח, חומצת מאכל (E-330), צבע מאכל: אנאטו (ממקור צמחי), חומר משמר (E-202).",
  "barcode": 7290000045580,
  "name": "גבינה מותכת משולשים",
  "company": "נעמה",
  "nutritionalValues": "297\nקלוריות\nאנרגיה\n25\nגרם\nשומנים\n15\nגרם\nחומצות שומן רוויות\n0.9\nגרם\nחומצות שומן טראנס\n75\nמג\nכולסטרול\n1250\nמג\nנתרן\n2\nגרם\nסך הפחמימות\n16\nגרם\nחלבונים\n540\nמג\nסידן"
}


const translateAndCreateJson = async (product) => {
  try {

    let { category, name, company, ingredients, nutritionalValues } = product
      
    let editedProduct = {};

    if (nutritionalValues) {
      editedProduct.nutritionalValues = translateNutValues(nutritionalValues);
    }

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

    editedProduct = { ...editedProduct, ...translateInfo };
    console.log(editedProduct)
  } catch (error) {
    console.error(error)
  }
};


export { createProductLocally };
