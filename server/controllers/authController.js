import * as service from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const user = await service.register(req.body);
    res.status(201).json(user);
  } catch (e) { next(e); }
};

export const login = async (req, res, next) => {
  try {
    const result = await service.login(req.body);
    res.json(result);
  } catch (e) { next(e); }
};