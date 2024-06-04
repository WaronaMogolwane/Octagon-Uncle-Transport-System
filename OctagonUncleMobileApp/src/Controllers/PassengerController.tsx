import {
  AddPassengerToDB,
  GetPassengerFromDatabase,
  DeletePassengerFromDatabase as DeletePassengerFromDB,
  GetActivePassengerForBusinessFromDB,
  UpdateIsAssignedInDB,
  UpdatePassengerInDatabase,
  GetParentPassengersFromDB,
  GetAllPassengerForBusinessFromDB,
  GetPendingPassengerForBusinessFromDB,
  DeletePassengerRequestFromDB,
} from '../Data/PassengerDAL';
import {Passenger} from '../Models/Passenger';

export const AddPassenger = async (passenger: Passenger) => {
  return await AddPassengerToDB(passenger);
};

export const GetPassenger = async (passengerId: string, uid: string) => {
  return await GetPassengerFromDatabase(passengerId, uid);
};

export const GetParentPassengers = async (parentId: string) => {
  return await GetParentPassengersFromDB(parentId);
};

export const GetAllActivePassengerForBusiness = async (businessId: string) => {
  return GetActivePassengerForBusinessFromDB(businessId);
};

export const GetAllPendingPassengerForBusiness = async (businessId: string) => {
  return GetPendingPassengerForBusinessFromDB(businessId);
};

export const GetAllPassengerForBusiness = async (businessId: string) => {
  return GetAllPassengerForBusinessFromDB(businessId);
};

export const DeletePassenger = async (passengerId: string) => {
  return await DeletePassengerFromDB(passengerId);
};

export const DeletePassengerRequest = async (
  passengerId: string,
  reason: string,
) => {
  return await DeletePassengerRequestFromDB(passengerId, reason);
};

export const UpdatePassenger = async (passenger: Passenger) => {
  return await UpdatePassengerInDatabase(passenger);
};

export const UpdateIsAssigned = async (passengerId: string) => {
  return await UpdateIsAssignedInDB(passengerId);
};
