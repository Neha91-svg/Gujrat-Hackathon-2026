export const vehicleValidation = (data) => {
  if (!data.model) return { error: "Model required" };
  if (!data.licensePlate) return { error: "License plate required" };
  return {};
};