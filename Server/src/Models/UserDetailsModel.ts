import dotenv from "dotenv";
import { UserDetail } from "../Classes/UserDetail";
import { DbPool } from "../Services/DatabaseService";
dotenv.config();

export const InsertUserDetail = async (
  userDetail: UserDetail,
  callback: (error, result) => void
) => {
  await DbPool.query(
    `CALL public.sp_insert_new_user_detail($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::text,$10::text)`,
    [
      userDetail.userDetailId,
      userDetail.firstName,
      userDetail.lastName,
      userDetail.addressLine1,
      userDetail.addressLine2,
      userDetail.suburb,
      userDetail.city,
      userDetail.province,
      userDetail.postalcode,
      userDetail.userId,
    ],
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

export const GetUserDetailByUserId = async (
  userId: string,
  callback: (error, result) => void
) => {
  await DbPool.query(
    "select * from public.fn_get_user_detail($1::text);",
    [userId],
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

export const UpdateUserDetail = async (
  userDetail: UserDetail,
  callback: (error, result) => void
) => {
  await DbPool.query(
    `CALL public.sp_update_user_detail($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::text)`,
    [
      userDetail.userId,
      userDetail.firstName,
      userDetail.lastName,
      userDetail.addressLine1,
      userDetail.addressLine2,
      userDetail.suburb,
      userDetail.city,
      userDetail.province,
      userDetail.postalcode,
    ],
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};
