import api from "./client";

export const getExpenses = () => api.get("/expenses");
export const createExpense = (data: any) => api.post("/expenses", data);
export const deleteExpense = (id: string) =>
  api.delete(`/expenses/${id}`);