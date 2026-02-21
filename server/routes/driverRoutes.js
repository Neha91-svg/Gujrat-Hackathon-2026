import express from "express";
import * as controller from "../controllers/driverController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { driverValidation } from "../validations/driverValidation.js";

const router = express.Router();

router.post("/", validateMiddleware(driverValidation), controller.createDriver);
router.get("/", controller.getDrivers);

export default router;