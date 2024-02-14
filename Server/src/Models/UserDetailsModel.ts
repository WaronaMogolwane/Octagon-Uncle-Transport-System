import dotenv from "dotenv";
import { UserDetail } from "../Classes/UserDetail";
import { DbPool } from "../Services/DatabaseService";
dotenv.config();

export const InsertUserDetail = async (
  userDetail: UserDetail,
  callback: (error, result) => void
) => {
  console.log(userDetail);
  DbPool.query(
    {
      sql: "CALL InsertNewUserDetail(?,?,?,?,?,?,?,?,?,?,?);",
      timeout: 40000,
      values: [
        userDetail.userDetailId,
        userDetail.firstName,
        userDetail.lastName,
        userDetail.cellphone,
        userDetail.addressLine1,
        userDetail.addressLine2,
        userDetail.suburb,
        userDetail.city,
        userDetail.province,
        userDetail.postalcode,
        userDetail.userId,
      ],
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

export const GetUserDetailByUserId = async (
  userId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetUserDetail(?);",
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

export const UpdateUserDetail = async (
  userDetail: UserDetail,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdateUserDetail(?,?,?,?,?,?,?,?,?,?,?);",
      timeout: 40000,
      values: [
        userDetail.userDetailId,
        userDetail.firstName,
        userDetail.lastName,
        userDetail.cellphone,
        userDetail.addressLine1,
        userDetail.addressLine2,
        userDetail.suburb,
        userDetail.city,
        userDetail.province,
        userDetail.postalcode,
        userDetail.userId,
      ],
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
