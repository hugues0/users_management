import express, { NextFunction, Request, Response } from "express";
import { PASSWORD_IS_CHANGED } from "../constants/general";
import UserController from "../controllers/user.controller";
import { HTTP_OK } from "../constants/httpStatusCodes";
import uuidValidator from "../validators/uuidValidator";
import userValidator from "../validators/user";
import { User } from "../types/Dtos/user.dto";

const router = express.Router();


router.get("/users", async (req: Request, res: Response) => {
  const response = await UserController.getAllUsers();
  return res.json(response);
});

router.get(
  "/users/:id",
  uuidValidator.uuidValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const user = await UserController.getById(id);
      return res.json({ user });
    } catch (error) {
      return next(error);
    }
  }
);
router.put(
  "/users/:id",
  uuidValidator.uuidValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const response = await UserController.updateUser(id, req.body);
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/users/:id",
  uuidValidator.uuidValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const response = await UserController.deleteUser(id);
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  }
);

router.patch(
  "/users/change-password",
  userValidator.changePasswordValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserController.changePassword(req.body, req.user as User);
      return res.status(HTTP_OK).json({ message: PASSWORD_IS_CHANGED });
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
