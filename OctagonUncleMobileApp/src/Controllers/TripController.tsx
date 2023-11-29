import {
  AddTripToDatabase,
  GetTripFromDatabase,
  GetAllTripsForClientFromDatabase,
  GetAllTripsForBusinessFromDatabase,
  DeleteTripFromDatabase,
  UpdateTripInDatabase,
} from "../Data/TripDAL";
import { Trip } from "../Models/Trip";

export const AddTrip = async (trip: Trip) => {
  await AddTripToDatabase(trip);
};

export const GetTrip = async (tripId: string) => {
  return await GetTripFromDatabase(tripId);
};

export const GetAllTripsForClient = async (
  payerId: string,
  businessId: string
) => {
  return await GetAllTripsForClientFromDatabase(payerId, businessId);
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
