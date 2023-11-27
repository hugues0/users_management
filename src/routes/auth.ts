import express, { Response, Request, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import authController from "../controllers/auth.controller";
import authValidator from "../validators/auth";
import CustomError from "../helpers/CustomError";
import {
  SERVER_NOT_RESPONDING,
} from "../constants/general";
import { Messages } from "../constants";

const router = express.Router();

router.post(
  "/auth/signup",
  authValidator.signupValidator,
  async (req: Request, res: Response) => {
    try {
      await authController.createUser(req.body);
      return res
        .status(201)
        .json({ message: "User successfully created" });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error || SERVER_NOT_RESPONDING });
    }
  }
);

router.post(
  "/auth/signin",
  authValidator.loginValidator,
  async (req: Request, res: Response) => {
    try {
      const { success, accessToken, user } = await authController.loginUser(
        req.body
      );
      return res.status(201).json({
        success,
        accessToken,
        user,
        message: Messages.LOGIN_SUCCESS,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error : SERVER_NOT_RESPONDING  });
    }
  }
);

router.post(
  "/auth/forgot-password",
  authValidator.emailValidator,
  async (req: Request, res: Response) => {
    try {
      const result = await authController.forgotPassword(req.body);
      return res.json({ data: result });
    } catch (error) {
      if (error instanceof CustomError || error instanceof JsonWebTokenError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json(error);
    }
  }
);

router.post(
  "/auth/reset-password/:token",
  authValidator.resetPasswordValidator,
  async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const result = await authController.resetPassword(token, req.body);
      return res.json({ data: result });
    } catch (error) {
      if (error instanceof CustomError || error instanceof JsonWebTokenError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: SERVER_NOT_RESPONDING });
    }
  }
);



export default router;
