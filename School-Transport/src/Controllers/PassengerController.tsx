import {
  AddPassengerToDatabase,
  GetPassengerFromDatabase,
  GetAllPassengerFromDatabase,
  DeletePassengerFromDatabase,
  UpdatePassengerInDatabase,
} from "../Data/PassengerDAL";
import { Passenger } from "../Models/Passenger";

export const AddPassenger = async (child: Passenger, uid: string) => {
  await AddPassengerToDatabase(child, uid);
};

export const GetPassenger = async (childId: string, uid: string) => {
  return await GetPassengerFromDatabase(childId, uid);
};

export const GetAllPassenger = async (uid: string) => {
  return await GetAllPassengerFromDatabase(uid);
};

export const DeletePassenger = async (childId: string, uid: string) => {
  return await DeletePassengerFromDatabase(childId, uid);
};

export const UpdatePassenger = async (child: Passenger, uid: string) => {
  await UpdatePassengerInDatabase(child, uid);
};
