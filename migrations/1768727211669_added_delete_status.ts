import { IMangoMigrationType, Mango } from "mango-orm";

export const added_delete_status: IMangoMigrationType = {
    name: "added_delete_status",
    timestamp: 1768727211669,

    up: async (mango: Mango) => {
        await mango.selectTable("urls").addColumns({
            isDeleted: mango.types().boolean().notNull().byDefault(false)

        }).execute();

        console.log("✓ Migration added_delete_status completed");
    },

    down: async (mango: Mango) => {
        await mango.selectTable("urls").removeColumns(["urls"]).execute();
        console.log("✓ Rollback added_delete_status completed");
    }
};
