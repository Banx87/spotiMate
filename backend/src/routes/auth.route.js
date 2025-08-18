import { Router } from "express";
import { authCallback } from "../controllers/auth.controller.js";

const router = Router();

router.post("/auth-callback", authCallback);

export default router;
