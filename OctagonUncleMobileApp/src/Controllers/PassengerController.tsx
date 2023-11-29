import {
  AddPassengerToDatabase,
  GetPassengerFromDatabase,
  GetAllPassengerFromDatabase,
  DeletePassengerFromDatabase,
  UpdatePassengerInDatabase,
} from "../Data/PassengerDAL";
import { Passenger } from "../Models/Passenger";

export const AddPassenger = async (
  passenger: Passenger,
  uid: string,
  passengerId: string
) => {
  await AddPassengerToDatabase(passenger, uid, passengerId);
};

export const GetPassenger = async (passengerId: string, uid: string) => {
  return await GetPassengerFromDatabase(passengerId, uid);
};

export const GetAllPassenger = async (uid: string) => {
  return await GetAllPassengerFromDatabase(uid);
};

export const DeletePassenger = async (passengerId: string, uid: string) => {
  return await DeletePassengerFromDatabase(passengerId, uid);
};

export const UpdatePassenger = async (
  passenger: Passenger,
  uid: string,
  passengerId: string
) => {
  await UpdatePassengerInDatabase(passenger, uid, passengerId);
};
