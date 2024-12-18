import { DbPool } from "../Services/DatabaseService";

export const GetUserByUserId = async (
  userId: string,
  callback: (error: any, result: any) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetUser(?);",
      timeout: 40000,
      values: [userId],
    },
    function (error, results, fields) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

export const CheckUserEmailByEmail = async (
  email: string,
  callback: (error: any, result: any) => void
) => {
  DbPool.query(
    {
      sql: "CALL CheckUserEmail(?);",
      timeout: 40000,
      values: [email],
    },
    function (error, results, fields) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

export const UpdateUserEmailByUserId = async (
  user: any,
  callback: (error: any, result: any) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdateUserEmail(?,?);",
      timeout: 40000,
      values: [user.email, user.userId],
    },
    function (error, results, fields) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

export const UpdateUserPasswordByUserId = async (
  user: any,
  callback: (error: any, result: any) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdateUserPassword(?,?,?);",
      timeout: 40000,
      values: [user.oldPassword, user.password, user.userId],
    },
    function (error, results, fields) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};
