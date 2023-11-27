import { Response, NextFunction } from "express";
import Joi from "joi";

const validator =
  (res: Response, next: NextFunction) =>
  (schema: Joi.ObjectSchema, payload: Record<string, unknown>) => {
    const { error } = schema.validate(payload);
    if (error) {
      const errorMessages: string[] = error.details.map((detail) =>
        detail.message.replace(/['"]+/g, "")
      );
      return res.status(400).json({ error: errorMessages[0] });
    }
    return next();
  };
export default validator;
