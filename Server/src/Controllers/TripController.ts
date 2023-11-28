import { randomUUID } from "crypto";
import { Trip } from "../Classes/Trip";
import {
  InsertTrip,
  GetTripById,
  UpdateTrip,
  GetAllTripsByBusinessId,
} from "../Models/TripModel";

export const AddTrip = async (req: any, res: any, next: any) => {
  let newTrip = new Trip(
    randomUUID(),
    req.body.trip.RegistrationNumber,
    [...req.body.trip.Passengers],
    req.body.trip.VehicleId,
    req.body.trip.BusinessId,
    req.body.trip.DriverId,
    req.body.trip.Date,
    req.body.trip.Time
  );

  //console.log(newTrip);

  await InsertTrip(newTrip, (error, result) => {
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

export const GetTrip = async (req: any, res: any, next: any) => {
  let tripId = req.body.trip.TripId;

  await GetTripById(tripId, (error, result) => {
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

export const UpdateTripDetails = async (req: any, res: any, next: any) => {
  let updatedTrip = new Trip(
    req.body.trip.TripId,
    req.body.trip.RegistrationNumber,
    [...req.body.trip.Passengers],
    req.body.trip.VehicleId,
    req.body.trip.BusinessId,
    req.body.trip.DriverId,
    req.body.trip.Date,
    req.body.trip.Time
  );
  await UpdateTrip(updatedTrip, (error, result) => {
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

export const GetTripsByBusinessId = async (req: any, res: any, next: any) => {
  let businesId = req.body.trip.BusinessId;

  await GetAllTripsByBusinessId(businesId, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result.rows,
      });
    }
  });
};
