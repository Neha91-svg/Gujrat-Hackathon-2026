import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";

/* Vehicle exists + available */
export const validateVehicleAvailable = async (vehicleId) => {
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) throw new Error("Vehicle not found");
  if (vehicle.status !== "Available")
    throw new Error("Vehicle not available");
  return vehicle;
};

/* Driver exists + eligible */
export const validateDriverEligible = async (driverId) => {
  const driver = await Driver.findById(driverId);
  if (!driver) throw new Error("Driver not found");
  if (driver.status !== "On Duty")
    throw new Error("Driver not eligible");
  return driver;
};

/* IMPORTANT — ye export hona chahiye */
export const validateCargoCapacity = (vehicle, cargoWeight) => {
  if (cargoWeight > vehicle.capacityKg) {
    throw new Error("Cargo exceeds vehicle capacity");
  }
};