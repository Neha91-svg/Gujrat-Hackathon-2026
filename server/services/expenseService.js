import FuelLog from "../models/FuelLog.js";

export const addFuel = (data) => FuelLog.create(data);
export const getFuelLogs = () => FuelLog.find();