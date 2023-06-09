import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  getCurrentUser,
  // forgotPassword,
  // resetPassword,
  updateUser,
  // updatePassword
} from "../controllers/authController.js";

import { protect } from "./../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);
// authRouter.post('/forgot-password', forgotPassword);
authRouter.get('/logout',protect, logout);
authRouter.get('/current-user', protect, getCurrentUser);
// authRouter.put('/reset-password/:resettoken', resetPassword);
authRouter.put("/update-user", protect, updateUser);
// authRouter.put('/update-password', protect, updatePassword);


export default authRouter;
