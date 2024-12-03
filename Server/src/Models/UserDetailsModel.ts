import dotenv from "dotenv";
import { UserDetail } from "../Classes/UserDetail";
import { DbPool } from "../Services/DatabaseService";
dotenv.config();

export const InsertUserDetail = async (
  userDetail: UserDetail,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL InsertNewUserDetail(?,?,?,?,?,?,?,?,?,?,?);",
      timeout: 40000,
      values: [
        userDetail.userDetailId,
        userDetail.firstName,
        userDetail.lastName,
        userDetail.phoneNumber,
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

export const GetUserDetailProfileImageByUserId = async (
  userId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetUserProfileImage(?);",
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
        userDetail.phoneNumber,
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

export const UpdateProfileImageUrlByUserId = async (
  user: any,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdateUserProfileImageUrl(?,?);",
      timeout: 40000,
      values: [user.imagePath, user.userId],
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

export const DeleteProfileImageUrlByUserId = async (
  userId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL DeleteUserDetailImage(?);",
      timeout: 40000,
      values: userId,
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
