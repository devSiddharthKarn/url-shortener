import {z} from "zod"

const getZodErrorMessage=(err:z.ZodError):object[]=>{
    const formatted = err.issues.map(issue=>({field:issue.path,message:issue.message}));
    return formatted;
}

export {getZodErrorMessage};