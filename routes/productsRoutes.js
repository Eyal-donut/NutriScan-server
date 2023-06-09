import express from "express";

import {
  getProduct,
  getProducts,
  createProduct,
  createProducts,
  deleteProduct,
  deleteProducts,
} from "../controllers/productsController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const productsRouter = express.Router();

productsRouter
  .route("/")
  .get(getProducts)
  .post(createProduct)
  .delete(deleteProducts);

productsRouter.route("/many").post(createProducts);

productsRouter
  .route("/:barcode")
  .get(getProduct)
  .delete(deleteProduct);

export default productsRouter;
