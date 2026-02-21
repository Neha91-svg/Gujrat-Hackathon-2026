import Driver from "../models/Driver.js";

export const createDriver = (data) => Driver.create(data);
export const getDrivers = () => Driver.find();