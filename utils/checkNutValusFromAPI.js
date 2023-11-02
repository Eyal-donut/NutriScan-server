export const checkNutValuesFromAPI = (product) => {
  const nutValuesData = product.nutriments_estimated
    ? product.nutriments_estimated
    : product.nutriments;

  const resultsForNoData = {
    Carbohydrates: {
      value: -1,
      units: "g",
    },
    Cholesterol: {
      value: -1,
      units: "mg",
    },
    Fat: {
      value: -1,
      units: "g",
    },
    Sodium: {
      value: -1,
      units: "g",
    },
    "Saturated fat": {
      value: -1,
      units: "g",
    },
    Sugar: {
      value: -1,
      units: "g",
    },
  };

  let result = {};
  const valuesArray = [
    "carbohydrates_100g",
    "Carbohydrates",
    "g",
    "cholesterol_100g",
    "Cholesterol",
    "mg",
    "fat_100g",
    "Fat",
    "g",
    "salt_100g",
    "Sodium",
    "g",
    "saturated-fat_100g",
    "Saturated fat",
    "g",
    "sugars_100g",
    "Sugar",
    "g",
  ];

  if (!nutValuesData) {
    result = resultsForNoData;
  } else {
    let count = 0;
    for (let i = 0; i < valuesArray.length; i += 3) {
      if (nutValuesData[valuesArray[i]] >= 0) {
        count += 1;
        result[valuesArray[i + 1]] = {
          val: nutValuesData[valuesArray[i]],
          units: valuesArray[i + 2],
        };
      } else {
        result[valuesArray[i + 1]] = {
          val: 0,
          units: valuesArray[i + 2],
        };
      }
    }
    if (count === 0) {
      result = resultsForNoData;
    }
  }
  return result;
};
