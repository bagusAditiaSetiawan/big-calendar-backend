
import { MailerSend, EmailParams } from "mailersend";


export interface EmailSendPayload {
    recipient: {
        name: string
        email: string
    }
    subject: string
    templateHtml: string
}

export interface MailerService {
    send(emailSendPayload: EmailSendPayload): Promise<void>;
}

export class MailerSendService implements MailerService {
    constructor(private readonly mailerSend: MailerSend, private sender_name: string, private sender_email: string) {}
    async send(emailSendPayload: EmailSendPayload): Promise<void> {
        try {
            const { recipient, subject, templateHtml } = emailSendPayload;
            const emailParams = new EmailParams()
                .setFrom({
                    email: this.sender_email,
                    name: this.sender_name,
                })
                .setTo([{
                    email: recipient.email,
                    name: recipient.name,
                }])
                .setSubject(subject)
                .setHtml(templateHtml)
            this.mailerSend.email.send(emailParams)
        } catch (err) {
            console.log(err, "error email");
        }
    }
}