import express from "express";
// import {getAllArticles, getOneArticle, updateOneArticle, deleteOneArticle, postManyArticles, deleteManyArticles, postOneArticle} from '../controllers/articleControllers.js'

const usersRouter = express.Router();

usersRouter
  .route("/")
  // .get(getAllArticles)
  // .delete(deleteManyArticles)
  // .post(postManyArticles);

usersRouter
  .route("/:id")
  // .get(getOneArticle)
  // .put(updateOneArticle)
  // .delete(deleteOneArticle);

export default usersRouter;
