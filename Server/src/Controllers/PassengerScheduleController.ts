import { randomUUID } from "crypto";
import { PassengerSchedule } from "../Classes/PassengerSchedule";
import { ErrorResponse } from "../Classes/ErrorResponse";
import {
  AutoInsertPassengerSchedule,
  InsertPassengerSchedule,
  UpdatePassengerSchedule,
} from "../Models/PassengerScheduleModel";

export const AddPassengerSchedule = async (req: any, res: any, next: any) => {
  let newPassenger = new PassengerSchedule(
    "randomUUID()",
    req.body.params.Monday,
    req.body.params.Tuesday,
    req.body.params.Wednesday,
    req.body.params.Thursday,
    req.body.params.Friday,
    req.body.params.Saturday,
    req.body.params.Sunday,
    req.body.params.PassengerId,
    req.body.params.VehicleId
  );

  await InsertPassengerSchedule(newPassenger, (error, result) => {
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
        PassengerCreated: true,
        result: result.affectedRows,
      });
    }
  });
};

export const UpdatePassengerScheduleByPassengerId = async (
  req: any,
  res: any,
  next: any
) => {
  let newPassengerSchedule = new PassengerSchedule(
    "randomUUID()",
    req.body.params.Monday,
    req.body.params.Tuesday,
    req.body.params.Wednesday,
    req.body.params.Thursday,
    req.body.params.Friday,
    req.body.params.Saturday,
    req.body.params.Sunday,
    req.body.params.PassengerId,
    req.body.params.DriverVehicleLinkingId
  );

  await UpdatePassengerSchedule(newPassengerSchedule, (error, result) => {
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
        PassengerCreated: true,
        result: result.affectedRows,
      });
    }
  });
};

// export const AutoAddPassengerSchedule = async (
//   req: any,
//   res: any,
//   next: any
// ) => {
//   await AutoInsertPassengerSchedule((error, result) => {
//     if (error) {
//       next(new ErrorResponse(501, error.message));
//     } else if (result.affectedRows == 0) {
//       let err: any = {
//         status: 499,
//         message: "Something went wrong",
//       };
//       next(err);
//     } else {
//       res.status(200).json({
//         PassengerCreated: true,
//         result: result.affectedRows,
//       });
//     }
//   });
// };
