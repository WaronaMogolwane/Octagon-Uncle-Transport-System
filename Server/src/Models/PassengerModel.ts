import dotenv from "dotenv";
import { Passenger } from "../Classes/Passenger";
import { DbPool } from "../Services/DatabaseService";
dotenv.config();

export const InsertPassenger = async (
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
      passenger.parentId,
      passenger.businessId,
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

export const GetPassengerByPassengerId = async (
  passengerId: string,
  callback: (error, result) => void
) => {
  await DbPool.query(
    "select * from fn_get_passenger($1::text);",
    [passengerId],
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

export const UpdatePassenger = async (
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

export const GetAllPassengersByBusinessId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  await DbPool.query(
    "select * from public.fn_get_passengers_by_business_id($1::text);",
    [businessId],
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

export const GetAllPassengersByParentId = async (
  ParentId: string,
  callback: (error, result) => void
) => {
  await DbPool.query(
    "select * from public.fn_get_passengers_by_parent_id($1::text);",
    [ParentId],
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};
