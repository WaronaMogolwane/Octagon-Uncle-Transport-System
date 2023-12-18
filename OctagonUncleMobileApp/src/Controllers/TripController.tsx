import {
  AddTripToDatabase,
  GetTripFromDatabase,
  GetPastTripsFromDatabase,
  GetAllTripsForBusinessFromDatabase,
  DeleteTripFromDatabase,
  UpdateTripInDatabase,
  GetUpcomingTripsFromDatabase,
} from '../Data/TripDAL';
import {Trip} from '../Models/Trip';

export const AddTrip = async (trip: Trip) => {
  await AddTripToDatabase(trip);
};

export const GetTrip = async (tripId: string) => {
  return await GetTripFromDatabase(tripId);
};

export const GetUpcomingTripsForClient = async (
  payerId: string,
  businessId: string,
) => {
  return await GetUpcomingTripsFromDatabase(payerId, businessId);
};

export const GetPastTripsForClient = async (
  payerId: string,
  businessId: string,
) => {
  return await GetPastTripsFromDatabase(payerId, businessId);
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
