import express from "express";
import * as controller from "../controllers/vehicleController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { vehicleValidation } from "../validations/vehicleValidation.js";

const router = express.Router();

router.post("/", validateMiddleware(vehicleValidation), controller.createVehicle);
router.get("/", controller.getVehicles);
router.put("/:id", controller.updateVehicle);
router.delete("/:id", controller.deleteVehicle);

export default router;