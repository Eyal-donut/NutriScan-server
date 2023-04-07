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
  .delete(protect, authorize("admin"), deleteProducts);

productsRouter.route("/many").post(protect, authorize("admin"), createProducts);

productsRouter.route("/:barcode").get(getProduct).delete(protect, authorize("admin"), deleteProduct);

export default productsRouter;
