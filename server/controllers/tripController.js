import * as service from "../services/tripService.js";

export const createTrip = async (req, res, next) => {
  try {
    const trip = await service.createTrip(req.body);
    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
};

export const completeTrip = async (req, res, next) => {
  try {
    const trip = await service.completeTrip(
      req.params.id,
      req.body.endOdometer
    );
    res.json(trip);
  } catch (err) {
    next(err);
  }
};