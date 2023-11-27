import { Request, Response, NextFunction } from "express";
import validator from "./validator";
import authSchema from "./schemas/auth.schema";

const signupValidator = (req: Request, res: Response, next: NextFunction) =>
  validator(res, next)(authSchema.signupSchema, req.body);

const loginValidator = (req: Request, res: Response, next: NextFunction) =>
  validator(res, next)(authSchema.loginSchema, req.body);

  const resetPasswordValidator = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => validator(res, next)(authSchema.resetPasswordSchema, req.body);

  const emailValidator = (req: Request, res: Response, next: NextFunction) =>
    validator(res, next)(authSchema.emailSchema, req.body);

export default {
  signupValidator,
  loginValidator,
  resetPasswordValidator,
  emailValidator,
};
