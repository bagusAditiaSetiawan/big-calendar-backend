

import { NextFunction, Response, Request } from "express";
import { NotAuthorizeError } from "../errors/not-authorize-error";

export const requireAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!req.user) throw new NotAuthorizeError();
    next();
}