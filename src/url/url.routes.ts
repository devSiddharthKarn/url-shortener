import { Router } from "express";
import { authVerifyAccessToken } from "../auth/auth.middleware.js";
import { handleURLCreate, handleURLDelete, handleURLGet } from "./url.controller.js";


const URLRoutes:Router=Router();


URLRoutes.post("/createURL",authVerifyAccessToken,handleURLCreate)

URLRoutes.delete("/deleteURL",authVerifyAccessToken,handleURLDelete);


URLRoutes.get("/url/:url",handleURLGet);


export {URLRoutes};