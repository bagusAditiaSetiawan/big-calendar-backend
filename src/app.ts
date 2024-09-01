import express, { Express } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import {connectDB} from "./database/mongoose";
import {AuthControllerImpl} from "./controllers/auth.controller";
import {authRouteSetup} from "./routes/auth_setup";
import {errorHandler} from "./middleware/error_handler_middleware";
import {UserServiceImpl} from "./services/user.service";
import {User} from "./models/user";
import {Event} from "./models/event";
import { UserLogin} from "./models/user_loggin"
import {AuthServiceImpl} from "./services/auth.service";
import {NotFoundError} from "./errors/not-found-error";
import {PasswordServiceImpl} from "./services/password.service";
import {JwtServiceImpl} from "./services/jwt.service";
import {MailerSend} from "mailersend";
import {UserAuthServiceImpl} from "./services/user_auth.service";
import passport from "passport";
import {EventServiceImpl} from "./services/event.service";
import {MailerSendService} from "./services/mailer.service";
import {EventController} from "./controllers/event.controller";
import {eventRouteSetup} from "./routes/event_setup";
dotenv.config();

const {
    JWT_SECRET = "",
    ACCESS_TOKEN_MAILER_SEND = "",
    MAIL_SENDER_NAME = "",
    MAIL_SENDER_EMAIL = "",
} = process.env

const runningApp = async () => {
    const { MONGODB_URL = "" } = process.env

    await connectDB(MONGODB_URL)

    const app: Express = express();
    const port = process.env.PORT;

    app.use(passport.initialize());

    const mailerSend = new MailerSend({
        apiKey: ACCESS_TOKEN_MAILER_SEND,
    })

    const jwtService = new JwtServiceImpl(JWT_SECRET)
    const passwordService = new PasswordServiceImpl()
    const userService = new UserServiceImpl(User, passwordService)
    const userAuthService = new UserAuthServiceImpl(UserLogin)
    const authService = new AuthServiceImpl(userService, jwtService, userAuthService);
    const authController = new AuthControllerImpl(authService)

    const mailService = new MailerSendService(mailerSend, MAIL_SENDER_NAME, MAIL_SENDER_EMAIL)
    const eventService = new EventServiceImpl(Event, mailService)
    const eventController = new EventController(eventService)

    app.use(express.json())

    app.get("/health", (req, res) => {
        return res.send("Big calendar is running")
    })
    authRouteSetup(app, authController, jwtService)
    eventRouteSetup(app, eventController, jwtService)

    app.all("*", async (req, res) => {
        throw new NotFoundError();
    })
    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });

}



runningApp()