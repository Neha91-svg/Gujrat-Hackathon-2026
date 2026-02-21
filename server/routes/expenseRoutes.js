import express from "express";
import * as controller from "../controllers/expenseController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { expenseValidation } from "../validations/expenseValidation.js";

const router = express.Router();

router.post("/fuel", validateMiddleware(expenseValidation), controller.addFuel);
router.get("/fuel", controller.getFuelLogs);

export default router;