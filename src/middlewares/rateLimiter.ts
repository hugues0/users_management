import { rateLimit } from "express-rate-limit";
import { AppConfig } from "../configs";
import { TOO_MANY_REQUESTS } from "../constants/general";

const limiter = rateLimit({
  windowMs: 1 * 1000 * 60,
  max: AppConfig.maxRequests as number,
  standardHeaders: true,
  handler: (_req, res) => res.status(429).json({ error: TOO_MANY_REQUESTS }),
});

export default limiter;
