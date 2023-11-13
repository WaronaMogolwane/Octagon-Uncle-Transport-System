import dotenv from "dotenv";
import { Passenger } from "../Classes/Passenger";
import { DbPool } from "../Services/DatabaseService";
dotenv.config();

export const AddPassengerData = async (
  passenger: Passenger,
  callback: (error, result) => void
) => {
  await DbPool.query(
    `CALL public.sp_insert_new_passenger($1::text,$2::text,$3::text,$4::integer,$5::text,$6::text,$7::text,$8::text)`,
    [
      passenger.passenger_id,
      passenger.firstName,
      passenger.lastName,
      passenger.age,
      passenger.homeAddress,
      passenger.destinationAddress,
      passenger.userId,
      passenger.businessDetailId,
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

export const GetPassengerData = async (
  passngerId: string,
  callback: (error, result) => void
) => {
  await DbPool.query(
    `select * from sp_get_passenger('${passngerId}');`,
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

export const UpdatePassengerData = async (
  passenger: Passenger,
  callback: (error, result) => void
) => {
  await DbPool.query(
    `CALL public.sp_update_passenger($1::text,$2::text,$3::text,$4::integer,$5::text,$6::text)`,
    [
      passenger.passenger_id,
      passenger.firstName,
      passenger.lastName,
      passenger.age,
      passenger.homeAddress,
      passenger.destinationAddress,
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

export const GetAllPassengerBusinessData = async (
  businessDetailId: string,
  callback: (error, result) => void
) => {
  await DbPool.query(
    `select * from sp_get_all_passenger_business('${businessDetailId}');`,
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

export const GetAllPassengerUserData = async (
  userId: string,
  callback: (error, result) => void
) => {
  await DbPool.query(
    `select * from sp_get_all_passenger_user('${userId}');`,
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};
