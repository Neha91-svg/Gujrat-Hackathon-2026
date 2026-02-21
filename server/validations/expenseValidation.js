export const expenseValidation = (data) => {
  if (!data.vehicleId) return { error: "Vehicle required" };
  if (!data.cost) return { error: "Cost required" };
  return {};
};