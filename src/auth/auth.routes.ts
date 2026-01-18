import { Router } from "express";
import { handleGetMyURLs, handleLogin, handleSignup } from "./auth.controller.js";
import { authVerifyAccessToken } from "./auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup",handleSignup);
authRoutes.post("/login",handleLogin);

authRoutes.get("/getMyURLS",authVerifyAccessToken,handleGetMyURLs);

export {authRoutes};