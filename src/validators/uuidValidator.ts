import { Request, Response, NextFunction } from "express";
import { validate as uuidValidate } from "uuid";
import { INVALID_GUID } from "../constants/general";
import { HTTP_BAD_REQUEST } from "../constants/httpStatusCodes";
import CustomError from "../helpers/CustomError";

const uuidValidator = (req: Request, res: Response, next: NextFunction) => {
  const isValid: Boolean = uuidValidate(
    (req.params.id as unknown as string) ?? (req.body.id as unknown as string)
  );
  if (!isValid) {
    throw new CustomError(INVALID_GUID, HTTP_BAD_REQUEST);
  }
  return next();
};

export default {
  uuidValidator,
};
