const adaptProductFromAPI = (product) => {
  const adaptedProduct = {
    ...product,
    category: "Missing information",
    name: "Missing information",
    company: "Missing information",
    ingredients: "Missing information",
    imageUrl: "Missing infromation",
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
  return adaptedProduct;
};

export default adaptProductFromAPI;
