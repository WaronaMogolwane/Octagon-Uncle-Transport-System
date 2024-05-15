import {
  AddPassengerToDatabase,
  GetPassengerFromDatabase,
  DeletePassengerFromDatabase,
  GetAllPassengerForBusinessFromDB,
  UpdateIsAssignedInDB,
  UpdatePassengerInDatabase,
  GetParentPassengersFromDB,
} from '../Data/PassengerDAL';
import {Passenger} from '../Models/Passenger';

export const AddPassenger = async (passenger: Passenger) => {
  return await AddPassengerToDatabase(passenger);
};

export const GetPassenger = async (passengerId: string, uid: string) => {
  return await GetPassengerFromDatabase(passengerId, uid);
};

export const GetParentPassengers = async (parentId: string) => {
  return await GetParentPassengersFromDB(parentId);
};

export const GetAllPassengerForBusiness = async (businessId: string) => {
  return GetAllPassengerForBusinessFromDB(businessId);
};

export const DeletePassenger = async (passengerId: string, uid: string) => {
  return await DeletePassengerFromDatabase(passengerId, uid);
};

export const UpdatePassenger = async (passenger: Passenger) => {
  return await UpdatePassengerInDatabase(passenger);
};

export const UpdateIsAssigned = async (passengerId: string) => {
  return await UpdateIsAssignedInDB(passengerId);
};
