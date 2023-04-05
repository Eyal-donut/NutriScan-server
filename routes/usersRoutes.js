import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  deleteUsers,
  createUsers,
  createUser,
} from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers).delete(deleteUsers).post(createUser);

usersRouter.route("/many").post(createUsers);

usersRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default usersRouter;
