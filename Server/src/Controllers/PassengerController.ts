import { randomUUID } from "crypto";
import { Passenger } from "../Classes/Passenger";
import {
  AddPassengerData,
  GetAllPassengerUserData,
  GetAllPassengerBusinessData,
  GetPassengerData,
  UpdatePassengerData,
} from "../Models/PassengerModel";

export const AddPassenger = async (req: any, res: any, next: any) => {
  let newPassenger = new Passenger(
    randomUUID(),
    req.body.passenger.FirstName,
    req.body.passenger.LastName,
    req.body.passenger.Age,
    req.body.passenger.HomeAddress,
    req.body.passenger.DestinationAddress,
    req.body.passenger.UserId,
    req.body.passenger.BusinessDetailId
  );
  await AddPassengerData(newPassenger, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        PassengerCreated: true,
        result: result.rows[0],
      });
    }
  });
};

export const GetPassenger = async (req: any, res: any, next: any) => {
  let passengerId = req.body.passenger.PassengerId;

  await GetPassengerData(passengerId, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result.rows[0],
      });
      console.log(result);
    }
  });
};

export const UpdatePassenger = async (req: any, res: any, next: any) => {
  let passenger = new Passenger(
    req.body.passenger.PassengerId,
    req.body.passenger.FirstName,
    req.body.passenger.LastName,
    req.body.passenger.Age,
    req.body.passenger.HomeAddress,
    req.body.passenger.DestinationAddress,
    req.body.passenger.UserId,
    req.body.passenger.BusinessDetailId
  );
  await UpdatePassengerData(passenger, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        UserDetailUpdated: true,
        result: result.rows[0],
      });
    }
  });
};

export const GetAllUserPassenger = async (req: any, res: any, next: any) => {
  let userId = req.body.passenger.UserId;

  await GetAllPassengerUserData(userId, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result.rows[0],
      });
    }
  });
};

export const GetAllBusinessPassenger = async (
  req: any,
  res: any,
  next: any
) => {
  let businessDetailId = req.body.passenger.BusinessDetailId;

  await GetAllPassengerBusinessData(businessDetailId, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result.rows[0],
      });
    }
  });
};
