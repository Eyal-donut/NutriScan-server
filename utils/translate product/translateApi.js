import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { translateNutValues } from "./translateNutValues.js";

export const translateApi = (category, name, company, ingredients) => {
  return axios({
    baseURL: process.env.TRANSLATOR_ENDPOINT,
    url: "/translate",
    method: "post",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.AZURE_KEY,
      "Ocp-Apim-Subscription-Region": process.env.LOCATION,
      "Content-type": "application/json",
      "X-ClientTraceId": uuidv4().toString(),
    },
    params: {
      "api-version": "3.0",
      to: "en",
    },
    data: [
      { text: category },
      { text: name },
      { text: company, translation: { context: "Name" } },
      { text: ingredients },
    ],
    responseType: "json",
  })
    .then(function (response) {
      const data = response.data;

      const category = data[0].translations[0].text;
      const name = data[1].translations[0].text;
      const company = data[2].translations[0].text;
      const ingredients = data[3].translations[0].text;

      return { category, name, company, ingredients };
    })
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const translateAndEdit = async (product, section) => {
  const settings = {
    environmentPreferences: {
      "Silicone & Siloxane": "Unknown",
      Microplastic: "Unknown",
      "Palm oil": "Unknown",
    },
    dietPreferences: {
      "Gluten free": "Unknown",
      "Lactose free": "Unknown",
      Vegan: "Unknown",
      Vegetarian: "Unknown",
    },
  };

  try {
    let {
      category,
      name,
      company,
      ingredients,
      nutritionalValues,
      barcode,
      imageURL,
    } = product;

    let editedProduct = {
      imageUrl: imageURL,
      section,
      settings,
      code: barcode,
    };

    if (nutritionalValues) {
      editedProduct.settings.nutritionPreferences =
        translateNutValues(nutritionalValues);
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
    return editedProduct;
  } catch (error) {
    console.error(error);
  }
};
