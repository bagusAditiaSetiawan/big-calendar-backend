import {Express, NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwt.service";
import {setUserAccess} from "../middleware/set_user_access.middleware";
import {requireAuthMiddleware} from "../middleware/required_auth.middleware";
import {EventController} from "../controllers/event.controller";
import {ValidationRequest} from "../middleware/validate_request.middleware";
import {EventRequest} from "../request/event.request";


export const eventRouteSetup = (app :Express, eventController :EventController, jwtService: JwtService) => {
    const validateAuth = [(req: Request, res: Response, next: NextFunction) => {
        return setUserAccess(req, res, next, jwtService)
    }, requireAuthMiddleware]

    app.post("/api/event", validateAuth, EventRequest.create(), ValidationRequest, (req: Request, res: Response) => {
        return eventController.create(req, res)
    })

    app.put("/api/event", validateAuth, EventRequest.update(), ValidationRequest, (req: Request, res: Response) => {
        return eventController.update(req, res)
    })

    app.get("/api/event", validateAuth, (req: Request, res: Response) => {
        return eventController.paginate(req, res)
    })

    app.get("/api/event/:id", validateAuth, (req: Request, res: Response) => {
        return eventController.findOne(req, res)
    })

    app.post("/api/event/send-email/:id", validateAuth, (req: Request, res: Response) => {
        return eventController.sendEmail(req, res)
    })

    app.delete("/api/event/:id", validateAuth, (req: Request, res: Response) => {
        return eventController.deleteOne(req, res)
    })
}