import { randomUUID } from "crypto";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { PassengerDriverVehicleLinking } from "../Classes/PassengerDriverVehicleLinking";
import {
  GetPassengerDriverVehicleLinkingByBusinessId,
  InsertPassengerDriverVehicleLinking,
} from "../Models/PassengerDriverVehicleLinkingModel";

export const AddPassengerDriverVehicleLinking = async (
  req: any,
  res: any,
  next: any
) => {
  let newPassengerDriverVehicleLinking = new PassengerDriverVehicleLinking(
    randomUUID(),
    req.query.VehicleId,
    req.query.BusinessId,
    req.query.PassengerId
  );

  await InsertPassengerDriverVehicleLinking(
    newPassengerDriverVehicleLinking,
    (error, result) => {
      if (error) {
        next(new ErrorResponse(501, error.message));
      } else if (result.affectedRows == 0) {
        let err: any = {
          status: 499,
          message: "Something went wrong",
        };
        next(err);
      } else {
        res.status(200).json({
          RecordCreated: true,
          result: result[0],
        });
      }
    }
  );
};

export const GetPassengerDriverVehicleLinking = async (
  req: any,
  res: any,
  next: any
) => {
  let businessId = req.query.BusinessId;

  await GetPassengerDriverVehicleLinkingByBusinessId(
    businessId,
    (error, result) => {
      if (error) {
        next(new ErrorResponse(501, error.message));
      } else if (result.affectedRows == 0) {
        let err: any = {
          status: 499,
          message: "Something went wrong",
        };
        next(err);
      } else {
        res.status(200).json({
          RecordCreated: true,
          result: result[0],
        });
      }
    }
  );
};
