export const checkNutValuesFromAPI = (nutValuesData) => {
  const result = {};
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
  for (let i = 0; i < valuesArray.length; i += 3) {
    if (nutValuesData[valuesArray[i]] >= 0) {
      result[valuesArray[i + 1]] = {
        val: nutValuesData[valuesArray[i]],
        units: valuesArray[i + 2],
      };
    } else {
      result[valuesArray[i + 1]] = 0;
    }
  }
  return result;
};
