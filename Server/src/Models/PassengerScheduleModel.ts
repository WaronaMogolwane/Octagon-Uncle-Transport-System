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
        passengerSchedule.driverVehicleLinkingId,
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
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL AutoInsertNewSchedule();",
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
