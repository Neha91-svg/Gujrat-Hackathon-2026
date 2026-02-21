import Trip from "../models/Trip.js";
import {
  validateVehicleAvailable,
  validateDriverEligible,
  validateCargoCapacity
} from "./validationService.js";

import {
  markVehicleOnTrip,
  markVehicleAvailable,
  markDriverOnTrip,
  markDriverAvailable
} from "./statusService.js";

export const createTrip = async (data) => {
  const vehicle = await validateVehicleAvailable(data.vehicleId);
  const driver = await validateDriverEligible(data.driverId);

  validateCargoCapacity(vehicle, data.cargoWeight);

  await markVehicleOnTrip(vehicle);
  await markDriverOnTrip(driver);

  return await Trip.create({ ...data, status: "Dispatched" });
};

export const completeTrip = async (tripId, endOdometer) => {
  const trip = await Trip.findById(tripId);

  await markVehicleAvailable(await trip.populate("vehicleId").then(t => t.vehicleId));
  await markDriverAvailable(await trip.populate("driverId").then(t => t.driverId));

  trip.status = "Completed";
  trip.endOdometer = endOdometer;

  return await trip.save();
};