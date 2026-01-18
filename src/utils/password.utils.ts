import bcrypt from "bcrypt"

const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT_ROUND));

function hashPassword(password:string):string{
    const hashed = bcrypt.hashSync(password,salt);
    return hashed;
}

function comparePassword(plain:string,hashed:string):boolean{
    const isMatched = bcrypt.compareSync(plain,hashed);
    return isMatched;
}

export {hashPassword,comparePassword};