import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import {
  translateAndEdit,
  translateApi,
} from "../utils/translate product/translateApi.js";
import { setDieAndEnvironmentSettings } from "../utils/setProductSettings.js";
import adaptProductFromAPI from "../utils/adaptProductFromAPI.js";
import { checkNutValuesFromAPI } from "../utils/checkNutValusFromAPI.js";

// @desc    Get a single product
// @route   GET /api/v1/products-scanner/products/:barcode
// @access  Public
export const getProduct = asyncHandler(async (req, res, next) => {
  const filter = { code: Number(req.params.barcode) };
  const product = await Product.findOne(filter);
  if (!product) {
    return next(
      new ErrorResponse(
        `product with barcode number ${req.params.barcode} not found`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Get all products
// @route   GET /api/v1/products-scanner/products
// @access Private
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  if (!products) {
    return next(new ErrorResponse(`No products found`, 404));
  }
  res.status(200).json({
    success: true,
    data: products,
  });
});

// Define section category here for scraping and creation of multiple products
const sectionCat = "Organic and Health";

// @desc    Create a product
// @route   POST /api/v1/products-scanner/products
// @access  Public
export const createIsraeliProduct = asyncHandler(async (req, res, next) => {
  const translatedProduct = await translateAndEdit(req.body, sectionCat);
  const editedProduct = setDieAndEnvironmentSettings(translatedProduct);

  const product = await Product.create(editedProduct);
  if (!product) {
    return next(new ErrorResponse("Error, product not created!"));
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create a product
// @route   POST /api/v1/products-scanner/products/openFoodFacts
// @access  Public
export const createFromOpenFoodSourceAPI = asyncHandler(
  async (req, res, next) => {
    let adaptedProduct = adaptProductFromAPI(req.body);
    const { category, name, ingredients } = adaptedProduct;

    const translatedInfo = await translateApi(category, name, ingredients);
    adaptedProduct = { ...adaptedProduct, ...translatedInfo };
    let editedProduct = setDieAndEnvironmentSettings(adaptedProduct);

    if (editedProduct.product.nutriments_estimated) {
      editedProduct.settings.nutritionPreferences = checkNutValuesFromAPI(
        editedProduct.product.nutriments_estimated
      );
    }
    if (editedProduct.product.nutriments) {
      editedProduct.settings.nutritionPreferences = checkNutValuesFromAPI(
        editedProduct.product.nutriments
      );
    }
    // const product = await Product.create(adaptedProduct);
    // if (!product) {
    //   return next(new ErrorResponse("Error, product not created!"));
    // }
    res.status(200).json({
      success: true,
      data: editedProduct,
    });
  }
);

// @desc    Create many products
// @route   POST /api/v1/products-scanner/products/many
// @access  Private
export const createProducts = asyncHandler(async (req, res, next) => {
  const createdProducts = [];
  for (let element of req.body) {
    try {
      const translatedProduct = await translateAndEdit(element, sectionCat);
      const editedProduct = setDieAndEnvironmentSettings(translatedProduct);
      const product = await Product.create(editedProduct);
      createdProducts.push(product);
    } catch (error) {
      console.log(`Error processing element: ${element}`, error);
      continue;
    }
  }
  res.status(200).json({
    success: true,
    data: createdProducts,
  });
});

// @desc    DELETE a single product
// @route   DELETE /api/v1/products-scanner/products/:barcode
// @access  Private
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const filter = { code: Number(req.params.barcode) };
  const product = await Product.findOne(filter);
  if (!product) {
    return next(
      new ErrorResponse(
        `product with barcode number ${req.params.barcode} not found`,
        404
      )
    );
  }
  product.deleteOne();
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Delete all products
// @route   DELETE /api/v1/products-scanner/products
// @access  Private
export const deleteProducts = asyncHandler(async (req, res, next) => {
  await Product.deleteMany();
  res.status(200).json({
    success: true,
    data: {},
  });
});
