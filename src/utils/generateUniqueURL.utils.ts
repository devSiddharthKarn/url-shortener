import { nanoid } from "nanoid";

function generateUniqueURL():string{
    const uniqueURL = nanoid(6);
    return uniqueURL;
};

export {generateUniqueURL}