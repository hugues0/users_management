import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers";
import { IJwtUserPayload } from "../types/interfaces";
import userService from "../services/user.service";
import { ErrorCode } from "../constants";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization?.split(" ")[1]) {
      return res.status(401).json({ error: ErrorCode.TOKEN_NOT_PROVIDED });
    }
    const tokenData = (await verifyToken(
      authorization?.split(" ")[1]
    )) as IJwtUserPayload;
    const user = await userService.getById(tokenData.id);
    if (!user) return res.status(400).json({ error: ErrorCode.INVALID_TOKEN });
    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { isAuthenticated };
