import * as dotenv from "dotenv";  
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    
    try{
        const decoded = jwt.verify(token as string, process.env.JWT_USER_SECRET as string);
        // @ts-ignore
        req.body.userid = decoded.id;
        next();

    } catch (err) {
        //console.log(err);
        res.status(401).json({message: "Unauthorized"});
    } 
    

};