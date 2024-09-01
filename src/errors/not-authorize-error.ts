import { CustomError } from "./custom_error";

export class NotAuthorizeError extends CustomError {
    statusCode = 403;
    constructor(message?: string) {
        super(message ?? "Not Authorized")

        Object.setPrototypeOf(this, NotAuthorizeError.prototype);
    }

    serializeErrors() {
        return [{message: this.message}]
    }
}