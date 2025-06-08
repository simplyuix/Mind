import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const usrMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    
    if (!token) {
        res.status(403).json({
            message: "You are not logged in"
        });
        return;
    }
    
    try {
        const decoded = jwt.verify(token, process.env.secretKey!) as JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
};