import { Router } from "express";
import { handleSignup } from "./auth.controller.js";

const authRoutes = Router();

authRoutes.post("/signup",handleSignup);

export {authRoutes};