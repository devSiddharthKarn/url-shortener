import { IMangoMigrationType, Mango } from "mango-orm";

export const added_deleteStatus_to_URL: IMangoMigrationType = {
    name: "added_deleteStatus_to_URL",
    timestamp: 1768725109150,
    
    up: async (mango: Mango) => {
        await mango.selectTable("urls").addColumns({
            id:mango.types().int().notNull().primaryKey().autoIncrement().unique()
            
        }).execute();
        
        console.log("✓ Migration added_deleteStatus_to_URL completed");
    },
    
    down: async (mango: Mango) => {
        await mango.selectTable("urls").removeColumns(["id"]).execute();

        console.log("✓ Rollback added_deleteStatus_to_URL completed");
    }
};
