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

export const AutoInsertTrip = async (callback: (error, result) => void) => {
  DbPool.query(
    {
      sql: "CALL AutoInsertNewTrips();",
      timeout: 40000,
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

export const GetUpcomingTripsByDriverId = async (
  driverId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetFutureTripsForDriver(?);",
      timeout: 40000,
      values: [driverId],
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

export const GetPastTripsByDriverId = async (
  driverId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetPastTripsForDriver(?);",
      timeout: 40000,
      values: [driverId],
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

export const GetUpcomingTripsByBusinessId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetFutureTripsForBusiness(?);",
      timeout: 40000,
      values: [businessId],
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

export const GetPastTripsByBusinessId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetPastTripsForBusiness(?);",
      timeout: 40000,
      values: [businessId],
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

export const UpdateTripSetPickUpTime = async (
  tripId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdateTripPickUpTime(?);",
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

export const UpdateTripSetDropOffTime = async (
  tripId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdateTripDropOffTime(?);",
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
