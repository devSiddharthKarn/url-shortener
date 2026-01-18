import {Request,Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token.utils.js";
import { STATUS_CODE } from "../response/statusCode.response.js";
import { Respond } from "../utils/respond.utils.js";
import { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            user:{
                id:number,
                username:string
            }
        }
    }
}

const authVerifyAccessToken = (req:Request,res:Response,next:NextFunction)=>{
    try {



        const accessToken = req.cookies[process.env.ACCESS_TOKEN_COOKIE_NAME as string];
        
        console.log(accessToken);

        const verified = verifyAccessToken(accessToken);
        
        console.log(verified);

        if(!verified){
            return res.status(STATUS_CODE.UNAUTHORIZED).json(
                Respond(false,"invalid access token",null,null)
            )
        }
    
    
        req.user = {
            id: verified.id,
            username: verified.username
        };
        
        next();
    } catch (error) {
        console.log("middleware error at verify access token,error:",error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(
            Respond(false,"Internal server error",null,null)
        )
    }

}

export {authVerifyAccessToken};