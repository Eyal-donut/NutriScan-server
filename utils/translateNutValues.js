const nutValues =
  "400\nקלוריות\nאנרגיה\n6.6\nגרם\nשומנים\n1.1\nגרם\nחומצות שומן רוויות\nL 0.5\nגרם\nחומצות שומן טראנס\n0\nמג\nכולסטרול\n594\nמג\nנתרן\n83.8\nגרם\nסך הפחמימות\n30\nגרם\nסוכרים מתוך פחמימות\n7.5\nמתוכן כפיות סוכר\n3.7\nגרם\nסיבים תזונתיים\n5.5\nגרם\nחלבונים\n92\nמג\nסידן\n116\nמג\nזרחן\n55\nמג\nמגנזיום\n3.2\nמג\nברזל";

const translateNutValues = (nutValues) => {
  const translatedValues = [];

  const translations = {
    קלוריות: "Calories",
    אנרגיה: "Energy",
    שומנים: "Fat",
    נתרן: "Sodium",
    מלח: "Sodium",
    מלחים: "Sodium",
    "סך הפחמימות": "Carbohydrates",
    "סוכרים מתוך פחמימות": "Sugar",
    "סיבים תזונתיים": "Dietary fibers",
    חלבונים: "Proteins",
    גרם: "g",
    מג: "mg",
    סידן: "Calcium",
    ברזל: "Iron",
    מגנזיום: "Magnesium",
    זרחן: "Potassium",
    "חומצות שומן טראנס": "Trans fatty acids",
    "חומצות שומן רוויות": "Saturated fat",
    כולסטרול: "Cholesterol",
  };
  const regex = /\n\d+(\.\d+)?\nמתוכן כפיות סוכר/;

  const removedSugarSpoonsValue = nutValues.replace(regex, "");
  const arr = removedSugarSpoonsValue.split("\n");
  const result = [];

  for (let i = 0; i < arr.length; i += 3) {
    const value = parseFloat(arr[i].trim().match(/\d+(\.\d+)?/)[0]);
    const units = arr[i + 1].trim();
    const name = arr[i + 2]?.trim() || undefined;

    if (translations[name]) {
      result.push({
        name: translations[name],
        value: value,
        units: translations[units] || units,
      });
    } else {
      result.push({
        name: name,
        value: value,
        units: translations[units] || units,
      });
    }
  }
  console.log(result);
  return result;
};
translateNutValues(nutValues);
