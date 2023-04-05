import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";

// @desc    Get a single product
// @route   GET /api/v1/products-scanner/products/:barcode
// @access  Public
export const getProduct = asyncHandler(async (req, res, next) => {
  const filter = { barcode: Number(req.params.barcode) };
console.log(filter)
  const product = await Product.find(filter);
  console.log(product)
  if (!product) {
    return next(
      new Error(`product with barcode number ${req.params.barcode} not found`)
    );
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Get all products
// @route   GET /api/v1/products-scanner/products
//! @access  Development only!
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  if (!products) {
    return next(new Error(`No products found`));
  }
  res.status(200).json({
    success: true,
    data: products,
  });
});

// @desc    Create a product
// @route   POST /api/v1/products-scanner/products
// @access  Public
export const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  if (!product) {
    return next(new Error("Error, product not created!"));
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create many products
// @route   POST /api/v1/products-scanner/products/many
//! @access  Development only
export const createProducts = asyncHandler(async (req, res, next) => {
  const productsArray = await Product.insertMany(req.body);
  if (!productsArray) {
    return next(new Error("Error, products not created!"));
  }
  res.status(200).json({
    success: true,
    data: productsArray,
  });
});

// @desc    DELETE a single product
// @route   DELETE /api/v1/products-scanner/products/:barcode
//! @access development only
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.barcode);
  if (!product) {
    return next(
      new Error(`product with barcode number ${req.params.barcode} not found`)
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
//! @access development only
export const deleteProducts = asyncHandler(async (req, res, next) => {
  await Product.deleteMany();
  res.status(200).json({
    success: true,
    data: {},
  });
});
