import { MangoTable } from "mango-orm";
import { mango } from "../db/db.connect.js";
import {z} from "zod"

interface IUser{
    id:number,
    username:string,
    password:string,
};


const Zod_User=z.object({
    username:z.string().max(255),
    password:z.string().max(255)
});

let Users:MangoTable<IUser>;

// Initialize table after DB connection
async function initUsersTable() {
    if(mango.haveTable("users")){
        Users = mango.selectTable("users");
    }else{
        Users = await mango.createTable<IUser>("users",{
            id:mango.types().int().unique().primaryKey().notNull().autoIncrement(),
            username:mango.types().varchar(255).notNull().unique(),
            password:mango.types().text().notNull()
        });
    }
    return Users;
}


export {Users, Zod_User, initUsersTable};


