import { STATUS_CODE } from "../response/statusCode.response.js";
import { Respond } from "../utils/respond.utils.js";
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
            password: verified.data.username
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


// const handleLogin=

export { handleSignup };