import {
  AddPassengerToDatabase,
  GetPassengerFromDatabase,
  GetAllPassengerFromDatabase,
  DeletePassengerFromDatabase,
  GetAllPassengerForBusinessFromDB,
  UpdateIsAssignedInDB,
  UpdatePassengerInDatabase,
} from '../Data/PassengerDAL';
import {Passenger} from '../Models/Passenger';

export const AddPassenger = async (
  passenger: Passenger,
  uid: string,
  passengerId: string,
) => {
  return await AddPassengerToDatabase(passenger, uid, passengerId);
};

export const GetPassenger = async (passengerId: string, uid: string) => {
  return await GetPassengerFromDatabase(passengerId, uid);
};

export const GetAllPassenger = async (uid: string) => {
  return await GetAllPassengerFromDatabase(uid);
};

export const GetAllPassengerForBusiness = async (businessId: string) => {
  return GetAllPassengerForBusinessFromDB(businessId);
};

export const DeletePassenger = async (passengerId: string, uid: string) => {
  return await DeletePassengerFromDatabase(passengerId, uid);
};

export const UpdatePassenger = async (
  passenger: Passenger,
  uid: string,
  passengerId: string,
) => {
  return await UpdatePassengerInDatabase(passenger, uid, passengerId);
};

export const UpdateIsAssigned = async (passengerId: string) => {
  return await UpdateIsAssignedInDB(passengerId);
};
