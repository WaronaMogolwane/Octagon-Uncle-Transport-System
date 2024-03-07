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
  GetPastTripsBusinessFromDB,
  GetUpcomingTripsBusinessFromDB,
} from '../Data/TripDAL';
import {Trip} from '../Models/Trip';

export const AddTrip = async (trip: Trip) => {
  await AddTripToDB(trip);
};

export const GetTrip = async (tripId: string) => {
  return await GetTripFromDB(tripId);
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

export const GetUpcomingTripsForTransporter = async (businessId: string) => {
  return await GetUpcomingTripsBusinessFromDB(businessId);
};

export const GetPastTripsForTransporter = async (businessId: string) => {
  return await GetPastTripsBusinessFromDB(businessId);
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
