import { translations } from "../nutValuesTranslationTable.js";

export const translateNutValues = (nutValues) => {
  const regex = /\n\d+(\.\d+)?\nמתוכן כפיות סוכר/;

  const removedSugarSpoonsValue = nutValues.replace(regex, "");
  const arr = removedSugarSpoonsValue.split("\n");
  const result = {};

  for (let i = 0; i < arr.length; i += 3) {
    const val = parseFloat(arr[i].trim().match(/\d+(\.\d+)?/)[0]);
    const units = arr[i + 1].trim();
    const name = arr[i + 2]?.trim() || undefined;

    if (translations[name]) {
      result[translations[name]] = {
        val: val,
        units: translations[units] || units,
      };

      // result.push({
      //   [translations[name]]: {
      //     val: val,
      //     units: translations[units] || units,
      //   },
      // });
    } else {
      result[name] = {
        val: val,
        units: translations[units] || units,
      };

      // result.push({
      //   [name]: {
      //     val: val,
      //     units: translations[units] || units,
      //   },
      // });
    }
  }
  return result;
};
