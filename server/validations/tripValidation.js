export const tripValidation = (data) => {
  if (!data.vehicleId) return { error: "Vehicle required" };
  if (!data.driverId) return { error: "Driver required" };
  return {};
};