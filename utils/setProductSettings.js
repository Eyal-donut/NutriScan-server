import {
  glutenIngredients,
  lactoseIngredients,
  notVeganIngredients,
  nonVegetarianIngredients,
  siliconeIngredients,
  microPlasticIngredients,
} from "./constants.js";

const checkIfFreeFromIngredient = (product, ingredientsArray) => {
  for (const notWantedIngredient of ingredientsArray) {
    if (product.ingredients.toLowerCase().includes(notWantedIngredient)) {
      return false;
    }
  }
  return true;
};

const checkIfPalmOilFree = (product) => {
  return product.ingredients.toLowerCase().includes("palm") ? false : true;
};

const setDietPreferences = (product) => {
  const updated = { ...product };
  updated.settings.dietPreferences["Gluten free"] = checkIfFreeFromIngredient(
    updated,
    glutenIngredients
  );

  updated.settings.dietPreferences["Lactose free"] = checkIfFreeFromIngredient(
    updated,
    lactoseIngredients
  );

  updated.settings.dietPreferences["Vegan"] = checkIfFreeFromIngredient(
    updated,
    notVeganIngredients
  );
  updated.settings.dietPreferences["Vegetarian"] = checkIfFreeFromIngredient(
    updated,
    nonVegetarianIngredients
  );
  return updated;
};

const setEnvironmentPreferences = (product) => {
  const updated = { ...product };
  updated.settings.environmentPreferences["Silicone & Siloxane"] =
    checkIfFreeFromIngredient(updated, siliconeIngredients);

  updated.settings.environmentPreferences["Microplastic"] =
    checkIfFreeFromIngredient(updated, microPlasticIngredients);

  updated.settings.environmentPreferences["Palm oil"] =
    checkIfPalmOilFree(updated);
  return updated;
};

const setDieAndEnvironmentSettings = (product) => {
  if (product.ingredients) {
    const environmentSettingsSet = setEnvironmentPreferences(product);
    const allSettingsSet = setDietPreferences(environmentSettingsSet);
    return allSettingsSet;
  }
};

export { setDieAndEnvironmentSettings };
