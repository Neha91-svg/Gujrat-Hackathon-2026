import * as service from "../services/maintenanceService.js";

export const addMaintenance = async (req, res, next) => {
  try {
    const log = await service.addMaintenance(req.body);
    res.status(201).json(log);
  } catch (e) { next(e); }
};