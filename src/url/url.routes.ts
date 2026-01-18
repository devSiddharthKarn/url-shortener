import { Router } from "express";
import { authVerifyAccessToken } from "../auth/auth.middleware.js";
import { handleURLCreate, handleURLGet } from "./url.controller.js";


const URLRoutes:Router=Router();


URLRoutes.post("/createURL",authVerifyAccessToken,handleURLCreate)

URLRoutes.delete("/deleteURL",);



URLRoutes.get("/url/:url",handleURLGet);

export {URLRoutes};