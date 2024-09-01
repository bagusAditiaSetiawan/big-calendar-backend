import {IUser} from "../models/user";
import {UserService} from "./user.service";
import {NotAuthorizeError} from "../errors/not-authorize-error";
import {BadRequestError} from "../errors/badrequest-error";
import {JwtService, UserPayload} from "./jwt.service";
import {UserAuthService} from "./user_auth.service";
import {NotFoundError} from "../errors/not-found-error";

export interface SignInPayload {
    email: string;
    password: string;
}

export interface SignUpPayload {
    email: string;
    password: string;
}

export interface AuthService {
    signIn(payload :SignInPayload): Promise<string>;
    signUp(payload :SignUpPayload): Promise<IUser>;
    logout(user :UserPayload, token :string): Promise<boolean>;
}

export class AuthServiceImpl implements AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService :JwtService, private userAuthService :UserAuthService) {}

    async signIn(payload: SignInPayload): Promise<string> {
        const user = await this.userService.findByEmail(payload.email);
        if (!user) {
            throw new NotAuthorizeError()
        }
        const isMatched = await this.userService.verifyPassword(user, payload.password);
        if (!isMatched) {
            throw new NotAuthorizeError()
        }
        const token = await this.jwtService.generateToken({
            email: user.email
        })

        await this.userAuthService.createLogin(user, token)

        return token
    }

    async signUp(payload: SignUpPayload): Promise<IUser> {
        const existingUser = await this.userService.findByEmail(payload.email);
        if (existingUser) {
            throw new BadRequestError("user is already exist")
        }
        return await this.userService.create(payload)
    }

    async  logout(user :UserPayload, token :string): Promise<boolean> {
        const existingUser = await this.userService.findByEmail(user.email);
        if(!existingUser) {
            throw new NotFoundError("User is not found")
        }
        await this.userAuthService.createLogout(existingUser, token)
        return true
    }
}