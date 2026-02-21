export const driverValidation = (data) => {
  if (!data.name) return { error: "Driver name required" };
  return {};
};