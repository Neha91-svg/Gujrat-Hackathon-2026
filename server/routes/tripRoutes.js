import express from "express";
import * as controller from "../controllers/tripController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { tripValidation } from "../validations/tripValidation.js";

const router = express.Router();

router.post("/", validateMiddleware(tripValidation), controller.createTrip);
router.put("/:id/complete", controller.completeTrip);

export default router;