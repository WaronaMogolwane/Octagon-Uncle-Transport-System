import { randomUUID } from "crypto";
import { Trip } from "../Classes/Trip";
import {
  InsertTrip,
  GetTripById,
  UpdateTrip,
  GetPastTripsByBusinessIdAndParentId,
  GetUpcomingTripsByBusinessIdAndParentId,
  UpdateTripPassengers,
  UpdateTripIsCompleted,
} from "../Models/TripModel";
import { FilterRows } from "../Services/FilterService";
import { TripPassengerStatus } from "../Classes/TripPassengerStatus";

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

  await InsertTrip(newTrip, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        TripCreated: true,
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
    } else if (result.rowCount == 0) {
      let err: any = {
        status: 405,
        message: "Record not found",
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
        TripUpdated: true,
        result: result.rows[0],
      });
    }
  });
};

export const UpdateTripPassengerStatus = async (
  req: any,
  res: any,
  next: any
) => {
  const updatedPassenger = new TripPassengerStatus(req.body.trip.TripId, [
    ...req.body.trip.Passenger,
  ]);

  console.log(updatedPassenger);

  await UpdateTripPassengers(updatedPassenger, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        TripPassengerUpdated: true,
        result: result.rows[0],
      });
    }
  });
};

export const UpdateTripEndTrip = async (req: any, res: any, next: any) => {
  let tripId = req.body.trip.TripId;

  await UpdateTripIsCompleted(tripId, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        TripEnded: true,
        result: result.rows[0],
      });
    }
  });
};

export const GetPastTripsForParent = async (req: any, res: any, next: any) => {
  let businessId = req.body.trip.BusinessId;
  let parentId = req.body.trip.ParentId;

  await GetPastTripsByBusinessIdAndParentId(
    businessId,
    async (error, result) => {
      if (error) {
        let err: any = {
          status: 400,
          message: error.message,
        };
        next(err);
      } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
        res.status(200).json({
          RecordRetrieved: true,
          result: await FilterRows(result.rows, parentId),
        });
      }
    }
  );
};

export const GetUpcomingTripsForParent = async (
  req: any,
  res: any,
  next: any
) => {
  let businessId = req.body.trip.BusinessId;
  let parentId = req.body.trip.ParentId;

  await GetUpcomingTripsByBusinessIdAndParentId(
    businessId,
    async (error, result) => {
      if (error) {
        let err: any = {
          status: 400,
          message: error.message,
        };
        next(err);
      } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
        res.status(200).json({
          RecordRetrieved: true,
          result: await FilterRows(result.rows, parentId),
        });
      }
    }
  );
};
