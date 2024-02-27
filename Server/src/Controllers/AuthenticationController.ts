import { GetOtp, GetUserByEmailPassword, GetUserInvitation, InsertUserInvitation, IsUserInvitationValid, UpdateOtpToUsed, } from '../Models/AuthenticationModel';
import { randomUUID } from "crypto";
import { User } from "../Classes/User";
import { GetUserByEmail, InsertNewUser, InsertOtp } from "../Models/AuthenticationModel";
import { CreateOtp, IsOtpVaid } from "../Models/OtpModel";
import { Email } from "../Classes/Email";
import { UserCredentials } from '../Classes/UserCredentials';
import { CreateOtpEmailHtml, SendEmail } from '../Models/EmailModel';
import { UserInvitation } from '../Classes/UserInvitation';
import { ErrorResponse } from '../Classes/ErrorResponse';
let errorResponse: ErrorResponse
export const CheckIfUserExists = async (req: any, res: any, next: any) => {
  if (await GetUserByEmail(req.body.userDetails.Email)) {
    res.status(400).send("User account already exists");
  } else {
    next();
  }
};
export const RegisterUser = async (req: any, res: any, next: any) => {
  const newUser: User = {
    userId: randomUUID(),
    email: req.body.Email,
    password: req.body.Password,
    userRole: req.body.UserRole
  };
  await InsertNewUser(newUser, (error, result) => {
    if (error) {
      let err: ErrorResponse = {
        status: 400,
        message: error.message
      }
      next(err);
    }
    else {
      req.body.successMessage = "User successfully created.";
      next();
    }
  }
  );
};
export const SendEmailOtp = async (req: any, res: any, next: any) => {
  let userDetails: any = req.body.userDetails;
  let otp: string = CreateOtp(5);
  const message = "Thank you for choosing Octagon Uncle. Use the following OTP to complete your Sign Up procedures."
  let emailData: Email = {
    fromName: "Octagona Uncle Transport",
    fromAddress: process.env.OTP_FROM_ADDRESS,
    toAddress: userDetails.email,
    subject: "Octagon Uncle OTP",
    emailMessage: message,
    emailHtml: CreateOtpEmailHtml(userDetails.firtName, message, otp)
  }
  InsertOtp(userDetails.email, otp, (err, result) => {
    let errorResponse: ErrorResponse;
    if (err) {
      errorResponse = {
        status: 400,
        message: err.message
      }
      next(errorResponse);
    }
    else {
      SendEmail(emailData).then(
        (value) => {
          res.status(200).send("OTP sent.");
        },
        (error) => {
          errorResponse = {
            status: error.responseCode || 500,
            message: error.response || "Mail Server Error: " + error
          }
          next(errorResponse);
        }
      );
    }
  })
}
export const VerifyOtp = async (req, res, next) => {
  let errorResponse: ErrorResponse;
  let email: string = req.body.email;
  let otp: string = req.body.otp;
  await GetOtp(email, otp, async (error, result) => {
    if (error) {
      errorResponse = {
        message: error,
        status: error.message
      }
      next(errorResponse);
    }
    else {
      if (result[0][0]) {
        let otpExpireDate = new Date(result[0][0].OtpExpireDate);
        if (IsOtpVaid(otpExpireDate)) {
          await UpdateOtpToUsed(email, otp, (error, result) => {
            if (error) {
              errorResponse = {
                message: error,
                status: error.message
              }
              next(errorResponse);
            }
            else {
              res.status(201).send("OTP verified.");
            }
          })
        } else {
          res.status(400).send("OTP expired.");
        }
      } else {
        res.status(400).send("OTP does not exist.");
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
      next(new ErrorResponse(400, error.message));
    }
    else {
      if (result[0][0]) {
        req.body.successMessage = "User successfully logged in.";
        next();
      }
      else {
        res.status(400).send(new ErrorResponse(400, "User not found."));
      }
    }
  });
}
export const VerifyUserInvitation = async (req, res, next) => {
  const invitationCode: string = req.body.invitationCode;
  const userRole: string = req.body.userRole;
  await GetUserInvitation(invitationCode, userRole, (error, result) => {
    if (error) {
      errorResponse = {
        message: error,
        status: error.message
      }
      next(errorResponse);
    }
    else {
      if (result[0][0]) {
        let userInvitationExpireDate = new Date(result[0][0].ExpiryDate);
        if (IsUserInvitationValid(userInvitationExpireDate)) {
          res.status(201).send("User invitation verified.");
        } else {
          res.status(400).send({
            message: "User invitation expired.",
            status: 400
          }
          );
        }
      } else {
        res.status(400).send({
          message: "User invitation does not exist.",
          status: 400
        }
        );
      }
    }
  });
}
export const SendUserInvitation = async (req: any, res: any, next: any) => {
  let userInviation: UserInvitation = {
    businessId: req.body.businessId,
    invitationCode: CreateOtp(13),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userEmail: req.body.userEmail,
    userRole: req.body.userRole
  }
  const message = "Thank you for choosing Octagon Uncle. Use the following Invitation Code to sign up."
  let emailData: Email = {
    fromName: "Octagona Uncle Transport",
    fromAddress: process.env.OTP_FROM_ADDRESS,
    toAddress: userInviation.userEmail,
    subject: "Octagon Uncle Invitation Code",
    emailMessage: message,
    emailHtml: CreateOtpEmailHtml(userInviation.firstName, message, userInviation.invitationCode)
  }
  InsertUserInvitation(userInviation, (error, result) => {
    if (error) {
      errorResponse = {
        status: 400,
        message: error.message
      }
      next(errorResponse);
    }
    else {
      SendEmail(emailData).then(
        (value) => {
          res.status(200).send("User invitation sent.");
        },
        (error) => {
          next(error);
        }
      );
    }
  })
}