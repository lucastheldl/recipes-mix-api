import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  MONGODB_USER: z.string(),
  MONGODB_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid enviroment variables", _env.error.format());

  throw new Error("Invalid enviroment variables");
}

export const env = _env.data;
