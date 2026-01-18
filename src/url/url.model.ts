import { MangoTable } from "mango-orm";
import { mango } from "../db/db.connect.js";
import {z} from "zod"


interface IURL{
    id:number,
    mappedURL:string,
    originalURL:string,
    createdBy:number,
    isDeleted:boolean
};


const Zod_URL = z.object({
    originalURL:z.string()
});


const Zod_URL_Delete = z.object({
    mappedURL:z.string()
});

let URLs:MangoTable<IURL>;
async function initURLTable(){
    if(mango.haveTable("urls")){
        URLs = mango.selectTable("urls");
    }else{
        URLs =await mango.createTable<IURL>("urls",{
            id:mango.types().int().primaryKey().unique().autoIncrement(),
            mappedURL:mango.types().varchar(255).notNull().unique(),
            originalURL:mango.types().text().notNull(),
            createdBy:mango.types().int().notNull(),
            isDeleted:mango.types().boolean().notNull().byDefault(true)
        });
    }
}

export {initURLTable,URLs,Zod_URL,Zod_URL_Delete};