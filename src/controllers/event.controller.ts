import { Request, Response} from "express";
import {AuthService} from "../services/auth.service";
import {logoutResponse, signInResponse, signUpResponse} from "../helpers/auth_controller_response";
import {getToken, UserAuthenticatedRequest} from "../middleware/set_user_access.middleware";
import {EventService, EventServiceImpl} from "../services/event.service";
import {Types} from "mongoose";


export interface EventController {
    paginate(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    findOne(req: Request, res: Response): Promise<void>;
    deleteOne(req: Request, res: Response): Promise<void>;
}

export class EventController implements EventController {
    constructor(private readonly  eventService: EventService) {}

    async paginate(req: Request, res: Response): Promise<void> {
        const events  = await this.eventService.paginate()
        res.send(events)
    }

    async create(req: Request, res: Response): Promise<void> {
        const event  = await this.eventService.create(req.body);
        res.status(201).send(event)
    }

    async update(req: Request, res: Response): Promise<void> {
        const event  = await this.eventService.update(req.body);
        res.send(event)
    }

    async findOne(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const event  = await this.eventService.findOne(id);
        res.send(event)
    }

    async deleteOne(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const event  = await this.eventService.delete(id);
        res.status(201).send(event)
    }

    async sendEmail(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const event  = await this.eventService.sendEmail(id);
        res.send(event)
    }
}