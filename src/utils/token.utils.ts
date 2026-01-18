import jwt, { JwtPayload } from "jsonwebtoken"
import { IUser } from "../auth/auth.model.js";

function generateAccessToken(buffer: IUser): string {

    const user = {
        id: buffer.id,
        username: buffer.username,
    }


    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_COOKIE_SECRET as string, { expiresIn: "15m" });

    return accessToken;
}


function verifyAccessToken(token: string): null | JwtPayload {
    try {
        const isOkay = jwt.verify(token, process.env.ACCESS_TOKEN_COOKIE_SECRET as string) as JwtPayload;

        return isOkay as JwtPayload;
    } catch (error) {
        return null;
    }
}

function generateRefreshToken(buffer: IUser): string {

    const user = {
        id: buffer.id,
        username: buffer.username,
    }

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_COOKIE_SECRET as string, { expiresIn: "7d" });

    return refreshToken;
}

function verifyRefreshToken(token:string):boolean|JwtPayload{
    try {
        const isOkay = jwt.verify(token,process.env.REFRESH_TOKEN_COOKIE_SECRET as string) as JwtPayload;

        return isOkay;
    } catch (error) {
        return false;
    }
};

export { generateAccessToken,verifyAccessToken, generateRefreshToken,verifyRefreshToken };