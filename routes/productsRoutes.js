import express from "express";

// import { getAllEditors, signupEditor, loginEditor } from '../controllers/editorControllers.js';

const productsRouter = express.Router();

productsRouter
  .route("/")
  // .get(getAllEditors)
  // .post(signupEditor);
// .delete(deleteEditor);

productsRouter
  .route("/:id")
  // .post(loginEditor);
// .put(updateEditor)
// .delete(deleteEditor);

export default productsRouter;


