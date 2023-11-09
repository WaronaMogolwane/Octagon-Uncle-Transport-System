import dotenv from "dotenv";
import { UserDetail } from "../Classes/UserDetail";
import { DbClient } from "../Services/DatabaseService";
dotenv.config();

export const AddUserDetailData = async (
  userDetail: UserDetail,
  callback: (error, result) => void
) => {
  DbClient.connect((err) => {
    DbClient.query(
      "CALL public.sp_insert_new_user_detail($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::text,$10::text)",
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
        DbClient.end();
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
      }
    );
  });
};

export const GetUserDetailData = async (
  userId: string,
  callback: (error, result) => void
) => {
  DbClient.connect((err) => {
    DbClient.query(
      `select * from sp_get_user_detail('${userId}');`,
      (err, res) => {
        DbClient.end();
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
      }
    );
  });
};

export const UpdateUserDetailData = async (
  userDetail: UserDetail,
  callback: (error, result) => void
) => {
  DbClient.connect((err) => {
    DbClient.query(
      "CALL public.sp_update_user_detail($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::text)",
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
        DbClient.end();
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
      }
    );
  });
};

// export const GetAllUserDetailData = async (
//   userId: string,
//   callback: (error, result) => void
// ) => {
//   DbClient.connect((err) => {
//     DbClient.query(
//       `select * from sp_get_user_detail('${userId}');`,
//       (err, res) => {
//         DbClient.end();
//         if (err) {
//           callback(err, null);
//         } else {
//           callback(null, res);
//         }
//       }
//     );
//   });
// };
