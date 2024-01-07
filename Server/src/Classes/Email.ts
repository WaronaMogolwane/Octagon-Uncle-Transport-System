export class Email {
    fromName: string;
    fromAddress: string;
    toAddress: string;
    subject: string;
    emailMessage: string;
    emailHtml: string;

    constructor(
        fromName: string,
        fromAddress: string,
        toAddress: string,
        subject: string,
        emailMessage: string,
        emailHtml: string,
    ) {
        this.fromName = fromName;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.subject = subject;
        this.emailMessage = emailMessage;
        this.emailHtml = emailHtml;
    }
}