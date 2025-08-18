import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
// TODO: getMessages
export default router;
