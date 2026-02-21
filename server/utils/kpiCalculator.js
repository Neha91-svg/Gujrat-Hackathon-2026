export const vehicleUtilization = (activeTrips, totalVehicles) => {
  if (!totalVehicles) return 0;
  return (activeTrips / totalVehicles) * 100;
};