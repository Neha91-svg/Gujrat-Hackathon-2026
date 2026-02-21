export const expenseValidation = (data) => {
  if (!data.vehicle) return { error: "Vehicle required" }; // vehicle field match karo model ke saath
  if (!data.type) return { error: "Type required" };       // Fuel / Maintenance
  if (!data.amount) return { error: "Amount required" };
  return {};
};