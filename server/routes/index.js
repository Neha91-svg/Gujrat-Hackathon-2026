import express from "express";

import authRoutes from "./authRoutes.js";
import vehicleRoutes from "./vehicleRoutes.js";
import driverRoutes from "./driverRoutes.js";
import tripRoutes from "./tripRoutes.js";
import maintenanceRoutes from "./maintenanceRoutes.js";
import expenseRoutes from "./expenseRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/drivers", driverRoutes);
router.use("/trips", tripRoutes);
router.use("/maintenance", maintenanceRoutes);
router.use("/expenses", expenseRoutes);
router.use("/analytics", analyticsRoutes);

export default router;