import {
  AddPassengerToDB,
  DeletePassengerFromDB as DeletePassengerFromDB,
  GetUnassignedPassengerForBusinessFromDB,
  UpdateIsAssignedInDB,
  UpdatePassengerInDB,
  GetParentPassengersFromDB,
  GetAllPassengerForBusinessFromDB,
  GetPendingPassengerForBusinessFromDB,
  DeletePassengerRequestFromDB,
  GetActivePassengerForParentFromDB,
  GetActivePassengerForBusinessFromDB,
} from '../Data/PassengerDAL';
import {Passenger} from '../Models/Passenger';

export const AddPassenger = async (passenger: Passenger) => {
  return await AddPassengerToDB(passenger);
};

export const GetParentPassengers = async (parentId: string) => {
  return await GetParentPassengersFromDB(parentId);
};

export const GetUnassignedActivePassengerForBusiness = async (
  businessId: string,
) => {
  return await GetUnassignedPassengerForBusinessFromDB(businessId);
};

export const GetActivePassengerForBusiness = async (businessId: string) => {
  return await GetActivePassengerForBusinessFromDB(businessId);
};

export const GetAllActivePassengerForParent = async (parentId: string) => {
  return await GetActivePassengerForParentFromDB(parentId);
};

export const GetAllPendingPassengerForBusiness = async (businessId: string) => {
  return await GetPendingPassengerForBusinessFromDB(businessId);
};

export const GetAllPassengerForBusiness = async (businessId: string) => {
  return await GetAllPassengerForBusinessFromDB(businessId);
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
  return await UpdatePassengerInDB(passenger);
};

export const UpdateIsAssigned = async (passengerId: string) => {
  return await UpdateIsAssignedInDB(passengerId);
};
