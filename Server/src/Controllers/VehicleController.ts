import { ErrorResponse } from "../Classes/ErrorResponse";
import { GetVehicleAndDriverByBusiness } from "../Models/VehicleModel";

export const GetVehicleAndDriver = async (req: any, res: any, next: any) => {
  let businessId = req.query.BusinessId;

  await GetVehicleAndDriverByBusiness(businessId, async (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};
