import {
  AddTripToDatabase,
  GetTripFromDatabase,
  GetPastTripsParentFromDatabase,
  GetAllTripsForBusinessFromDatabase,
  DeleteTripFromDatabase,
  UpdateTripInDatabase,
  GetUpcomingTripsParentFromDatabase,
  GetPastTripsDriverFromDatabase,
  GetUpcomingTripsDriverFromDatabase,
  UpdatePassengerStatusInDB,
} from '../Data/TripDAL';
import {Passenger} from '../Models/Passenger';
import {Trip} from '../Models/Trip';

export const AddTrip = async (trip: Trip) => {
  await AddTripToDatabase(trip);
};

export const GetTrip = async (tripId: string) => {
  return await GetTripFromDatabase(tripId);
};

export const GetUpcomingTripsForClient = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetUpcomingTripsParentFromDatabase(ParentId, businessId);
};

export const GetPastTripsForClient = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetPastTripsParentFromDatabase(ParentId, businessId);
};

export const GetUpcomingTripsForDriver = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetUpcomingTripsDriverFromDatabase(ParentId, businessId);
};

export const GetPastTripsForDriver = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetPastTripsDriverFromDatabase(ParentId, businessId);
};

export const GetUpcomingTripsForTransporter = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetUpcomingTripsParentFromDatabase(ParentId, businessId);
};

export const GetPastTripsForTransporter = async (
  ParentId: string,
  businessId: string,
) => {
  return await GetPastTripsParentFromDatabase(ParentId, businessId);
};

export const GetAllTripsForBusiness = async (businessId: string) => {
  return await GetAllTripsForBusinessFromDatabase(businessId);
};

export const DeleteTrip = async (tripId: string) => {
  return await DeleteTripFromDatabase(tripId);
};

export const UpdateTrip = async (trip: Trip) => {
  await UpdateTripInDatabase(trip);
};

export const UpdatePassengerStatus = async (
  passengers: Passenger[],
  tripId: string,
) => {
  return UpdatePassengerStatusInDB(passengers, tripId);
};
