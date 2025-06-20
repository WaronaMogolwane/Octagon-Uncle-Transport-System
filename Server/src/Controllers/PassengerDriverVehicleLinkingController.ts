import { randomUUID } from "crypto";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { PassengerDriverVehicleLinking } from "../Classes/PassengerDriverVehicleLinking";
import {
  DeletePassengerDriverVehicleLinking,
  GetPassengerDriverVehicleLinkingByBusinessId,
  InsertPassengerDriverVehicleLinking,
} from "../Models/PassengerDriverVehicleLinkingModel";

export const AddPassengerDriverVehicleLinking = async (
  req: any,
  res: any,
  next: any
) => {
  let newPassengerDriverVehicleLinking = new PassengerDriverVehicleLinking(
    req.body.params.VehicleId,
    req.body.params.BusinessId,
    req.body.params.PassengerId,
    randomUUID()
  );

  await InsertPassengerDriverVehicleLinking(
    newPassengerDriverVehicleLinking,
    (error, result) => {
      if (error) {
        const err: Error = new Error(error.message);
        next(new ErrorResponse(400, err.message, err.stack));
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
  let businessInfo = {
    businessId: req.query.BusinessId,
    dVLId: req.query.DVLId,
  };

  await GetPassengerDriverVehicleLinkingByBusinessId(
    businessInfo,
    (error, result) => {
      if (error) {
        const err: Error = new Error(error.message);
        next(new ErrorResponse(400, err.message, err.stack));
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

export const RemovePassengerDriverVehicleLinking = async (
  req: any,
  res: any,
  next: any
) => {
  let passengerVehicleLinkingId = req.query.PassengerDriverVehicleLinkingId;

  await DeletePassengerDriverVehicleLinking(
    passengerVehicleLinkingId,
    (error, result) => {
      if (error) {
        const err: Error = new Error(error.message);
        next(new ErrorResponse(400, err.message, err.stack));
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
