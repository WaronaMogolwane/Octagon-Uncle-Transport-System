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
} from "../Models/AuthenticationModel";
import { randomUUID } from "crypto";
import { User } from "../Classes/User";
import {
  GetUserByEmail,
  InsertNewUser,
  InsertOtp,
} from "../Models/AuthenticationModel";
import { CreateOtp, IsOtpVaid } from "../Models/OtpModel";
import { Email } from "../Classes/Email";
import { UserCredentials } from "../Classes/UserCredentials";
import { CreateOtpEmailHtml, SendEmail } from "../Models/EmailModel";
import { UserInvitation } from "../Classes/UserInvitation";
import { ErrorResponse } from "../Classes/ErrorResponse";
let errorResponse: ErrorResponse;
export const CheckIfUserExists = async (req: any, res: any, next: any) => {
  if (await GetUserByEmail(req.body.userDetails.Email)) {
    res.status(400).send("User account already exists");
  } else {
    next();
  }
};
export const RegisterUser = async (req: any, res: any, next: any) => {
  let err: ErrorResponse;
  let newUserId = randomUUID();
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
      err = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      await InsertUserBusinessLink(
        newUser.userId,
        newUser.businessId,
        (error: any, result: any) => {
          if (error) {
            next(err);
          } else {
            req.body.UserId = newUser.userId;
            req.body.successMessage = "User successfully created.";
            next();
          }
        },
      );
    }
  });
};
export const SendEmailOtp = async (req: any, res: any, next: any) => {
  let userDetails: any = req.body.userDetails;
  let otp: string = CreateOtp(5);
  const message =
    "Thank you for choosing Octagon Uncle. Use the following OTP to complete your Sign Up procedures.";
  let emailData: Email = {
    fromName: "Octagona Uncle OTP",
    fromAddress: process.env.OTP_FROM_ADDRESS,
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
export const VerifyOtp = async (req, res, next) => {
  let errorResponse: ErrorResponse;
  let email: string = req.body.email;
  let otp: string = req.body.otp;
  await GetOtp(email, otp, async (error, result) => {
    if (error) {
      errorResponse = {
        message: error,
        status: error.message,
      };
      next(errorResponse);
    } else {
      if (result[0][0]) {
        let otpExpireDate = new Date(result[0][0].OtpExpireDate);
        if (IsOtpVaid(otpExpireDate)) {
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
export const UserLogin = async (req, res, next) => {
  let userLogin: UserCredentials = {
    email: req.body.email,
    password: req.body.password,
  };
  await GetUserByEmailPassword(userLogin, (error, result) => {
    if (error) {
      next(new ErrorResponse(400, error.message));
    } else {
      if (result[0][0]) {
        req.body.successMessage = "User successfully logged in.";
        next();
      } else {
        res.status(400).send(new ErrorResponse(400, "User not found."));
      }
    }
  });
};
export const VerifyUserInvitation = async (req, res, next) => {
  const invitationCode: string = req.body.invitationCode;
  const userRole: string = req.body.userRole;
  await GetUserInvitation(invitationCode, userRole, async (error, result) => {
    if (error) {
      errorResponse = {
        message: error,
        status: error.message,
      };
      next(errorResponse);
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
    fromAddress: process.env.OTP_FROM_ADDRESS,
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
      errorResponse = {
        status: 400,
        message: error.message,
      };
      next(errorResponse);
    } else {
      SendEmail(emailData).then(
        (value) => {
          res.status(200).send("User invitation sent.");
        },
        (error) => {
          next(error);
        },
      );
    }
  })
}
export const GetPendingInvitations = async (req, res, next) => {
  let businessId = req.query.businessId;
  let userRole = req.query.userRole;
  await GetInvitationsByBusinessIdUserRole(businessId, userRole, (error, result) => {
    if (error) {
      next(new ErrorResponse(400, error.message));
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
export const GetBusinessDrivers = async (req, res, next) => {
  let businessId = req.query.businessId;
  await GetDriversByBusinessId(businessId, (error, result) => {
    if (error) {
      next(new ErrorResponse(400, error.message));
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
export const GetBusinessClients = async (req, res, next) => {
  let businessId = req.query.businessId;
  await GetClientsByBusinessId(businessId, (error, result) => {
    if (error) {
      next(new ErrorResponse(400, error.message));
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
export const RemoveUserInvitation = async (req, res, next) => {
  let userInviteId = req.body.UserInvitationId;
  let userRole = req.body.UserRole;
  await DeleteUserInvitation(userInviteId, userRole, (error, result) => {
    if (error) {
      next(new ErrorResponse(400, error.message));
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
export const DeactivateUser = async (req, res, next) => {
  let userId = req.body.UserId;
  let userRole = req.body.UserRole;
  await UpdateUserToNotActive(userId, userRole, (error, result) => {
    if (error) {
      next(new ErrorResponse(400, error.message));
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
export { GetClientsByBusinessId };

