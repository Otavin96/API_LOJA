/* eslint-disable prettier/prettier */
import { AppError } from "@/common/domain/erros/app-error";
import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(3030),
  API_URL: z.string().default("http://localhost:3030"),
  DB_TYPE: z.literal("postgres").default("postgres"),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.coerce.number().default(5432),
  DB_SCHEMA: z.string().default("public"),
  DB_NAME: z.string().default("postgres"),
  DB_USER: z.string().default("postgres"),
  DB_PASS: z.string().default("postgres"),
  MY_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success == false) {
  throw new AppError("Invalid emvironment variables");
}

export const env = _env.data;
