import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import debug from "debug";
import cors from "cors";
import Router from "./routes";
import { AppConfig } from "./configs";
import sequelize from "./configs/database";
import CustomError from "./helpers/CustomError";
import { SERVER_NOT_RESPONDING } from "./constants/general";

/* declare module "express" {
  interface Request {
    user?: User;
    apiKey?: ApiKeyModel;
  }
} */

const app: Application = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.set("trust proxy", true);
app.use(cors(corsOptions));
//  App Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

// Features Middlewares

app.use("/api", Router);

app.use((err: CustomError, req: Request, res: Response, _next: NextFunction) =>
  res
    .status(err.statuscode || 500)
    .json({ error: err.message || SERVER_NOT_RESPONDING })
);
sequelize
  .authenticate()
  .then(() => {
    app.listen(AppConfig.port, () => {
      console.log("Server is listening on port", AppConfig.port);
    });
  })
  .catch((error) => {
    debug(error);
  });
export default app;
