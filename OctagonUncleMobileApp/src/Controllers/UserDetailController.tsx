import {
  AddUserDetailsToDB,
  // GetAllUserDetailsFromDatabase,
  GetUserDetailsFromDB,
  // DeleteUserDetailsFromDatabase,
  UpdateUserDetailsInDB,
} from '../Data/UserDetailDAL';
import {UserDetail} from '../Models/UserDetail';

export const AddUserDetail = async (userDetail: UserDetail) => {
  return await AddUserDetailsToDB(userDetail);
};

export const GetUserDetail = async (userId: string) => {
  return await GetUserDetailsFromDB(userId);
};

export const GetAllUserDetails = async () => {
  //return await GetAllUserDetailsFromDatabase();
};

export const DeleteUserDetail = async (uid: string) => {
  //return await DeleteUserDetailsFromDatabase(uid);
};

export const UpdateUserDetail = async (userDetail: UserDetail) => {
  return await UpdateUserDetailsInDB(userDetail);
};
