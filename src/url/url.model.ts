import { MangoTable } from "mango-orm";
import { mango } from "../db/db.connect.js";
import {z} from "zod"


interface IURL{
    mappedURL:string,
    originalURL:string,
    createdBy:number,
};


const Zod_URL = z.object({
    originalURL:z.string()
});

let URLs:MangoTable<IURL>;
async function initURLTable(){
    if(mango.haveTable("urls")){
        URLs = mango.selectTable("urls");
    }else{
        URLs =await mango.createTable<IURL>("urls",{
            mappedURL:mango.types().varchar(255).notNull().unique(),
            originalURL:mango.types().text().notNull(),
            createdBy:mango.types().int().notNull()
        });
    }
}

export {initURLTable,URLs,Zod_URL};