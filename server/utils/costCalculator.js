export const calculateFuelCostPerKm = (fuelCost, distance) => {
  if (!distance) return 0;
  return fuelCost / distance;
};