const adaptProductFromAPI = (product) => {
  const adaptedProduct = {
    ...product,
    category: "Missing information",
    name: "Missing information",
    company: "Missing information",
    ingredients: "Missing information",
    imageUrl: "Missing information",
    section: "Missing information",
    settings: {
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
    },
  };
  adaptedProduct.code = Number(product.product.code);
  
  if (product.product.ingredients_text) {
    adaptedProduct.ingredients = product.product.ingredients_text;
  }
  if (product.product.brands) {
    adaptedProduct.company = product.product.brands;
  }
  if (product.product.product_name) {
    adaptedProduct.name = product.product.product_name;
  }
  if (product.product.categories_old) {
    adaptedProduct.category = product.product.categories_old;
  }
  if (product.product.image_url) {
    adaptedProduct.imageUrl = product.product.image_url;
  }
  adaptedProduct.source = "OpenFoodFactsAPI";
  return adaptedProduct;
};

export default adaptProductFromAPI;
