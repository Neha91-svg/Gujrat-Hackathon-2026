import * as service from "../services/analyticsService.js";

export const getDashboard = async (req, res, next) => {
  try {
    const data = await service.getDashboardStats();
    res.json(data);
  } catch (e) { next(e); }
};