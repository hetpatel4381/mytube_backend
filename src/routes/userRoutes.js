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
import { verifyJWT } from "../middlewares/auth.middleware.js";

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
userRoutes.route("/logout").post(verifyJWT, logoutUser);
userRoutes.route("/refresh-token").post(refreshAccessToken);

userRoutes.route("/change-password").post(verifyJWT, changeCurrentPassword);
userRoutes.route("/current-user").get(verifyJWT, getCurrentUser);
userRoutes.route("/update-account").patch(verifyJWT, updateAccountDetails);

userRoutes
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
userRoutes
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

userRoutes.route("/c/:username").get(verifyJWT, getUserChannelProfile);
userRoutes.route("/history").get(verifyJWT, getWatchHistory);

export default userRoutes;
