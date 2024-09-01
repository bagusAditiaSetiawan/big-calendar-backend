import { Request, Response} from "express";
import {AuthService} from "../services/auth.service";
import {logoutResponse, signInResponse, signUpResponse} from "../helpers/auth_controller_response";
import {getToken, UserAuthenticatedRequest} from "../middleware/set_user_access.middleware";


export interface AuthController {
    signIn(req: Request, res: Response): Promise<void>;
    signUp(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
}

export class AuthControllerImpl implements AuthController {
    constructor(private readonly  authService: AuthService) {}

    async signIn(req: Request, res: Response): Promise<void> {
        const token  = await this.authService.signIn(req.body);
        res.send(signInResponse(token))
    }

    async signUp(req: Request, res: Response): Promise<void> {
        const user  = await this.authService.signUp(req.body);
        res.status(201).send(signUpResponse(user))
    }
    async logout(req: UserAuthenticatedRequest, res: Response): Promise<void> {
        const token = getToken(req.headers.authorization)
        const isLogout  = await this.authService.logout(req.user, token);
        res.status(201).send(logoutResponse(isLogout))
    }

}