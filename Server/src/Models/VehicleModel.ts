import { DbPool } from "../Services/DatabaseService";

export const GetVehicleAndDriverByBusiness = async (
  businessId: string,
  callback: (error, result) => void
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
