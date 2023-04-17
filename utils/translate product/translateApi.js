// const AZURE_KEY = "8355b3eb533946c4992441baec13d714";
// const TRANSLATOR_ENDPOINT = "https://api.cognitive.microsofttranslator.com/";
// const LOCATION = "germanywestcentral";

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
      { text: company },
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

    let editedProduct = { imageURL, section, settings: {}, code: barcode };

    if (nutritionalValues) {
      editedProduct.settings.nutritionPreferences =
        translateNutValues(nutritionalValues);
    }

    // if (!category) {
    //   category = "Missing information";
    // }
    // if (!name) {
    //   name = "Missing information";
    // }
    // if (!company) {
    //   name = "Missing information";
    // }
    // if (!ingredients) {
    //   ingredients = "Missing information";
    // }
    // const translateInfo = await translateApi(
    //   category,
    //   name,
    //   company,
    //   ingredients
    // );

    // editedProduct = { ...editedProduct, ...translateInfo };
    return editedProduct;
  } catch (error) {
    console.error(error);
  }
};
