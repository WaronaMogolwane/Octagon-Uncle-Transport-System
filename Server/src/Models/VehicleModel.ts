import { Vehicle } from "../Classes/Vehicle";
import { DbPool } from "../Services/DatabaseService";

export const GetVehicleAndDriverByBusiness = async (
  businessId: string,
  callback: (error: any, result: any) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetVehicleAndDriverForBusiness(?);",
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
export const InsertNewVehicle = async (
  newVehicle: Vehicle,
  callback: (error: any, result: any) => void
) => {
  DbPool.query(
    {
      sql: "CALL InsertNewVehicle(?,?,?,?,?,?,?,?,?,?,?);",
      timeout: 40000,
      values:
        [
          newVehicle.RegistrationNumber,
          newVehicle.Make,
          newVehicle.Model,
          newVehicle.Vin,
          newVehicle.EngineNumber,
          newVehicle.Colour,
          newVehicle.BusinessId,
          newVehicle.LicenseNumber,
          newVehicle.FrontImage,
          newVehicle.RearImage,
          ""
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
