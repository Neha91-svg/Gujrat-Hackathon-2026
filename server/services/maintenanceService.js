import MaintenanceLog from "../models/MaintenanceLog.js";
import Vehicle from "../models/Vehicle.js";

export const addMaintenance = async (data) => {
  const vehicle = await Vehicle.findById(data.vehicleId);
  vehicle.status = "In Shop";
  await vehicle.save();
  return await MaintenanceLog.create(data);
};