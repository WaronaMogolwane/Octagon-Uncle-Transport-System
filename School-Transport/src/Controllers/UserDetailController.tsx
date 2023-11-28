import {
  AddUserDetailsToDatabase,
  // GetAllUserDetailsFromDatabase,
  GetUserDetailsFromDatabase,
  // DeleteUserDetailsFromDatabase,
  UpdateUserDetailsInDatabase,
} from "../Data/UserDetailDAL";
import { UserDetail } from "../Models/UserDetail";

export const AddUserDetail = async (userDetail: UserDetail) => {
  await AddUserDetailsToDatabase(userDetail);
};

export const GetUserDetail = async (userDetail: string) => {
  return await GetUserDetailsFromDatabase(userDetail);
};

export const GetAllUserDetails = async () => {
  //return await GetAllUserDetailsFromDatabase();
};

export const DeleteUserDetail = async (uid: string) => {
  //return await DeleteUserDetailsFromDatabase(uid);
};

export const UpdateUserDetail = async (userDetail: UserDetail) => {
  await UpdateUserDetailsInDatabase(userDetail);
};
