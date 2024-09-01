import { Request, Response} from "express";
import {EventService} from "../services/event.service";
import {eventPaginateResponse, eventResponse} from "../helpers/event_controller_response";
import {NotFoundError} from "../errors/not-found-error";


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
        res.send(eventPaginateResponse(events))
    }

    async create(req: Request, res: Response): Promise<void> {
        const event  = await this.eventService.create(req.body);
        res.status(201).send(eventResponse(event))
    }

    async update(req: Request, res: Response): Promise<void> {
        const event  = await this.eventService.update(req.body);
        res.send(eventResponse(event))
    }

    async findOne(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const event  = await this.eventService.findOne(id);
        if(!event) {
            throw new NotFoundError("Event is not found")
        }
        res.send(eventResponse(event))
    }

    async deleteOne(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const event  = await this.eventService.delete(id);
        res.status(201).send(eventResponse(event))
    }

    async sendEmail(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const event  = await this.eventService.sendEmail(id);
        res.send(eventResponse(event))
    }
}