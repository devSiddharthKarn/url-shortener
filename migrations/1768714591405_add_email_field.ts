import { IMangoMigrationType, Mango } from "mango-orm";

export const add_email_field: IMangoMigrationType = {
    name: "add_email_field",
    timestamp: 1768714591405,
    
    up: async (mango: Mango) => {
        // TODO: Write your migration code here
        // Example:
        // await mango.createTable("users", {
        //     id: mango.types().int().primaryKey().autoIncrement(),
        //     username: mango.types().varchar(255).notNull().unique(),
        //     password: mango.types().varchar(255).notNull()
        // });
        
        
        console.log("✓ Migration add_email_field completed");
    },
    
    down: async (mango: Mango) => {
        // TODO: Write your rollback code here
        // Example:
        // await mango.dropTable("users");
        
        console.log("✓ Rollback add_email_field completed");
    }
};
