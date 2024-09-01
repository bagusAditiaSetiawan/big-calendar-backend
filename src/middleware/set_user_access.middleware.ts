import {JwtService, UserPayload} from "../services/jwt.service";
import { NextFunction, Request, Response } from "express";


export interface UserAuthenticatedRequest extends Request{
    user: UserPayload,
}


const authSplit = (headerAuth: string) => {
    return headerAuth.split(" ");
}

export const getToken = (headerAuth: string | undefined) => {
    if(!headerAuth) return "";
    return headerAuth.split(" ")[1];
}

const isBearer = (authorization: string[]) => {
    return authorization[0] === 'Bearer' && authorization.length <= 1
}

export const setUserAccess = async (req: Request, res: Response, next: NextFunction, jwtService :JwtService) => {
    try{
        if(!req.headers.authorization) {
            return next();
        }
        const authParts = authSplit(req.headers.authorization);
        if(isBearer(authParts)) {
            return next();
        }
        const token = authParts[1];
        req.user = await jwtService.compare(token);
    } catch(err) {
        next()
    };
    next();
}