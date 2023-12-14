import { randomUUID } from "crypto";
import { Trip } from "../Classes/Trip";
import {
  InsertTrip,
  GetTripById,
  UpdateTrip,
  GetAllTripsByBusinessId as GetAllTripsForBusiness,
  GetAllTripsByBusinessIdAndParentId,
} from "../Models/TripModel";
import { FilterRows } from "../Services/FilterService";

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

export const GetTripsForBusiness = async (req: any, res: any, next: any) => {
  let businesId = req.body.trip.BusinessId;

  await GetAllTripsForBusiness(businesId, (error, result) => {
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
        result: result.rows,
      });
    }
  });
};

export const GetTripsForParent = async (req: any, res: any, next: any) => {
  let businessId = req.body.trip.BusinessId;
  let payerId = req.body.trip.PayerId;

  await GetAllTripsByBusinessIdAndParentId(
    businessId,
    async (error, result) => {
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
          result: await FilterRows(result.rows, payerId),
        });
      }
    }
  );
};
