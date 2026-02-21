import Vehicle from "../models/Vehicle.js";
import Trip from "../models/Trip.js";
import FuelLog from "../models/FuelLog.js";

export const getDashboardStats = async () => {
  const totalVehicles = await Vehicle.countDocuments();
  const totalTrips = await Trip.countDocuments();
  const fuelCost = await FuelLog.aggregate([
    { $group: { _id: null, total: { $sum: "$cost" } } }
  ]);

  return {
    totalVehicles,
    totalTrips,
    totalFuelCost: fuelCost[0]?.total || 0
  };
};