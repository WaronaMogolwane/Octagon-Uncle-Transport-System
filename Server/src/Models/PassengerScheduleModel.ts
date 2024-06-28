import { PassengerSchedule } from "../Classes/PassengerSchedule";
import { DbPool } from "../Services/DatabaseService";

export const InsertPassengerSchedule = async (
  passengerSchedule: PassengerSchedule,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL InsertNewPassengerSchedule(?,?,?,?,?,?,?,?,?);",
      timeout: 40000,
      values: [
        passengerSchedule.monday,
        passengerSchedule.tuesday,
        passengerSchedule.wednesday,
        passengerSchedule.thursday,
        passengerSchedule.friday,
        passengerSchedule.saturday,
        passengerSchedule.sunday,
        passengerSchedule.passengerId,
        passengerSchedule.vehicleId,
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

export const InsertTempPassengerSchedule = async (
  passengerId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL InsertNewTempPassengerSchedule(?);",
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

export const GetPassengerSchedule = async (
  passengerId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetPassengerSchedule(?);",
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

export const UpdatePassengerSchedule = async (
  passengerSchedule: PassengerSchedule,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdatePassengerSchedule(?,?,?,?,?,?,?,?,?);",
      timeout: 40000,
      values: [
        passengerSchedule.monday,
        passengerSchedule.tuesday,
        passengerSchedule.wednesday,
        passengerSchedule.thursday,
        passengerSchedule.friday,
        passengerSchedule.saturday,
        passengerSchedule.sunday,
        passengerSchedule.passengerId,
        passengerSchedule.vehicleId,
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

export const AutoInsertPassengerSchedule = async (
  day: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: `INSERT INTO PassengerDriverVehicleLinking (DriverVehicleLinkingId, BusinessId, PassengerId)
      SELECT DriverVehicleLinkingId, BusinessId, PassengerId
      FROM PassengerSchedule 
        WHERE ${day} = '1';`,
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

export const TruncateTempPassengerSchedule = async (
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL AutoTruncateTempPassengerSchedule();",
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
