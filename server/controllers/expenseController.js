import * as service from "../services/expenseService.js";

export const addFuel = async (req, res, next) => {
  try {
    const log = await service.addFuel(req.body);
    res.status(201).json(log);
  } catch (e) {
    next(e);
  }
};

export const getFuelLogs = async (req, res, next) => {
  try {
    const logs = await service.getFuelLogs();
    res.json(logs);
  } catch (e) {
    next(e);
  }
};