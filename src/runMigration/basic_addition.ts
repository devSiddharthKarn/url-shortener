import { IMangoMigrationType, MangoMigration } from "mango-orm";
import { add_email_field } from "../../migrations/1768714591405_add_email_field.js";
import { added_deleteStatus_to_URL } from "../../migrations/1768725109150_added_deleteStatus_to_URL.js";


import { Mango } from "mango-orm";
import { configDotenv } from "dotenv";
import { added_delete_status } from "../../migrations/1768727211669_added_delete_status.js";

configDotenv()

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

await connectDB();

const migration = new MangoMigration(mango);

migration.add(add_email_field);

migration.add(added_deleteStatus_to_URL);

migration.add(added_delete_status);

export {migration};
