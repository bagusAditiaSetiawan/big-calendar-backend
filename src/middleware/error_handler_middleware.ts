import {NextFunction, Response, Request} from "express";
import {CustomError} from "../errors/custom_error";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error.message);
    if(error instanceof  CustomError) {
        return res.status(error.statusCode).json({
            errors: error.serializeErrors(),
        })
    }

    res.status(500).json({
        msg: [{message: 'Something went wrong'}]
    })
}