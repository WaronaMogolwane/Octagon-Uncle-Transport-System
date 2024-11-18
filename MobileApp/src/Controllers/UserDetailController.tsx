import {
  AddUserDetailsToDB,
  // GetAllUserDetailsFromDatabase,
  GetUserDetailsFromDB,
  GetUserProfileImageFromDB,
  UpdateProfileImageUrlInDB,
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

export const GetUserProfileImage = async (userId: string) => {
  return await GetUserProfileImageFromDB(userId);
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

export const UpdateProfileUrl = async (userId: string, profileUrl: string) => {
  return await UpdateProfileImageUrlInDB(userId, profileUrl);
};
