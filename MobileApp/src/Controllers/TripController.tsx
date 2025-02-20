import {
  AddTripToDB,
  GetTripFromDB,
  GetPastTripsParentFromDB,
  UpdateTripInDB,
  GetUpcomingTripsParentFromDB,
  GetPastTripsDriverFromDB,
  GetUpcomingTripsDriverFromDB,
  UpdatePassengerStatusInDB,
  EndTripInDB,
  UpdateTripDropOffTimeInDB,
  UpdateTripPickUpTimeInDB,
  GetPastTripsTransporterFromDB,
  GetUpcomingTripsTransporterFromDB,
  UndoTripDropOffTimeInDB,
  UndoTripEndInDB,
  UndoTripPickUpTimeInDB,
  GetDailytTripsTransporterFromDB,
  GetDailytTripsParentFromDB,
  GetDailytTripsDriverFromDB,
} from '../Data/TripDAL';
import {Trip} from '../Models/Trip';

export const AddTrip = async (trip: Trip) => {
  return await AddTripToDB(trip);
};

export const GetTrip = async (tripId: string) => {
  return await GetTripFromDB(tripId);
};

export const GetDailytTripsTransporter = async (businessId: string) => {
  return await GetDailytTripsTransporterFromDB(businessId);
};

export const GetDailytTripsParent = async (businessId: string) => {
  return await GetDailytTripsParentFromDB(businessId);
};

export const GetDailytTripsDriver = async (driverId: string) => {
  return await GetDailytTripsDriverFromDB(driverId);
};

export const GetUpcomingTripsForClient = async (ParentId: string) => {
  return await GetUpcomingTripsParentFromDB(ParentId);
};

export const GetPastTripsForClient = async (ParentId: string) => {
  return await GetPastTripsParentFromDB(ParentId);
};

export const GetUpcomingTripsForDriver = async (driverId: string) => {
  return await GetUpcomingTripsDriverFromDB(driverId);
};

export const GetPastTripsForDriver = async (driverId: string) => {
  return await GetPastTripsDriverFromDB(driverId);
};

export const GetUpcomingTripsForTransporter = async (
  businessId: string,
  vehicleId: string,
) => {
  return await GetUpcomingTripsTransporterFromDB(businessId, vehicleId);
};

export const GetPastTripsForTransporter = async (
  businessId: string,
  vehicleId: string,
) => {
  return await GetPastTripsTransporterFromDB(businessId, vehicleId);
};

export const UpdateTrip = async (trip: Trip) => {
  await UpdateTripInDB(trip);
};

export const UpdatePassengerStatus = async (tripId: string, status: number) => {
  return UpdatePassengerStatusInDB(status, tripId);
};

export const SetTripPickUpTime = async (tripId: string) => {
  return await UpdateTripPickUpTimeInDB(tripId);
};

export const SetTripDropOffPickUpTime = async (tripId: string) => {
  return await UpdateTripDropOffTimeInDB(tripId);
};

export const EndTrip = async (tripId: string) => {
  return await EndTripInDB(tripId);
};

export const UndoTripDropOffTime = async (tripId: string) => {
  return await UndoTripDropOffTimeInDB(tripId);
};

export const UndoTripPickUpTime = async (tripId: string) => {
  return await UndoTripPickUpTimeInDB(tripId);
};

export const UndoTripEnd = async (tripId: string) => {
  return await UndoTripEndInDB(tripId);
};
