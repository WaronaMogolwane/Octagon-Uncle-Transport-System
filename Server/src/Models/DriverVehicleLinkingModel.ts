import { DbPool } from "../Services/DatabaseService";

export const GetDriverIdByVehicleId = async (
  vehicleId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call GetDriverVehicleLinkingDriverId(?)",
      timeout: 40000,
      values: [vehicleId],
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
