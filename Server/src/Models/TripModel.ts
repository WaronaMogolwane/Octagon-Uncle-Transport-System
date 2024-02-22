import dotenv from "dotenv";
import { DbPool } from "../Services/DatabaseService";
import { Trip } from "../Classes/Trip";
import { TripStatus } from "../Classes/TripStatus";
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

export const UpdateTripStatus = async (
  tripStatus: TripStatus,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdateTripStatus(?,?);",
      timeout: 40000,
      values: [tripStatus.tripId, tripStatus.tripStatus],
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
  tripId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdateTripEndTrip(?);",
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
