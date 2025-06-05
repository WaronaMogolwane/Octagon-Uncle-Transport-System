import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const {
    OUTS_SMTP_HOST: host,
    OUTS_SMTP_PORT: port,
    OUTS_SMTP_EMAIL_USER: emailUser,
    OUTS_SMTP_EMAIL_PASSWORD: emailPassword,
} = process.env;

// Create a reusable transporter object using the default SMTP transport
export const mailTransporter = nodemailer.createTransport({
    host,
    port: Number(port), // Ensure the port is explicitly cast to a number
    secure: Number(port) === 465, // Use secure mode for port 465
    auth: {
        user: emailUser,
        pass: emailPassword,
    },
});
