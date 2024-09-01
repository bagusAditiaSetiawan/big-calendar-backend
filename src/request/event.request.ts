import { body } from "express-validator";

export class EventRequest {
    static create() {
        return [
            body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),
            body('body').notEmpty().withMessage('Body is required'),
            body('date').isISO8601().withMessage("Date is invalid"),
        ]
    }
    static update() {
        return [
            body('id').notEmpty().withMessage('ID is required'),
            ...this.create(),
        ]
    }
}