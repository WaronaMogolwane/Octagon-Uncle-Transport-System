import dotenv from "dotenv";
dotenv.config();
import { User } from "../Classes/User";
import { DbPool } from "../Services/DatabaseService";
import { UserCredentials } from "../Classes/UserCredentials";
import { UserInvitation } from "../Classes/UserInvitation";
import { ErrorResponse } from "../Classes/ErrorResponse";

export const InsertOtp = async (
  email: string,
  otp: string,
  callback: (error: any, result: any) => void,
) => {
  DbPool.query(
    {
      sql: "CALL InsertUserOtp(?,?)",
      timeout: 40000,
      values: [email, otp],
    },
    (err, res) => {
      //console.log(err ? err : res.rows[0].message) // Hello World!
      //
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    },
  );
};
export const GetOtp = async (
  email: string,
  otp: string,
  callback: (error: any, result: any) => void,
) => {
  DbPool.query(
    {
      sql: "CALL GetUserOtp(?,?)",
      timeout: 40000,
      values: [email, otp],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    },
  );
};
export const GetUserByEmailPassword = async (
  user: UserCredentials,
  callback: (error: any, result: any) => void,
) => {
  DbPool.query(
    {
      sql: "CALL GetUserByEmailPassword(?,?)",
      timeout: 40000,
      values: [user.email, user.password],
    },
    (err: any, res: any) => {
      if (err) {
        callback(err, null);
      }
      if (!res[0][0]) {
        let error: ErrorResponse = {
          message: "No user found.",
        };
        callback(error, null);
      } else {
        callback(null, res);
      }
    },
  );
};
export const InsertNewUser = async (
  user: User,
  callback: (error: any, result: any) => void,
) => {
  DbPool.query(
    {
      sql: "CALL InsertNewUser(?,?,?,?)",
      timeout: 40000,
      values: [user.userId, user.email, user.password, user.userRole],
    },
    (err, res) => {
      //
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    },
  );
};
export const GetUserByEmail = async (x: any) => {
  return true;
};
export const InsertUserInvitation = async (
  userInvitation: UserInvitation,
  callback: (error: any, result: any) => void,
) => {
  DbPool.query(
    {
      sql: "CALL InsertUserInvitation(?,?,?,?,?,?)",
      timeout: 40000,
      values: [
        userInvitation.businessId,
        userInvitation.invitationCode,
        userInvitation.userRole,
        userInvitation.userEmail,
        userInvitation.firstName,
        userInvitation.lastName,
      ],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    },
  );
};
export const InsertUserBusinessLink = async (
  userId: string,
  businessId: string,
  callback: (error: any, result: any) => void,
) => {
  DbPool.query(
    {
      sql: "CALL InsertUserBusinessLink(?,?)",
      timeout: 40000,
      values: [userId, businessId],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    },
  );
};
export const GetUserInvitation = async (
  invitationCode: string,
  userRole: string,
  callback: (error: any, result: any) => void,
) => {
  DbPool.query(
    {
      sql: "CALL GetUserInvitation(?,?)",
      timeout: 40000,
      values: [invitationCode, userRole],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    },
  );
};
export const IsUserInvitationValid = (userInvitationExpireDate: Date) => {
  if (userInvitationExpireDate > new Date()) {
    return true;
  } else return false;
};
export const UpdateOtpToUsed = async (
  email: string,
  otp: string,
  callback: (error: any, result: any) => void,
) => {
  DbPool.query(
    {
      sql: "CALL UpdateOtpToUsed(?,?)",
      timeout: 40000,
      values: [email, otp],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    },
  );
};
export const UpdateUserInvitationToUsed = async (
  invitationCode: string, userRole: string,
  callback: (error: any, result: any) => void,
) => {
  DbPool.query(
    {
      sql: "CALL UpdateUserInvitationToUsed(?,?)",
      timeout: 40000,
      values: [invitationCode, userRole],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    })
}
export const GetInvitationsByBusinessIdUserRole = async (businessId: string, userRole: string, callback: (error: any, result: any) => void) => {
  DbPool.query({
    sql: "CALL GetInvitationsByBusinessIdUserRole(?,?)",
    timeout: 40000,
    values: [
      businessId,
      userRole
    ],
  },
    (err, res) => {

      if (err) {
        callback(err, null);
      }
      else {
        callback(null, res);
      }
    })
}
export const GetDriversByBusinessId = async (businessId: string, callback: (error: any, result: any) => void) => {
  DbPool.query({
    sql: "CALL GetDriversByBusinessId(?)",
    timeout: 40000,
    values: [
      businessId
    ],
  },
    (err, res) => {

      if (err) {
        callback(err, null);
      }
      else {
        callback(null, res);
      }
    })
}
export const GetClientsByBusinessId = async (businessId: string, callback: (error: any, result: any) => void) => {
  DbPool.query({
    sql: "CALL GetClientsByBusinessId(?)",
    timeout: 40000,
    values: [
      businessId
    ],
  },
    (err, res) => {

      if (err) {
        callback(err, null);
      }
      else {
        callback(null, res);
      }
    })
}
export const GetParentsByBusinessId = async (businessId: string, callback: (error: any, result: any) => void) => {
  DbPool.query({
    sql: "CALL GetParentsByBusinessId(?)",
    timeout: 40000,
    values: [
      businessId
    ],
  },
    (err, res) => {

      if (err) {
        callback(err, null);
      }
      else {
        callback(null, res);
      }
    })
}
export const DeleteUserInvitation = async (userInvitationId: string, userRole: number, callback: (error: any, result: any) => void) => {
  DbPool.query({
    sql: "CALL DeleteUserInvitation(?,?)",
    timeout: 40000,
    values: [
      userInvitationId,
      userRole
    ],
  },
    (err, res) => {
      if (err) {
        callback(err, null);
      }
      else {
        callback(null, res);
      }
    })
}
export const UpdateUserToNotActive = async (
  userId: string,
  userRole: string,
  callback: (error: any, result: any) => void,
) => {
  DbPool.query(
    {
      sql: "CALL UpdateUserToNotActive(?,?)",
      timeout: 40000,
      values: [userId, userRole],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    },
  );
};



