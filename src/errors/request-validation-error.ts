import { ValidationError } from "express-validator";
import {CustomError} from "./custom_error";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public error: ValidationError[]) {
        super('Invalid request validation')

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
       return this.error.map((err) => ({
            message: err.msg,
        }))
    }
}