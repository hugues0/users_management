import express, { NextFunction, Request, Response } from "express";
import TaskController from "../controllers/task.controller";
import uuidValidator from "../validators/uuidValidator";
import CustomError from "../helpers/CustomError";
import { SERVER_NOT_RESPONDING } from "../constants/general";


const router = express.Router();

router.post(
  "/tasks",
  async (req: Request, res: Response) => {
    console.log(req.body)
    try {
      await TaskController.createTask(req.body);
      return res.status(201).json({ message: "Task successfully created" });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error || SERVER_NOT_RESPONDING });
    }
  }
);

router.get("/tasks", async (req: Request, res: Response) => {
  const response = await TaskController.getAllTasks();
  return res.json(response);
});

router.get(
  "/tasks/:id",
  uuidValidator.uuidValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const user = await TaskController.getById(id);
      return res.json({ user });
    } catch (error) {
      return next(error);
    }
  }
);

router.put(
  "/tasks/:id",
  uuidValidator.uuidValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const response = await TaskController.updateTask(id, req.body);
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/tasks/:id",
  uuidValidator.uuidValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const response = await TaskController.deleteTask(id);
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
