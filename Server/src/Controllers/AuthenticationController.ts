import { GetOtp, GetUserByEmailPassword, } from './../Models/DatabaseModel';
import { randomUUID } from "crypto";
import { User } from "../Classes/User";
import { GetUserByEmail, InsertNewUser, InsertOtp } from "../Models/DatabaseModel";
import { CreateEmailHtml, CreateOtp, IsOtpVaid } from "../Models/OtpModel";
import { Email } from "../Classes/Email";
import { UserCredentials } from '../Classes/UserCredentials';
import { SendEmail } from '../Models/EmailModel';

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
  let email: string = req.body.email;
  let otp: string = req.body.otp;
  await GetOtp(email, otp, (error, result) => {
    if (error) {
      next(
        {
          message: error,
          status: 400
        }
      )
    }
    else {
      if (result.rows) {
        let otpExpireDate = new Date(result.rows[0].otp_expire_date);
        if (IsOtpVaid(otpExpireDate)) {
          res.status(201).send("OTP verified.");
        } else {
          res.status(400).send({
            message: "OTP expired.",
            status: 400
          }
          );
        }
      } else {
        res.status(400).send({
          message: "OTP does not exist.",
          status: 400
        }
        );
      }
    }
  });
}
export const UserLogin = async (req, res, next) => {
  let userLogin: UserCredentials = {
    email: req.body.email,
    password: req.body.password
  };
  await GetUserByEmailPassword(userLogin, (error, result) => {
    if (error) {
      next({
        message: error,
        status: 400
      });
    }
    else {
      if (result.rows) {
        res.status(200).json("User successfully logged in.")
      }
    }
  });
}