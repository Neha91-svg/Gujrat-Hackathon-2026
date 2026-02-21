import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";
import Trip from "../models/Trip.js";
import Expense from "../models/Expense.js";

export const getDashboardStats = async () => {
  const vehicles = await Vehicle.find();
  const drivers = await Driver.find();
  const trips = await Trip.find();
  const expenses = await Expense.find();

  const totalVehicles = vehicles.length;
  const vehiclesAvailable = vehicles.filter(v => v.status === "Available").length;
  const vehiclesOnTrip = vehicles.filter(v => v.status === "On Trip").length;
  const vehiclesInShop = vehicles.filter(v => v.status === "In Shop").length;

  const activeDrivers = drivers.filter(d => d.status === "Active").length;
  const suspendedDrivers = drivers.filter(d => d.status === "Suspended").length;

  const completedTrips = trips.filter(t => t.status === "Completed").length;
  const dispatchedTrips = trips.filter(t => t.status === "Dispatched").length;

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return {
    vehicles: { totalVehicles, vehiclesAvailable, vehiclesOnTrip, vehiclesInShop },
    drivers: { totalDrivers: drivers.length, activeDrivers, suspendedDrivers },
    trips: { totalTrips: trips.length, completedTrips, dispatchedTrips },
    totalExpenses
  };
};