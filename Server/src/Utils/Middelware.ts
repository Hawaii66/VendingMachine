import { Request, Response, NextFunction } from "express";

export function AuthToken(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers["authorization"];
    if(authHeader && authHeader.split(" ")[0] !== "Bearer"){
        return res.status(400).send("No bearer token available");
    }

    const token =  authHeader && authHeader.split(" ")[1];

    if(token === null || token === undefined){return res.status(401).send("No authrization token available");}

    if(token === process.env.ADMIN_SECRET){
        next();
    }else{
        res.status(400).send("Wrong auth token given");
    }
}

export function AuthRasp(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers["authorization"];
    if(authHeader && authHeader.split(" ")[0] !== "Bearer"){
        return res.status(400).send("No bearer token available");
    }
    
    const token =  authHeader && authHeader.split(" ")[1];

    if(token === null || token === undefined){return res.status(401).send("No authrization token available");}
    
    if(token === process.env.RASP_SECRET){
        next();
    }else{
        res.status(400).send("Wrong auth token given");
    }
}