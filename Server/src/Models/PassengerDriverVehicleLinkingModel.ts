import { PassengerDriverVehicleLinking } from "../Classes/PassengerDriverVehicleLinking";
import { DbPool } from "../Services/DatabaseService";

export const InsertPassengerDriverVehicleLinking = async (
  pDVL: PassengerDriverVehicleLinking,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL InsertNewPassengerDriverVehicleLinking(?,?,?,?);",
      timeout: 40000,
      values: [
        pDVL.passengerDriverVehicleLinking_id,
        pDVL.vehicle_Id,
        pDVL.business_Id,
        pDVL.passenger_Id,
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

export const GetPassengerDriverVehicleLinkingByBusinessId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetPassengerDriverVehicleLinking(?);",
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
