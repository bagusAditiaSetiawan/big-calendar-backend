import {AuthController} from "../controllers/auth.controller";
import {Express, Request, Response, NextFunction} from "express"
import {AuthRequest} from "../request/auth.request";
import {ValidationRequest} from "../middleware/validate_request.middleware";
import {setUserAccess} from "../middleware/set_user_access.middleware";
import {requireAuthMiddleware} from "../middleware/required_auth.middleware";
import {JwtService} from "../services/jwt.service";


export const authRouteSetup = (app :Express, authController :AuthController, jwtService: JwtService) => {
    app.post("/api/auth/signin", AuthRequest.signin(), ValidationRequest, (req: Request, res: Response) => {
        return authController.signIn(req, res)
    })
    app.post("/api/auth/signup", AuthRequest.signup(), ValidationRequest, (req: Request, res: Response) => {
        return authController.signUp(req, res)
    })
    app.post("/api/auth/logout", (req: Request, res: Response, next: NextFunction) => {
        return setUserAccess(req, res, next, jwtService)
    }, requireAuthMiddleware, (req: Request, res: Response) => {
        return authController.logout(req, res)
    })
}