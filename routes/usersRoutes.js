import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  deleteUsers,
  CreateManyUsers,
  createUser,
} from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers).delete(deleteUsers).post(createUser);

usersRouter.route("/many").post(CreateManyUsers);

usersRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default usersRouter;
