import api from "./client";

export const getDrivers = () => api.get("/drivers");
export const createDriver = (data: any) => api.post("/drivers", data);
export const deleteDriver = (id: string) => api.delete(`/drivers/${id}`);