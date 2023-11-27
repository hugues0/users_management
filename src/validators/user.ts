import { Request, Response, NextFunction } from "express";
import userSchema from "./schemas/user.schema";
import validator from "./validator";

const changePasswordValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => validator(res, next)(userSchema.changePasswordSchema, req.body);

export default {
  changePasswordValidator,
};
