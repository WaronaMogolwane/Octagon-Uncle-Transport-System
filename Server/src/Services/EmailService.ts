import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
const host = process.env.OUTS_SMTP_HOST;
const port = process.env.OUTS_SMTP_PORT;
const emailUser = process.env.OUTS_SMTP_EMAIL_USER;
const emailPassword = process.env.OUTS_SMTP_EMAIL_PASSWORD;

// create reusable transporter object using the default SMTP transport
export const mailTransporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: true, // true for 465, false for other ports
    auth: {
        user: emailUser, // generated ethereal user
        pass: emailPassword, // generated ethereal password
    },
});