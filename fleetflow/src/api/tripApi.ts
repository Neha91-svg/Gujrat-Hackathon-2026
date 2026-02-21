import api from "./client";

export const getTrips = () => api.get("/trips");
export const createTrip = (data: any) => api.post("/trips", data);
export const completeTrip = (id: string) =>
  api.patch(`/trips/${id}/complete`);