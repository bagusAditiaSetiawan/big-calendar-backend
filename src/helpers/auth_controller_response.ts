import {IUser} from "../models/user";


export function signInResponse(token: string) {
    return {
        data: {
            access_token: token,
        }
    }
}
export function signUpResponse(user :IUser) {
    return {
        data: {
            email: user.email,
        }
    }
}

export function logoutResponse(isLogout :boolean) {
    return {
        message: "User is logout",
        data: {}
    }
}