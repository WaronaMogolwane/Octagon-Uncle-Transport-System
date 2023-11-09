import dotenv from "dotenv";
import { Passenger } from "../Classes/Passenger";
import { DbClient } from "../Services/DatabaseService";
dotenv.config();

export const AddPassengerData = async (
  passenger: Passenger,
  callback: (error, result) => void
) => {
  DbClient.connect((err) => {
    DbClient.query(
      "CALL public.sp_insert_new_passenger($1::text,$2::text,$3::text,$4::integer,$5::text,$6::text,$7::text)",
      [
        passenger.passenger_id,
        passenger.firstName,
        passenger.lastName,
        passenger.age,
        passenger.homeaddress,
        passenger.destinationaddress,
        passenger.userId,
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
  passenger: Passenger,
  callback: (error, result) => void
) => {
  DbClient.connect((err) => {
    DbClient.query(
      "CALL public.sp_insert_new_passenger($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text)",
      [
        passenger.passenger_id,
        passenger.firstName,
        passenger.lastName,
        passenger.age,
        passenger.homeaddress,
        passenger.destinationaddress,
        passenger.userId,
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
