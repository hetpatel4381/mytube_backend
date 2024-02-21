import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
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

userRoutes.route("/change-password").post(verityJWT, changeCurrentPassword);
userRoutes.route("/current-user").get(verityJWT, getCurrentUser);
userRoutes.route("/update-account").patch(verityJWT, updateAccountDetails);

userRoutes
  .route("/avatar")
  .patch(verityJWT, upload.single("avatar"), updateUserAvatar);
userRoutes
  .route("/cover-image")
  .patch(verityJWT, upload.single("coverImage"), updateUserCoverImage);

userRoutes.route("/c/:username").get(verityJWT, getUserChannelProfile);
userRoutes.route("/history").get(verityJWT, getWatchHistory);

export default userRoutes;
