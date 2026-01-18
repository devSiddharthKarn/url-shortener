function Respond(success:boolean,message:string,data:any,error:any):object{

    const object:object={
        success:success,
        message:message,
        data:data,
        error:error
    }


    return object;
}

export {Respond}