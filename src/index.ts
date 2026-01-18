import express, { Application } from "express"
import type { Request, Response } from "express";
import { configDotenv } from "dotenv"
import { connectDB } from "./db/db.connect.js";
import { Respond } from "./utils/respond.utils.js";
import { initUsersTable } from "./auth/auth.model.js";
import cookieParser from "cookie-parser";

configDotenv();

await connectDB();
await initUsersTable();
await initURLTable();


await migration.migrateUpToLatest();

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

app.get("/health", async (req: Request, res: Response) => {
  return res.status(200).json(
    Respond(true, "server is running fine", null, null)
  );
})

import { authRoutes } from "./auth/auth.routes.js";
import { initURLTable } from "./url/url.model.js";
app.use("/api",authRoutes);

import { URLRoutes } from "./url/url.routes.js";
import { migration } from "./runMigration/basic_addition.js";
app.use("/api",URLRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server started at PORT ${process.env.PORT}`);
})