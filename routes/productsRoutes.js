import express from "express";

import {
  getProduct,
  getProducts,
  createIsraeliProduct,
  createProducts,
  deleteProduct,
  deleteProducts,
  createFromOpenFoodSourceAPI,
} from "../controllers/productsController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const productsRouter = express.Router();

productsRouter
  .route("/")
  .get(getProducts)
  // .post(createIsraeliProduct)
  .delete(deleteProducts);

productsRouter
  .route("/openFoodFacts")
  .post(createFromOpenFoodSourceAPI)

productsRouter.route("/many").post(createProducts);

productsRouter
  .route("/:barcode")
  .get(getProduct)
  .delete(deleteProduct);

export default productsRouter;
