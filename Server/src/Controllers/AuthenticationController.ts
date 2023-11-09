import { randomUUID } from "crypto";
import { User } from "../Classes/User";
import { GetUserByEmail, AddNewUser, InsertNewUser } from "../Models/DatabaseModel";
import Router from 'express-promise-router';
import { SendEmail } from "../Models/EmailModel";
import { CreateEmailHtml, CreateOtp } from "../Models/OtpModel";
import { Email } from "../Classes/Email";

export const CheckIfUserExists = async (req: any, res: any, next: any) => {
  if (await GetUserByEmail(req.body.userDetails.Email)) {
    res.status(400).send("User account already exists");
  } else {
    next();
  }
};

export const RegisterUser = async (req: any, res: any, next: any) => {
  let newUser = new User(
    randomUUID(),
    req.body.Email,
    req.body.Password,
    req.body.Cellphone,
    req.body.Status,
    req.body.LastLogin,
    req.body.UserRole
  );

  await InsertNewUser(newUser, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message
      }
      next(err);
    }
    else {
      res.status(200).json({
        UserCreated: true
      })
    }
  }
  );
};

export const SendEmailOtp = async (req: any, res: any, next: any) => {
  let toAddress = req.body.email;
  let otp: string = CreateOtp();
  let emailData: Email = {
    fromName: "Octagona Uncle Transport",
    fromAddress: process.env.OTP_FROM_ADDRESS,
    toAddress: toAddress,
    subject: "Octagon Uncle OTP",
    emailHtml: CreateEmailHtml(req, otp)
  }
  SendEmail(toAddress).then(
    (value) => {
      InsertOtp(otp);
    },
    (error) => {
      res.status(400).send(error);
    }
  );
};
