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
  day: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: `    SET	@_BusinessId = (SELECT 
        Passenger.BusinessId
    FROM
        Passenger
            INNER JOIN
        PassengerSchedule ON PassengerSchedule.PassengerId = Passenger.PassengerId
    WHERE
        Passenger.PassengerId = PassengerSchedule.PassengerId);
          
      INSERT INTO PassengerDriverVehicleLinking (DriverVehicleLinkingId, BusinessId, PassengerId)
        SELECT DriverVehicleLinkingId, @_BusinessId, PassengerId
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
