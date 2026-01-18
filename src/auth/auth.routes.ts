import { Router } from "express";
import { handleLogin, handleSignup } from "./auth.controller.js";

const authRoutes = Router();

authRoutes.post("/signup",handleSignup);
authRoutes.post("/login",handleLogin);

export {authRoutes};