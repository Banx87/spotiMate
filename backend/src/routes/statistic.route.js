import { Router } from "express";
import { getStatistics } from "../controllers/statistic.controller.js";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStatistics);
export default router;
