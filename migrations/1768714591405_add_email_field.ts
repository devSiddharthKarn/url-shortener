import { IMangoMigrationType, Mango } from "mango-orm";

export const add_email_field: IMangoMigrationType = {
    name: "add_email_field",
    timestamp: 1768714591405,
    
    up: async (mango: Mango) => {
        await mango.selectTable("users").addColumns({
            email:mango.types().varchar(255).notNull()
        }).execute();
        
        
        console.log("✓ Migration add_email_field completed");
    },
    
    down: async (mango: Mango) => {
        await mango.selectTable("users").removeColumns(["email"]).execute();

        console.log("✓ Rollback add_email_field completed");
    }
};
