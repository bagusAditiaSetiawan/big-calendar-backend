import {IUser} from "../models/user";
import {Model} from "mongoose";
import {SignUpPayload} from "./auth.service";
import {PasswordService} from "./password.service";


export interface UserService {
    findByEmail(email: string): Promise<IUser | null>;
    create(payload :SignUpPayload): Promise<IUser>;
    verifyPassword(user: IUser, passwordOriginal :string): Promise<boolean>;
}


export class UserServiceImpl implements UserService {
    constructor(private userModel: Model<IUser>, private passwordService: PasswordService) {  }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.userModel.findOne({
            email: email
        })
    }

    async create(payload :SignUpPayload): Promise<IUser> {
        const user = new this.userModel()
        user.email = payload.email
        user.password = await this.passwordService.Hashing(payload.password)
        return await user.save()
    }

    async verifyPassword(user: IUser, passwordOriginal :string): Promise<boolean> {
        return await this.passwordService.Verify(passwordOriginal, user.password)
    }
}