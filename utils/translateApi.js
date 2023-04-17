const AZURE_KEY = "8355b3eb533946c4992441baec13d714";
const TRANSLATOR_ENDPOINT = "https://api.cognitive.microsofttranslator.com/";
const LOCATION = "germanywestcentral";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const translateApi = (category, name, company, ingredients) => {
  return axios({
    baseURL: TRANSLATOR_ENDPOINT,
    url: "/translate",
    method: "post",
    headers: {
      "Ocp-Apim-Subscription-Key": AZURE_KEY,
      "Ocp-Apim-Subscription-Region": LOCATION,
      "Content-type": "application/json",
      "X-ClientTraceId": uuidv4().toString(),
    },
    params: {
      "api-version": "3.0",
      to: "en",
    },
    data: [{ text: category }, { text: name }, {text: company}, { text: ingredients }],
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
