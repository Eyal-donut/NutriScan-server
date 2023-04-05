import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  deleteUsers,
} from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers).delete(deleteUsers);

usersRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default usersRouter;
