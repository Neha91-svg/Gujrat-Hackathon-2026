import Vehicle from "../models/Vehicle.js";

export const createVehicle = async (data) => {
  return await Vehicle.create(data);
};

export const getVehicles = async () => {
  return await Vehicle.find();
};

export const updateVehicle = async (id, data) => {
  return await Vehicle.findByIdAndUpdate(id, data, { new: true });
};

export const deleteVehicle = async (id) => {
  return await Vehicle.findByIdAndDelete(id);
};