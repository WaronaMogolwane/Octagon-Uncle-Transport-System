import dotenv from "dotenv";
import { DbPool } from "../Services/DatabaseService";
import { Trip } from "../Classes/Trip";
dotenv.config();

export const InsertTrip = async (
  trip: Trip,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL InsertNewTrip(?,?,?,?,?,?,?,?);",
      timeout: 40000,
      values: [
        trip.tripId,
        trip.passengerId,
        trip.driverVehicleLinkingId,
        trip.date,
        trip.pickUpTime,
        trip.dropOffTime,
        trip.isCompleted,
        trip.tripStatus,
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

export const GetTripById = async (
  tripId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetTrip(?);",
      timeout: 40000,
      values: [tripId],
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

export const UpdateTrip = async (
  trip: Trip,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdateTrip(?,?,?,?,?,?,?,?);",
      timeout: 40000,
      values: [
        trip.tripId,
        trip.passengerId,
        trip.driverVehicleLinkingId,
        trip.date,
        trip.pickUpTime,
        trip.dropOffTime,
        trip.isCompleted,
        trip.tripStatus,
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

export const UpdateTripPassengers = async (
  trip: any,
  callback: (error, result) => void
) => {
  // console.log(trip);
  // await DbPool.query(
  //   `CALL public.sp_update_trip_passenger_status($1::text,$2::json)`,
  //   [trip.tripId, JSON.stringify(trip.passenger)],
  //   (err, res) => {
  //     if (err) {
  //       callback(err, null);
  //     } else {
  //       callback(null, res);
  //     }
  //   }
  // );
};

export const GetPastTripsByParentId = async (
  parentId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetPastTripsForParent(?);",
      timeout: 40000,
      values: [parentId],
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

export const GetUpcomingTripsByParentId = async (
  parentId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetFutureTripsForParent(?);",
      timeout: 40000,
      values: [parentId],
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

export const UpdateTripIsCompleted = async (
  tripId: any,
  callback: (error, result) => void
) => {
  await DbPool.query(
    `CALL public.sp_update_trip_iscompleted($1::text)`,
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
