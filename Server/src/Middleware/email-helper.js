"use strict";
require('dotenv').config();

const nodemailer = require("nodemailer");
const { promises } = require('nodemailer/lib/xoauth2');

const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: true, // true for 465, false for other ports
    auth: {
        user: emailUser, // generated ethereal user
        pass: emailPassword, // generated ethereal password
    },
});
// async..await is not allowed in global scope, must use a wrapper
async function SendEmail(email) {
    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"${email.fromName}" <${email.fromAddress}>`, // sender address
            to: email.toAddress, // list of receivers
            subject: email.subject, // Subject line
            // text: `${email.Message}`, // plain text body
            html: email.emailHtml, // html body
        });
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve('success');
}
module.exports = { SendEmail }