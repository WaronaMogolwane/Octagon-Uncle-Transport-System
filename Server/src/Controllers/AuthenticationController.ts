import { error } from 'console';
import { randomUUID } from "crypto";
import { User } from "../Classes/User";
import { GetUserByEmail, AddNewUser, InsertNewUser, InsertOtp, CheckOtp } from "../Models/DatabaseModel";
import Router from 'express-promise-router';
import { SendEmail } from "../Models/EmailModel";
import { CreateEmailHtml, CreateOtp, IsOtpVaid } from "../Models/OtpModel";
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
  let userDetails: any = req.body.userDetails;
  let otp: string = CreateOtp();
  let emailData: Email = {
    fromName: "Octagona Uncle Transport",
    fromAddress: process.env.OTP_FROM_ADDRESS,
    toAddress: userDetails.email,
    subject: "Octagon Uncle OTP",
    emailHtml: CreateEmailHtml(userDetails, otp)
  }
  InsertOtp(userDetails.userId, userDetails.email, otp, (error, result) => {
    if (error) {
      next(error);
    }
    else {
      SendEmail(emailData).then(
        (value) => {
          res.status(200).json({
            OtpSent: true,
            Message: value
          });
        },
        (error) => {
          next(error);
        }
      );
    }
  })
}
export const VerifyOtp = async (req, res, next) => {
  let otpVarification: any = {
    OtpVerified: false,
    OtpValid: false,
  };
  try {
    var rows = await CheckOtp(req.body);
    if (rows) {
      if (IsOtpVaid(rows)) {
        res.status(201).send(
          (otpVarification = {
            OtpVerified: true,
            OtpValid: true,
          })
        );
      } else {
        res.status(400).send(
          (otpVarification = {
            OtpVerified: false,
            OtpValid: true,
          })
        );
      }
    } else {
      res.status(400).send(
        (otpVarification = {
          OtpVerified: false,
          OtpValid: false,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
};

