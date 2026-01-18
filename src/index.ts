import express, { Application } from "express"
import type { Request, Response } from "express";
import { configDotenv } from "dotenv"
import { connectDB } from "./db/db.connect.js";
import { Respond } from "./utils/respond.utils.js";
import { initUsersTable } from "./auth/auth.model.js";

configDotenv();

await connectDB();
await initUsersTable();


const app: Application = express();
app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  return res.status(200).json(
    Respond(true, "server is running fine", null, null)
  );
})

import { authRoutes } from "./auth/auth.routes.js";
app.use("/api",authRoutes);


app.listen(process.env.PORT, () => {
  console.log(`server started at PORT ${process.env.PORT}`);
})