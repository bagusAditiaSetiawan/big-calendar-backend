import {IUser} from "../models/user";
import {IUserLogin} from "../models/user_loggin";
import {Model} from "mongoose";


export interface UserAuthService {
    createLogin(user: IUser, accessToken: string) :Promise<IUserLogin>
    createLogout(user: IUser, accessToken: string) :Promise<IUserLogin>
}

export class UserAuthServiceImpl implements UserAuthService {
    constructor(private readonly userLogin : Model<IUserLogin>) {
    }
    async createLogin(user: IUser, accessToken: string) :Promise<IUserLogin> {
        const userLogin = new this.userLogin()
        userLogin.timestamp = new Date()
        userLogin.token = accessToken;
        userLogin.user = user.id
        userLogin.status = "LOGIN"
        return await userLogin.save()
    }

    async createLogout(user: IUser, accessToken: string) :Promise<IUserLogin> {
        const userLogin = new this.userLogin()
        userLogin.timestamp = new Date()
        userLogin.token = accessToken;
        userLogin.user = user.id
        userLogin.status = "LOGOUT"
        return await userLogin.save()
    }
}

