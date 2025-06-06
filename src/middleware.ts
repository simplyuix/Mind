import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken' ;

declare global {
    namespace Express {
        interface Request {
            userid?: string;
        }
    }
}

export const usrMiddleware = (req : Request , res : Response , next : NextFunction)=>{
    const header = req.headers["authorization"]
    const  decoded = jwt.verify(header as string ,process.env.secretKey as string) as any
    console.log("Decoded JWT:", decoded); // ✅ Add this line
    console.log("decoded.userid:", decoded.userid); 
    if(decoded){
        req.userid = decoded.userid ;
        next()
    }else{
        res.status(403).json({
            message : "Not loggedin!"
        })
    }

} 