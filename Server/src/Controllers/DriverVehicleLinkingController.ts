import { ErrorResponse } from "../Classes/ErrorResponse";
import { GetDriverIdByVehicleId } from "../Models/DriverVehicleLinkingModel";

export const GetDriverId = async (req: any, res: any, next: any) => {
  let vehicleId = req.query.VehicleId;

  await GetDriverIdByVehicleId(vehicleId, (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } else if (result[0] == "") {
      let err: any = {
        status: 405,
        message: "Record not found",
      };
      next(err);
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};
