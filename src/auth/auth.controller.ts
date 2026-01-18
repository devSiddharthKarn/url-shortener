import { STATUS_CODE } from "../response/statusCode.response.js";
import { comparePassword, hashPassword } from "../utils/password.utils.js";
import { Respond } from "../utils/respond.utils.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.utils.js";
import { getZodErrorMessage } from "../utils/zodError.utils.js";
import { Users, Zod_User } from "./auth.model.js";

import type { Request, Response } from "express";

const handleSignup = async (req: Request, res: Response) => {

    const verified = Zod_User.safeParse(req.body);

    if (!verified.success) {
        console.log(verified);
        const error = getZodErrorMessage(verified.error);
        return res.status(STATUS_CODE.BAD_REQUEST).json(
            Respond(false, "invalid data", verified.data, error)
        );
    }


    try {
        const user = await Users.selectAll().where("username", "=", verified.data.username).execute();
        if (user.length > 0) {
            return res.status(STATUS_CODE.CONFLICT).json(
                Respond(false, "user with this username already exists", null, null)
            )
        }


        const createdUser = await Users.insertOne({
            username: verified.data.username,
            password: hashPassword(verified.data.password)
        }).execute();

        return res.status(STATUS_CODE.OK).json(
            Respond(true, "user created successfully,please login", null, null)
        )



    } catch (error) {
        console.log("error at handleSignup,error:", error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(
            Respond(false, "Internal server error", null, null)
        )
    }


}


const handleLogin=async(req:Request,res:Response)=>{
    const verified = Zod_User.safeParse(req.body);

    if(!verified.success){
        const error = getZodErrorMessage(verified.error);
        return res.status(200).json(
            Respond(false,"Invalid login data",null,error)
        )
    }


    try {
        const user = await Users.selectAll().where("username","=",verified.data.username).execute();

        if(user.length==0){
            return res.status(STATUS_CODE.UNAUTHORIZED).json(
                Respond(false,"No such user exists",null,null)
            )
        }


        let foundUser = user[0];
        
        const isPasswordMatched = comparePassword(verified.data.password,foundUser.password);

        if(!isPasswordMatched){
            return res.status(STATUS_CODE.UNAUTHORIZED).json(
                Respond(false,"password did not matched",null,null)
            )
        }


        

        const accessToken = generateAccessToken(foundUser);
        const refreshToken = generateRefreshToken(foundUser);

        res.cookie(process.env.ACCESS_TOKEN_COOKIE_NAME as string,accessToken,{
            httpOnly:true,
            secure:true
        });


        res.cookie(process.env.REFRESH_TOKEN_COOKIE_NAME as string,refreshToken,{
            httpOnly:true,
            secure:true
        });

        return res.status(200).json(
            Respond(true,"password matched",foundUser,null)
        );

    } catch (error) {
        console.log("error at handle login,error:",error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(
            Respond(false,"Internal server error",null,null)
        )
    }

}

export { handleSignup ,handleLogin};