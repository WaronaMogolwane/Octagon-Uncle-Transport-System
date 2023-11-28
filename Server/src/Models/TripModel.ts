import dotenv from "dotenv";
import { DbPool } from "../Services/DatabaseService";
import { Trip } from "../Classes/Trip";
import { FilterRows } from "../Services/FilterService";
dotenv.config();

export const InsertTrip = async (
  trip: Trip,
  callback: (error, result) => void
) => {
  await DbPool.query(
    `CALL public.sp_insert_new_trip($1::text,$2::text,$3::json,$4::text,$5::text,$6::text,$7::date,$8::text)`,
    [
      trip.tripId,
      trip.registrationNumber,
      JSON.stringify(trip.passenger),
      trip.vehicleId,
      trip.businesId,
      trip.driverId,
      trip.date,
      trip.time,
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

export const GetTripById = async (
  tripId: string,
  callback: (error, result) => void
) => {
  await DbPool.query(
    "select * from fn_get_trip($1::text);",
    [tripId],
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

export const UpdateTrip = async (
  trip: Trip,
  callback: (error, result) => void
) => {
  await DbPool.query(
    `CALL public.sp_update_trip($1::text,$2::text,$3::json,$4::text,$5::text,$6::text,$7::date,$8::text)`,
    [
      trip.tripId,
      trip.registrationNumber,
      JSON.stringify(trip.passenger),
      trip.vehicleId,
      trip.businesId,
      trip.driverId,
      trip.date,
      trip.time,
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

export const GetAllTripsByBusinessId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  await DbPool.query(
    "select * from public.fn_get_user_detail_trip_by_business($1::text);",
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

export const GetAllTripsByBusinessIdAndParentId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  await DbPool.query(
    "select * from public.fn_get_user_detail_trip_by_business($1::text);",
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
