import { randomUUID } from "crypto";
import { Trip } from "../Classes/Trip";
import {
  InsertTrip,
  GetTripById,
  UpdateTrip,
  GetPastTripsByParentId,
  GetUpcomingTripsByParentId,
  UpdateTripPassengers,
  UpdateTripIsCompleted,
} from "../Models/TripModel";
import { TripPassengerStatus } from "../Classes/TripPassengerStatus";

export const AddTrip = async (req: any, res: any, next: any) => {
  const convertedDate = req.body.trip.Date;
  const date = new Date(convertedDate);

  let newTrip = new Trip(
    randomUUID(),
    req.body.trip.PassengerId,
    req.body.trip.DriverVehicleLinkingId,
    date,
    req.body.trip.PickUpTime,
    req.body.trip.DropOffTime,
    req.body.trip.IsCompleted,
    req.body.trip.TripStatus
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
        result: result[0],
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
        result: result[0],
      });
    }
  });
};

export const UpdateTripDetails = async (req: any, res: any, next: any) => {
  const convertedDate = req.body.trip.Date;
  const date = new Date(convertedDate);

  let updatedTrip = new Trip(
    req.body.trip.TripId,
    req.body.trip.PassengerId,
    req.body.trip.DriverVehicleLinkingId,
    date,
    req.body.trip.PickUpTime,
    req.body.trip.DropOffTime,
    req.body.trip.IsCompleted,
    req.body.trip.TripStatus
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
        result: result[0],
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
        result: result[0],
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
        result: result[0],
      });
    }
  });
};

export const GetPastTripsForParent = async (req: any, res: any, next: any) => {
  let parentId = req.body.trip.ParentId;

  await GetPastTripsByParentId(parentId, async (error, result) => {
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
        result: result,
      });
    }
  });
};

export const GetPastTripsForDriver = async (req: any, res: any, next: any) => {
  let parentId = req.body.trip.ParentId;

  await GetPastTripsByParentId(parentId, async (error, result) => {
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
        result: result,
      });
    }
  });
};

export const GetUpcomingTripsForParent = async (
  req: any,
  res: any,
  next: any
) => {
  let parentId = req.body.trip.ParentId;

  await GetUpcomingTripsByParentId(parentId, async (error, result) => {
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
        result: result,
      });
    }
  });
};
