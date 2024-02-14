import { Router } from "express";
import { registerUser } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.route("/register").post(registerUser);

export default userRoutes;
