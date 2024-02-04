import {
  AddTripToDB,
  GetTripFromDB,
  GetPastTripsParentFromDB,
  GetAllTripsForBusinessFromDatabase,
  DeleteTripFromDatabase,
  UpdateTripInDB,
  GetUpcomingTripsParentFromDB,
  GetPastTripsDriverFromDB,
  GetUpcomingTripsDriverFromDB,
  UpdatePassengerStatusInDB,
  EndTripInDB,
} from '../Data/TripDAL';
import {Passenger} from '../Models/Passenger';
import {Trip} from '../Models/Trip';

export const AddTrip = async (trip: Trip) => {
  await AddTripToDB(trip);
};

export const GetTrip = async (tripId: string) => {
  return await GetTripFromDB(tripId);
};

export const GetUpcomingTripsForClient = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetUpcomingTripsParentFromDB(ParentId, businessId);
};

export const GetPastTripsForClient = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetPastTripsParentFromDB(ParentId, businessId);
};

export const GetUpcomingTripsForDriver = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetUpcomingTripsDriverFromDB(ParentId, businessId);
};

export const GetPastTripsForDriver = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetPastTripsDriverFromDB(ParentId, businessId);
};

export const GetUpcomingTripsForTransporter = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetUpcomingTripsParentFromDB(ParentId, businessId);
};

export const GetPastTripsForTransporter = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetPastTripsParentFromDB(ParentId, businessId);
};

export const GetAllTripsForBusiness = async (businessId: string) => {
  return await GetAllTripsForBusinessFromDatabase(businessId);
};

export const DeleteTrip = async (tripId: string) => {
  return await DeleteTripFromDatabase(tripId);
};

export const UpdateTrip = async (trip: Trip) => {
  await UpdateTripInDB(trip);
};

export const UpdatePassengerStatus = async (
  passengers: Passenger[],
  tripId: string,
) => {
  return UpdatePassengerStatusInDB(passengers, tripId);
};

export const EndTrip = async (tripId: string) => {
  return await EndTripInDB(tripId);
};
