import { STATUS_CODE } from "../response/statusCode.response.js";
import { generateUniqueURL } from "../utils/generateUniqueURL.utils.js";
import { Respond } from "../utils/respond.utils.js";
import { getZodErrorMessage } from "../utils/zodError.utils.js";
import { URLs, Zod_URL, Zod_URL_Delete } from "./url.model.js";
import {Request,Response} from "express"


const handleURLCreate = async(req:Request,res:Response)=>{
    const verified = Zod_URL.safeParse(req.body);

    if(!verified.success){
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

        await URLs.insertOne(object).execute();




        // console.log(url);

        return res.status(200).json(
            Respond(true,"URL generated",{
                url:uniqueURL,
                
            },null)
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


const handleURLDelete = async(req:Request,res:Response)=>{
    const verified = Zod_URL_Delete.safeParse(req.body);

    if(!verified.success){
        const error = getZodErrorMessage(verified.error);
        return res.status(STATUS_CODE.BAD_REQUEST).json(
            Respond(false,"invalid data for url delete",null,error)
        )
    }


    try {
        console.log("Delete request body:", req.body);
        console.log("Verified data:", verified.data);
        console.log("Looking for mappedURL:", verified.data.mappedURL);
        
        const deleted = await URLs.selectAll().where("mappedURL","=",verified.data.mappedURL).execute();

        console.log("Query result:", deleted);
        console.log("Result length:", deleted.length);

        if(deleted.length==0){
            console.log("returnning from here");
            return res.status(STATUS_CODE.NOT_FOUND).json(
                Respond(false,"no such url found",null,null)
            )
        }

        console.log(deleted);

        const data = deleted[0];

        if(data.isDeleted == 1 || data.isDeleted == true){
            console.log("returning from hhh")
            return res.status(STATUS_CODE.NOT_FOUND).json(
                Respond(false,"no such url found",null,null)
            )
        }
        
        await URLs.update({
            isDeleted:true
        }).where("mappedURL","=",verified.data.mappedURL).and("createdBy","=",req.user.id).execute();


        return res.status(STATUS_CODE.OK).json(
            Respond(true,"url deleted successfully",null,null)
        )

    } catch (error) {
        console.log("error at handle URL delete,error:",error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(
            Respond(false,"Internal server error",null,null)
        )
    }
};

export {handleURLCreate,handleURLGet,handleURLDelete};

