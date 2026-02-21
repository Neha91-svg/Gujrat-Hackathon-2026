import express from "express";
import * as controller from "../controllers/maintenanceController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { maintenanceValidation } from "../validations/maintenanceValidation.js";

const router = express.Router();

router.post("/", validateMiddleware(maintenanceValidation), controller.addMaintenance);

export default router;