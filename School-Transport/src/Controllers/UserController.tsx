import {
  AddUserToDatabase,
  GetAllUsersFromDatabase,
  GetUserDetailsFromDatabase,
  deleteUserFromDatabase,
} from "../Data/UserDAL";
import { Parent } from "../Models/UserData";

export const AddUser = async (parentDetails: Parent) => {
  await AddUserToDatabase(parentDetails);
};

export const GetUser = async () => {
  return await GetUserDetailsFromDatabase();
};

export const GetAllUsers = async () => {
  return await GetAllUsersFromDatabase();
};

export const deleteUser = async () => {
  return await deleteUserFromDatabase();
};
