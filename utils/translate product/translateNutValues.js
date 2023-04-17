import { nutValuesTranslationsArray } from "../constants.js";

export const translateNutValues = (nutValues) => {
  const regex = /\n\d+(\.\d+)?\nמתוכן כפיות סוכר/;

  const removedSugarSpoonsValue = nutValues.replace(regex, "");
  const arr = removedSugarSpoonsValue.split("\n");
  const result = {};

  for (let i = 0; i < arr.length; i += 3) {
    const val = parseFloat(arr[i].trim().match(/\d+(\.\d+)?/)[0]);
    const units = arr[i + 1].trim();
    const name = arr[i + 2]?.trim() || undefined;

    if (nutValuesTranslationsArray[name]) {
      result[nutValuesTranslationsArray[name]] = {
        val: val,
        units: nutValuesTranslationsArray[units] || units,
      };

    } else {
      result[name] = {
        val: val,
        units: nutValuesTranslationsArray[units] || units,
      };
    }
  }
  return result;
};
