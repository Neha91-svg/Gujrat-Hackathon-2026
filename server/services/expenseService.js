import Expense from "../models/Expense.js";

export const addFuel = (data) => Expense.create(data);
export const getFuelLogs = () => Expense.find({ type: "Fuel" });