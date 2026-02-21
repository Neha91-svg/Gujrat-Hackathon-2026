import express from "express";
import * as controller from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/dashboard", controller.getDashboard);

export default router;