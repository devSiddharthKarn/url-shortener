import { STATUS_CODE } from "../response/statusCode.response.js";
import { generateUniqueURL } from "../utils/generateUniqueURL.utils.js";
import { Respond } from "../utils/respond.utils.js";
import { getZodErrorMessage } from "../utils/zodError.utils.js";
import { URLs, Zod_URL } from "./url.model.js";
import {Request,Response} from "express"


const handleURLCreate = async(req:Request,res:Response)=>{
    const verified = Zod_URL.safeParse(req.body);

    if(!verified.data){
        const error = getZodErrorMessage(verified.error);
        return res.status(STATUS_CODE.BAD_REQUEST).json(
            Respond(false,"Invalid data for creating URL",null,error)
        )
    }


    try {
        const uniqueURL = generateUniqueURL();

        const object ={
            mappedURL:uniqueURL,
            originalURL:verified.data.originalURL,
            createdBy:req.user.id
        };

        const url = await URLs.insertOne(object).execute();

        console.log(url);

        return res.status(200).json(
            Respond(true,"URL generated",uniqueURL,null)
        )

    } catch (error) {
        console.log("Internal server error at handleURLCreate,error:",error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(
            Respond(false,"Internal server error",null,null)
        )
    }
}





const handleURLGet = async(req:Request,res:Response)=>{
    const mapped = req.params.url;

    if(!mapped){
        return res.status(404).contentType("text/html").send("<h1>404 not found</h1>");
    }


    try {
        const originalURL = await URLs.selectAll().where("mappedURL","=",mapped).execute();

        if(originalURL.length==0){
            return res.status(STATUS_CODE.NOT_FOUND).json(
                Respond(false,"no such url found",null,null)
            )
        }


        const url = originalURL[0].originalURL;

        res.redirect(url);
    } catch (error) {
        console.log("error at handle URL Get,error:",error);

        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(
            Respond(false,"Internal server error",null,null)
        )
    }
}

export {handleURLCreate,handleURLGet};

