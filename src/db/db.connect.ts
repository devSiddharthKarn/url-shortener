import { Mango } from "mango-orm";

const mango = new Mango();

const connectDB = async()=>{
    try {
        await mango.connect({
            host:process.env.DB_HOST as string,
            user:process.env.DB_USER as string,
            password:process.env.DB_PASSWORD as string,
            database:process.env.DB_NAME as string
        });

        console.log("Mango connected to SQL DB");
    } catch (error:any) {
        throw new Error("error connecting to DB, error:"+error);
    }

}

export {mango,connectDB}