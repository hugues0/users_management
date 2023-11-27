import { Router } from "express";
import authRoutes from "./auth";
import usersRoutes from "./users";
import tasksRoutes from "./tasks";

import rateLimiter from "../middlewares/rateLimiter";
import authMiddleware from "../middlewares/auth.middleware";

const routes = Router();

// Entry point API
const entryPoint = Router();
entryPoint.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "users-management",
    environment: process.env.NODE_ENV || "development",
  });
});
// Unprotected routes
routes.use(
  rateLimiter,
  entryPoint,
  authRoutes,
);

// Protected routes
routes.use(authMiddleware.isAuthenticated, usersRoutes, tasksRoutes);

export default routes;
