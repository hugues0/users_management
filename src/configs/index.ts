import * as dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config();

export const isDevelopment = process.env.NODE_ENV === "development";

export const AppConfig = {
  port: process.env.APP_PORT,
  timezone: process.env.APP_TIMEZONE,
  appName: process.env.APP_NAME,
  environment: process.env.NODE_ENV as string,
  jwtSecret: process.env.JWT_SECRET_KEY,
  saltRounds: process.env.SALT_ROUNDS as string,
  maxRequests: process.env.MAX_REQUESTS || 50,
};

export const DatabaseConfig = (environment: string) => {
  environment = environment.toUpperCase();
  return {
    dialect: process.env.DB_DRIVER as Dialect,
    timezone: process.env.APP_TIMEZONE as string,
    ssl: process.env[`DB_${environment}_SSL`] === "TRUE",
    host: process.env[`DB_${environment}_HOST`] as string,
    username: process.env[`DB_${environment}_USER`] as string,
    database: process.env[`DB_${environment}_NAME`] as string,
    password: process.env[`DB_${environment}_PASSWORD`] as string,
    port: parseInt(process.env[`DB_${environment}_PORT`] as string, 10),
  };
};


