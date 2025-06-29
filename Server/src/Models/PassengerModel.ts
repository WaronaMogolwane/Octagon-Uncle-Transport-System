import dotenv from "dotenv";
import { Passenger } from "../Classes/Passenger";
import { DbPool } from "../Services/DatabaseService";
dotenv.config();

export const InsertPassenger = async (
  passenger: Passenger,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call InsertNewPassenger(?,?,?,?,?,?,?,?,?,?,?,?)",
      timeout: 40000,
      values: [
        passenger.passenger_id,
        passenger.firstName,
        passenger.lastName,
        passenger.age,
        passenger.homeAddress,
        passenger.suburb,
        passenger.city,
        passenger.province,
        passenger.postalCode,
        passenger.destinationAddress,
        passenger.parentId,
        passenger.businessId,
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

export const GetPassengerByPassengerId = async (
  passengerId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call GetPassenger(?)",
      timeout: 40000,
      values: [passengerId],
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

export const UpdatePassenger = async (
  passenger: Passenger,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdatePassenger(?,?,?,?,?,?,?,?,?,?)",
      timeout: 40000,
      values: [
        passenger.passenger_id,
        passenger.firstName,
        passenger.lastName,
        passenger.age,
        passenger.homeAddress,
        passenger.suburb,
        passenger.city,
        passenger.province,
        passenger.postalCode,
        passenger.destinationAddress,
      ],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

export const UpdateIsAssigned = async (
  passengerId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdatePassengerIsAssigned(?)",
      timeout: 40000,
      values: [passengerId],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

export const GetPassengersByBusinessId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call GetPassengerByBusinessId(?)",
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

export const GetActivePassengersByBusinessId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call GetPassengerActiveByBusinessId(?)",
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

export const GetActivePassengersByParentId = async (
  parentId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call GetPassengerActiveByParentId(?)",
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

export const GetAllPassengersByParentId = async (
  ParentId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call GetPassengerByParentId(?)",
      timeout: 40000,
      values: [ParentId],
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

export const GetAllPassengersByBusinessId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call GetPassengerAllByBusinessId(?)",
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

export const GetPendingPassengersByBusinessId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call GetPassengersPendingForBusiness(?)",
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

export const DeletePassengerByPassengerId = async (
  passengerId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call DeletePassenger(?)",
      timeout: 40000,
      values: [passengerId],
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

export const DeletePassengerRequestByPassengerId = async (
  deleteRequest: any,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call DeletePassengerRequest(?,?)",
      timeout: 40000,
      values: [deleteRequest.passengerId, deleteRequest.reason],
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
