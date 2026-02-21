import * as service from "../services/driverService.js";

export const createDriver = async (req, res, next) => {
  try {
    const driver = await service.createDriver(req.body);
    res.status(201).json(driver);
  } catch (err) {
    next(err);
  }
};

export const getDrivers = async (req, res, next) => {
  try {
    const drivers = await service.getDrivers();
    res.json(drivers);
  } catch (err) {
    next(err);
  }
};