import dotenv from "dotenv";
dotenv.config();
import { User } from "../Classes/User";
import { DbPool } from "../Services/DatabaseService";
import { UserCredentials } from "../Classes/UserCredentials";
import { UserInvitation } from "../Classes/UserInvitation";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { randomUUID } from "node:crypto";

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
export const GetUserByEmailPassword = async (user: UserCredentials): Promise<any> => {
  return new Promise((resolve, reject) => {
    DbPool.query(
      {
        sql: "CALL GetUserByEmailPassword(?, ?)",
        timeout: 40000, // Optional timeout
        values: [user.email, user.password], // Parameterized query for security
      },
      (err: any, res: any) => {
        if (err) {
          return reject(err); // Reject with the database error
        }

        if (!res || !res[0] || !res[0][0]) {
          // Return a structured error if no user is found
          const error = new ErrorResponse(404, "No user found.");
          return reject(error);
        }

        // Resolve with the result if the user is found
        resolve(res);
      }
    );
  });
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
  const newUserId: string = randomUUID();
  DbPool.query(
    {
      sql: "CALL InsertUserInvitation(?,?,?,?,?,?,?)",
      timeout: 40000,
      values: [
        userInvitation.businessId,
        userInvitation.invitationCode,
        userInvitation.userRole,
        userInvitation.userEmail,
        userInvitation.firstName,
        userInvitation.lastName,
        newUserId
      ],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        const response = {
          result: res,
          userId: newUserId
        };
        callback(null, response);
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
export const GetUserInvitationByEmailAndUserRole = async (email: string, userRole: string, callback: (error: any, result: any) => void) => {
  DbPool.query({
    sql: "CALL GetUserInvitationByEmailUserRole(?,?)",
    timeout: 40000,
    values: [
      email,
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



