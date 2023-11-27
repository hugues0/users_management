import { Request, Response, NextFunction } from "express";
import validator from "./validator";
import authSchema from "./schemas/auth.schema";

const signupValidator = (req: Request, res: Response, next: NextFunction) =>
  validator(res, next)(authSchema.signupSchema, req.body);

const loginValidator = (req: Request, res: Response, next: NextFunction) =>
  validator(res, next)(authSchema.loginSchema, req.body);

export default {
  signupValidator,
  loginValidator,
};
