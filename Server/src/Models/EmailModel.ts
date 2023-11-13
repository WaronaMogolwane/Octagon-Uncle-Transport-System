import { Email } from "../Classes/Email";
import { mailTransporter } from "../Services/EmailService";

// async..await is not allowed in global scope, must use a wrapper
export const SendEmail = async (emailData: Email) => {
  const email = {
    from: `"${emailData.fromName}" <${emailData.fromAddress}>`, // sender address
    to: emailData.toAddress, // list of receivers
    subject: emailData.subject, // Subject line
    // text: `${email.Message}`, // plain text body
    html: emailData.emailHtml, // html body
  };
  try {
    // send mail with defined transport object
    await mailTransporter.sendMail(email, null);
  } catch (error) {
    return Promise.reject(error);
  }
  return Promise.resolve("success");
};
