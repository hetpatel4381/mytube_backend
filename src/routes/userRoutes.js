import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";
import { verityJWT } from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

userRoutes.route("/login").post(loginUser);

// secured route
userRoutes.route("/logout").post(verityJWT, logoutUser);
userRoutes.route("/refresh-token").post(refreshAccessToken);

export default userRoutes;
