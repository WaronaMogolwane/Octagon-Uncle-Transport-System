import {
  GetOtp,
  GetUserByEmailPassword,
  GetUserInvitation,
  InsertUserInvitation,
  IsUserInvitationValid,
  UpdateOtpToUsed,
  InsertUserBusinessLink,
  GetInvitationsByBusinessIdUserRole,
  DeleteUserInvitation,
  GetDriversByBusinessId,
  UpdateUserInvitationToUsed,
  UpdateUserToNotActive,
  GetClientsByBusinessId,
  GetUserInvitationByEmailAndUserRole,
} from "../Models/AuthenticationModel";
import { randomUUID } from "crypto";
import { User } from "../Classes/User";
import {
  GetUserByEmail,
  InsertNewUser,
  InsertOtp,
} from "../Models/AuthenticationModel";
import { CreateOtp, IsOtpValid } from "../Models/OtpModel";
import { Email } from "../Classes/Email";
import { UserCredentials } from "../Classes/UserCredentials";
import { CreateOtpEmailHtml, SendEmail } from "../Models/EmailModel";
import { UserInvitation } from "../Classes/UserInvitation";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { CustomLogger } from "../Classes/CustomLogger";
import { NextFunction, Request, Response } from "express";
let errorResponse: ErrorResponse;
export const CheckIfUserExists = async (req: any, res: any, next: any) => {
  if (await GetUserByEmail(req.body.userDetails.Email)) {
    res.status(400).send("User account already exists");
  } else {
    next();
  }
};
export const RegisterUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newUserId = req.body.UserRole === "1" ? randomUUID() : req.body.UserId;
    if (req.body.UserRole === "1") {
      req.body.BusinessId = newUserId;
    }

    const newUser: User = {
      userId: newUserId,
      email: req.body.Email,
      password: req.body.Password,
      userRole: req.body.UserRole,
      businessId: req.body.BusinessId,
    };

    await InsertNewUser(newUser, async (error, result) => {
      if (error) {
        return next(new ErrorResponse(400, error.message, error.stack));
      }

      await InsertUserBusinessLink(newUser.userId, newUser.businessId, (linkError) => {
        if (linkError) {
          return next(new ErrorResponse(400, linkError.message, linkError.stack));
        }
        req.body.UserId = newUser.userId;
        req.body.successMessage = "User successfully created.";
        next();
      });
    });
  } catch (err) {
    next(new ErrorResponse(500, 'An unexpected error occurred.', (err as Error).stack));
  }
}; export const SendEmailOtp = async (req: any, res: any, next: any) => {
  let userDetails: any = req.body.userDetails;
  let otp: string = CreateOtp(5);
  const message =
    "Thank you for choosing Octagon Uncle. Use the following OTP to complete your Sign Up procedures.";
  let emailData: Email = {
    fromName: "Octagona Uncle OTP",
    fromAddress: process.env.OUTS_SMTP_OTP_FROM_ADDRESS,
    toAddress: userDetails.email,
    subject: "Your otp is: " + otp,
    emailMessage: message,
    emailHtml: CreateOtpEmailHtml(userDetails.firstName, message, otp),
  };
  InsertOtp(userDetails.email, otp, (err, result) => {
    let errorResponse: ErrorResponse;
    if (err) {
      errorResponse = {
        status: 400,
        message: err.message,
      };
      next(errorResponse);
    } else {
      SendEmail(emailData).then(
        (value) => {
          res.status(200).send("OTP sent.");
        },
        (error) => {
          errorResponse = {
            status: error.responseCode || 500,
            message: error.response || "Mail Server Error: " + error,
          };
          next(errorResponse);
        },
      );
    }
  });
};
export const VerifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  let errorResponse: ErrorResponse;
  let email: string = req.body.email;
  let otp: string = req.body.otp;
  await GetOtp(email, otp, async (error, result) => {
    if (error) {
      const err: Error = new Error(error.message)
      next(new ErrorResponse(400, err.message, err.stack));
    } else {
      if (result[0][0]) {
        let otpExpireDate = new Date(result[0][0].OtpExpireDate);
        if (IsOtpValid(otpExpireDate)) {
          await UpdateOtpToUsed(email, otp, (error, result) => {
            if (error) {
              errorResponse = {
                message: error,
                status: error.message,
              };
              next(errorResponse);
            } else {
              res.status(201).send("OTP verified.");
            }
          });
        } else {
          res.status(400).send("OTP expired.");
        }
      } else {
        res.status(400).send("OTP does not exist.");
      }
    }
  });
};
export const UserLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Input validation
    const { email, password } = req.body;

    if (!email || !password) {
      // Throw an error if the email or password is missing
      throw new ErrorResponse(400, "Email and password are required.");
    }

    // Create user login credentials
    const userLogin: UserCredentials = { email, password };

    // Fetch user by email and password (async function assumed)
    const result = await GetUserByEmailPassword(userLogin);

    if (result[0] && result[0][0]) {
      // Attach user information to the request object for further processing
      req.body.UserId = result[0][0].UserId;
      req.body.BusinessId = result[0][0].BusinessId;
      req.body.UserRole = result[0][0].UserRole;
      req.body.Email = result[0][0].Email;
      req.body.successMessage = "User successfully logged in.";

      next(); // Pass to the next middleware or controller
    } else {
      // Handle the case where the user is not found
      throw new ErrorResponse(400, "User not found.");
    }
  } catch (error) {
    // Pass the error to the custom error handler
    next(JSON.stringify(error));
  }
};
export const VerifyUserInvitation = async (req: Request, res: Response, next: NextFunction) => {
  const invitationCode: string = req.body.invitationCode;
  const userRole: string = req.body.userRole;
  await GetUserInvitation(invitationCode, userRole, async (error, result) => {
    if (error) {
      const err: Error = new Error(error.message)
      next(new ErrorResponse(400, err.message, err.stack));
    } else {
      if (result[0][0]) {
        let userInvitation = result[0][0];
        let userInvitationExpireDate = new Date(userInvitation.ExpiryDate);
        if (IsUserInvitationValid(userInvitationExpireDate)) {
          await UpdateUserInvitationToUsed(invitationCode, userRole, (error, result) => {
            if (error) {
              errorResponse = {
                message: error,
                status: error.message,
              };
              next(errorResponse);
            }
            else {
              res
                .status(201)
                .send({ Message: "User invitation verified.", Data: userInvitation });
            }
          })
        } else {
          res.status(400).send({
            message: "User invitation expired.",
            status: 400,
          });
        }
      } else {
        res.status(400).send({
          message: "User invitation does not exist.",
          status: 400,
        });
      }
    }
  });
};
export const SendUserInvitation = async (req: any, res: any, next: any) => {
  let userInviation: UserInvitation = {
    businessId: req.body.businessId,
    invitationCode: CreateOtp(13),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userEmail: req.body.userEmail,
    userRole: req.body.userRole,
  };
  const message =
    "Thank you for choosing Octagon Uncle. Use the following Invitation Code to sign up.";
  let emailData: Email = {
    fromName: "Octagona Uncle Invitation",
    fromAddress: process.env.OUTS_SMTP_OTP_FROM_ADDRESS,
    toAddress: userInviation.userEmail,
    subject: "Your invitation code is: " + userInviation.invitationCode,
    emailMessage: message,
    emailHtml: CreateOtpEmailHtml(
      userInviation.firstName,
      message,
      userInviation.invitationCode,
    ),
  };
  InsertUserInvitation(userInviation, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message)
      next(new ErrorResponse(400, err.message, err.stack));
    } else {
      SendEmail(emailData).then(
        (value) => {
          res.status(200).json(result)
        },
        (error) => {
          next(error);
        },
      );
    }
  })
}
export const GetInvitationByEmailAndRole = async (req: Request, res: Response, next: NextFunction) => {
  let email: string = req.query.email.toString();
  let userRole: string = req.query.userRole.toString();
  await GetUserInvitationByEmailAndUserRole(email, userRole, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message)
      next(new ErrorResponse(400, err.message, err.stack));

    }
    else {
      if (result[0]) {
        res.status(200).json(result[0]);
      }
      else {
        res.status(400).send(new ErrorResponse(400, "No pending invitations found."));
      }
    }
  });
}
export const GetPendingInvitations = async (req: Request, res: Response, next: NextFunction) => {
  let businessId: string = req.query.businessId.toString();
  let userRole: string = req.query.userRole.toString();
  await GetInvitationsByBusinessIdUserRole(businessId, userRole, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message)
      next(new ErrorResponse(400, err.message, err.stack));

    }
    else {
      if (result[0]) {
        res.status(200).send(result[0]);
      }
      else {
        res.status(400).send(new ErrorResponse(400, "No pending invitations found."));
      }
    }
  });
}
export const GetBusinessDrivers = async (req: Request, res: Response, next: NextFunction) => {
  let businessId: string = req.query.businessId.toString();
  await GetDriversByBusinessId(businessId, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message)
      next(new ErrorResponse(400, err.message, err.stack));

    }
    else {
      if (result[0]) {
        res.status(200).send(result[0]);
      }
      else {
        res.status(400).send(new ErrorResponse(400, "No drivers found."));
      }
    }
  });
}
export const GetBusinessClients = async (req: Request, res: Response, next: NextFunction) => {
  let businessId: string = req.query.businessId.toString();
  await GetClientsByBusinessId(businessId, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message)
      next(new ErrorResponse(400, err.message, err.stack));

    }
    else {
      if (result[0]) {
        res.status(200).send(result[0]);
      }
      else {
        res.status(400).send(new ErrorResponse(400, "No drivers found."));
      }
    }
  });
}
export const RemoveUserInvitation = async (req: Request, res: Response, next: NextFunction) => {
  let userInviteId = req.body.UserInvitationId;
  let userRole = req.body.UserRole;
  await DeleteUserInvitation(userInviteId, userRole, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message)
      next(new ErrorResponse(400, err.message, err.stack));

    }
    else {
      if (result.affectedRows !== 0) {
        res.status(200).send("User invitation deleted.");
      }
      else {
        res.status(400).send(new ErrorResponse(400, "User invitation not found."));
      }
    }
  });
}
export const DeactivateUser = async (req: Request, res: Response, next: NextFunction) => {
  let userId = req.body.UserId;
  let userRole = req.body.UserRole;
  await UpdateUserToNotActive(userId, userRole, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message)
      next(new ErrorResponse(400, err.message, err.stack));

    }
    else {
      if (result.affectedRows === 1) {
        res.status(200).send("User Deactivated.");
      }
      else {
        res.status(400).send(new ErrorResponse(400, "User not deactivated. No user found."));
      }
    }
  });
}

