import { Router } from "express";
import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashboardController.js";
import { verityJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verityJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/stats").get(getChannelStats);
router.route("/videos").get(getChannelVideos);

export default router;
