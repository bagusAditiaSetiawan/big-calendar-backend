import { CustomError } from "./custom_error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor(private readonly reason: string = "Request not found'") {
        super('Request not found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{message: this.reason}]
    }
}