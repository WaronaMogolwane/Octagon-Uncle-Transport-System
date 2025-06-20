import { randomUUID } from "crypto";
import { Passenger } from "../Classes/Passenger";
import {
  InsertPassenger,
  GetAllPassengersByParentId as GetAllPassengersByParentId,
  GetActivePassengersByBusinessId,
  GetPassengerByPassengerId,
  UpdatePassenger,
  UpdateIsAssigned,
  GetAllPassengersByBusinessId,
  GetPendingPassengersByBusinessId,
  DeletePassengerByPassengerId,
  DeletePassengerRequestByPassengerId,
  GetActivePassengersByParentId,
  GetPassengersByBusinessId,
} from "../Models/PassengerModel";
import { ErrorResponse } from "../Classes/ErrorResponse";

export const AddPassenger = async (req: any, res: any, next: any) => {
  let newPassenger = new Passenger(
    randomUUID(),
    req.body.passenger.FirstName,
    req.body.passenger.LastName,
    req.body.passenger.Age,
    req.body.passenger.HomeAddress,
    req.body.passenger.Suburb,
    req.body.passenger.City,
    req.body.passenger.Province,
    req.body.passenger.PostalCode,
    req.body.passenger.DestinationAddress,
    req.body.passenger.ParentId,
    req.body.passenger.BusinessId
  );
  await InsertPassenger(newPassenger, (error, result) => {
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
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
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
    req.body.params.PassengerId,
    req.body.params.FirstName,
    req.body.params.LastName,
    req.body.params.Age,
    req.body.params.HomeAddress,
    req.body.params.Suburb,
    req.body.params.City,
    req.body.params.Province,
    req.body.params.PostalCode,
    req.body.params.DestinationAddress,
    req.body.params.ParentId,
    req.body.params.BusinessId
  );
  await UpdatePassenger(passenger, (error, result) => {
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
        UserDetailUpdated: true,
        result: result.affectedRows,
      });
    }
  });
};

export const UpdatePassengerIsAssigned = async (
  req: any,
  res: any,
  next: any
) => {
  let passengerId = req.body.params.PassengerId;

  await UpdateIsAssigned(passengerId, (error, result) => {
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
        UserDetailUpdated: true,
        result: result.affectedRows,
      });
    }
  });
};

export const GetPassengersByParent = async (req: any, res: any, next: any) => {
  let parentId = req.query.ParentId;

  await GetAllPassengersByParentId(parentId, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const GetPassengersDropdownByBusiness = async (
  req: any,
  res: any,
  next: any
) => {
  let businessId = req.query.BusinessId;

  await GetPassengersByBusinessId(businessId, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const GetPassengersActiveByBusiness = async (
  req: any,
  res: any,
  next: any
) => {
  let businessId = req.query.BusinessId;

  await GetActivePassengersByBusinessId(businessId, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const GetActivePassengersByParent = async (
  req: any,
  res: any,
  next: any
) => {
  let parentId = req.query.ParentId;

  await GetActivePassengersByParentId(parentId, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const GetAllPassengersByBusiness = async (
  req: any,
  res: any,
  next: any
) => {
  let businessId = req.query.BusinessId;

  await GetAllPassengersByBusinessId(businessId, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const GetPendingPassengersByBusiness = async (
  req: any,
  res: any,
  next: any
) => {
  let businessId = req.query.BusinessId;

  await GetPendingPassengersByBusinessId(businessId, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const DeletePassenger = async (req: any, res: any, next: any) => {
  let passengerId = req.query.PassengerId;

  await DeletePassengerByPassengerId(passengerId, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const DeletePassengerRequest = async (req: any, res: any, next: any) => {
  let deleteRequest = {
    passengerId: req.query.PassengerId,
    reason: req.query.Reason,
  };

  await DeletePassengerRequestByPassengerId(deleteRequest, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};
