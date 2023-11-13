export class Email {
    fromName: string;
    fromAddress: string;
    toAddress: string;
    subject: string;
    emailHtml: string;

    constructor(
        fromName: string,
        fromAddress: string,
        toAddress: string,
        subject: string,
        emailHtml: string,
    ) {
        this.fromName = fromName;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.subject = subject;
        this.emailHtml = emailHtml;
    }
}