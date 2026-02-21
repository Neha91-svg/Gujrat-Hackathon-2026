import api from "./client";

export const getVehicles = () => api.get("/vehicles");
export const createVehicle = (data: any) => api.post("/vehicles", data);
export const deleteVehicle = (id: string) => api.delete(`/vehicles/${id}`);