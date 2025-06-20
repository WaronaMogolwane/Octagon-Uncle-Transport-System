import dotenv from "dotenv";
import { DbPool } from "../Services/DatabaseService";
import { Trip } from "../Classes/Trip";
import { TripStatus } from "../Classes/TripStatus";
import { Vehicle } from "../Classes/Vehicle";
dotenv.config();

export const InsertTrip = async (
  trip: any,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL InsertNewTrip(?,?,?);",
      timeout: 40000,
      values: [trip.vehicleId, trip.passengerId, trip.businessId],
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
  businessInfo: any,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetFutureTripsForBusiness(?,?);",
      timeout: 40000,
      values: [businessInfo.businessId, businessInfo.vehicleId],
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

export const GetDailyBusinessTripByBusinessId = async (
  businessId: any,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetDailyBusinessTrip(?);",
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

export const GetDailyParentTripByParentId = async (
  parentId: any,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetDailyParentTrip(?);",
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

export const GetDailyDriverTripByDriverId = async (
  driverId: any,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetDailyDriverTrip(?);",
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

export const GetPastTripsByBusinessId = async (
  businessInfo: any,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetPastTripsForBusiness(?,?);",
      timeout: 40000,
      values: [businessInfo.businessId, businessInfo.vehicleId],
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

export const UndoDropOffTime = async (
  tripId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UndoTripDropOffTime(?);",
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

export const UndoPickUpTime = async (
  tripId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UndoTripPickUpTime(?);",
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

export const UndoTripEnd = async (
  tripId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UndoTripEnd(?);",
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
