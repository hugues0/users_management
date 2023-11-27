import bcrypt from "bcrypt";
import { AppConfig } from "../configs";
import * as jsonWebToken from "jsonwebtoken";

export const generateSalt = async (saltRounds: string) =>
  bcrypt.genSaltSync(parseInt(saltRounds));

/**
 * Hash any plain text
 * @param plainText string
 * @returns  hashed text
 */
export const HashString = async (plainText: string): Promise<string> =>
  bcrypt.hashSync(plainText, await generateSalt(AppConfig.saltRounds));

export const comparePassword = async (
  password: string,
  actualPassword: string
) => bcrypt.compareSync(password, actualPassword);

export const generateToken = async (
  payload: Record<string, unknown>
): Promise<string> => {
  return jsonWebToken.sign(payload, AppConfig.jwtSecret as string, {
    expiresIn: "1d",
  });
};

export const verifyToken = async (token: string) =>
  jsonWebToken.verify(token, AppConfig.jwtSecret as string);