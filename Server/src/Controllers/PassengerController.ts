import { randomUUID } from "crypto";
import { Passenger } from "../Classes/Passenger";
import {
  InsertPassenger,
  GetAllPassengersByParentId as GetAllPassengersByParentId,
  GetAllPassengersByBusinessId,
  GetPassengerByPassengerId,
  UpdatePassenger,
} from "../Models/PassengerModel";

export const AddPassenger = async (req: any, res: any, next: any) => {
  let newPassenger = new Passenger(
    randomUUID(),
    req.body.passenger.FirstName,
    req.body.passenger.LastName,
    req.body.passenger.Age,
    req.body.passenger.HomeAddress,
    req.body.passenger.DestinationAddress,
    req.body.passenger.ParentId,
    req.body.passenger.BusinessId
  );
  await InsertPassenger(newPassenger, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
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

export const GetPassenger = async (req: any, res: any, next: any) => {
  let passengerId = req.body.passenger.PassengerId;

  await GetPassengerByPassengerId(passengerId, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
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

export const UpdatePassengerDetail = async (req: any, res: any, next: any) => {
  let passenger = new Passenger(
    req.body.passenger.PassengerId,
    req.body.passenger.FirstName,
    req.body.passenger.LastName,
    req.body.passenger.Age,
    req.body.passenger.HomeAddress,
    req.body.passenger.DestinationAddress,
    req.body.passenger.ParentId,
    req.body.passenger.BusinessId
  );
  await UpdatePassenger(passenger, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else if (result.affectedRows == 0) {
      let err: any = {
        status: 499,
        message: "Something went wrong",
      };
      next(err);
    } else {
      res.status(200).json({
        UserDetailUpdated: true,
        result: result.affectedRows,
      });
    }
  });
};

export const GetPassengersByParent = async (req: any, res: any, next: any) => {
  let parentId = req.body.passenger.ParentId;

  await GetAllPassengersByParentId(parentId, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
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

export const GetPassengersByBusiness = async (
  req: any,
  res: any,
  next: any
) => {
  let businessId = req.body.passenger.BusinessId;

  await GetAllPassengersByBusinessId(businessId, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
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
