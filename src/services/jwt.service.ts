import jwt from "jsonwebtoken"


export interface UserPayload {
    email: string;
}

export interface JwtService {
    generateToken(user :UserPayload): Promise<string>
    compare(token :string): Promise<UserPayload>
}

export class JwtServiceImpl implements JwtService {
    constructor(private readonly secretKey: string) {
    }
    async generateToken(user: UserPayload): Promise<string> {
        return jwt.sign(user, this.secretKey, {
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
        });
    }
    async compare(token: string): Promise<UserPayload>{
       return jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    }
}