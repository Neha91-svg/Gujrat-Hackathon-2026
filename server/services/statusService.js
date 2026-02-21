import vehicleStatus from "../constants/vehicleStatus.js";
import driverStatus from "../constants/driverStatus.js";

/* Vehicle status transitions */
export const markVehicleOnTrip = async (vehicle) => {
  vehicle.status = vehicleStatus.ON_TRIP;
  return await vehicle.save();
};

export const markVehicleAvailable = async (vehicle) => {
  vehicle.status = vehicleStatus.AVAILABLE;
  return await vehicle.save();
};

export const markVehicleInShop = async (vehicle) => {
  vehicle.status = vehicleStatus.IN_SHOP;
  return await vehicle.save();
};

/* Driver status transitions */
export const markDriverOnTrip = async (driver) => {
  driver.status = driverStatus.ON_TRIP;
  return await driver.save();
};

export const markDriverAvailable = async (driver) => {
  driver.status = driverStatus.ON_DUTY;
  return await driver.save();
};