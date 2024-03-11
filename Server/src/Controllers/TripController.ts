import { randomUUID } from "crypto";
import { Trip } from "../Classes/Trip";
import {
  InsertTrip,
  GetTripById,
  UpdateTrip,
  GetPastTripsByParentId,
  GetUpcomingTripsByParentId,
  UpdateTripStatus,
  UpdateTripIsCompleted as EndTrip,
  GetUpcomingTripsByDriverId,
  GetPastTripsByDriverId,
  UpdateTripSetPickUpTime,
  UpdateTripSetDropOffTime,
} from "../Models/TripModel";
import { TripStatus } from "../Classes/TripStatus";
import { ErrorResponse } from "../Classes/ErrorResponse";

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
      next(new ErrorResponse(501, error.message));
    } else if (result.affectedRows == 0) {
      let err: any = {
        status: 499,
        message: "Something went wrong",
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
      next(new ErrorResponse(501, error.message));
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

export const GetPastTripsForParent = async (req: any, res: any, next: any) => {
  let parentId = req.body.trip.ParentId;

  await GetPastTripsByParentId(parentId, async (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const GetPastTripsForDriver = async (req: any, res: any, next: any) => {
  let driverId = req.body.trip.DriverId;

  await GetPastTripsByDriverId(driverId, async (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const GetUpcomingTripsForDriver = async (
  req: any,
  res: any,
  next: any
) => {
  let driverId = req.body.trip.DriverId;

  await GetUpcomingTripsByDriverId(driverId, async (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
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
      next(new ErrorResponse(501, error.message));
    } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const GetUpcomingTripsForBusiness = async (
  req: any,
  res: any,
  next: any
) => {
  let businessId = req.body.trip.BusinessId;

  await GetUpcomingTripsByDriverId(businessId, async (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const GetPastTripsForBusiness = async (
  req: any,
  res: any,
  next: any
) => {
  let businessId = req.body.trip.BusinessId;

  await GetPastTripsByDriverId(businessId, async (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const UpdateTripDetail = async (req: any, res: any, next: any) => {
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
      next(new ErrorResponse(501, error.message));
    } else if (result.affectedRows == 0) {
      let err: any = {
        status: 499,
        message: "Something went wrong",
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
  const tripStatus = new TripStatus(
    req.body.trip.TripId,
    Number(req.body.trip.TripStatus)
  );

  await UpdateTripStatus(tripStatus, (error, result) => {
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
        TripStatusUpdated: true,
        result: result[0],
      });
    }
  });
};

export const UpdateTripEndTrip = async (req: any, res: any, next: any) => {
  let tripId = req.body.trip.TripId;

  await EndTrip(tripId, (error, result) => {
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
        TripEnded: true,
        result: result[0],
      });
    }
  });
};

export const UpdateTripPickUpTime = async (req: any, res: any, next: any) => {
  let tripId = req.body.trip.TripId;

  await UpdateTripSetPickUpTime(tripId, (error, result) => {
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
        TripStatusUpdated: true,
        result: result[0],
      });
    }
  });
};

export const UpdateTripDropOffTime = async (req: any, res: any, next: any) => {
  let tripId = req.body.trip.TripId;

  await UpdateTripSetDropOffTime(tripId, (error, result) => {
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
        TripStatusUpdated: true,
        result: result[0],
      });
    }
  });
};
