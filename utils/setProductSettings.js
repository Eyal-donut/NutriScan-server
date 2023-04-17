import {
  glutenIngredients,
  lactoseIngredients,
  notVeganIngredients,
  nonVegetarianIngredients,
  siliconeIngredients,
  microPlasticIngredients,
} from "./constants.js";

const checkIfNotContainsIngredient = (product, ingredientsArray) => {
  for (const notWantedIngredient of ingredientsArray) {
    if (product.ingredients.toLowerCase().includes(notWantedIngredient)) {
      return false;
    }
  }
  return true;

};

const checkIfPalmOilFree = (product) => {
 
  return product.ingredients.toLowerCase().includes("palm oil")
    ? false
    : product.ingredients.toLowerCase().includes("palm-oil")
    ? false
    : true;
};

const setDietPreferences = (product) => {
  const updated = { ...product };
  updated.settings.dietPreferences["Gluten free"] =
    checkIfNotContainsIngredient(updated, glutenIngredients);

  updated.settings.dietPreferences["Lactose free"] =
    checkIfNotContainsIngredient(updated, lactoseIngredients);

  updated.settings.dietPreferences["Vegan"] = checkIfNotContainsIngredient(
    updated,
    notVeganIngredients
  );
  updated.settings.dietPreferences["Vegetarian"] = checkIfNotContainsIngredient(
    updated,
    nonVegetarianIngredients
  );
  return updated;
};

const setEnvironmentPreferences = (product) => {
  const updated = { ...product };
  updated.settings.environmentPreferences["Silicone & Siloxane"] =
    checkIfNotContainsIngredient(updated, siliconeIngredients);

  updated.settings.environmentPreferences["Microplastic"] =
    checkIfNotContainsIngredient(updated, microPlasticIngredients);

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
