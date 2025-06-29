import {
  CheckDuplicateEmailFromDB,
  GetUserActiveStatusFromDB,
  GetUserFromDB,
  RestoreUserPasswordInDB,
  UpdateUserEmailInDB,
  UpdateUserPasswordInDB,
} from '../Data/UserDAL';

export const GetUser = async (userId: string) => {
  return await GetUserFromDB(userId);
};

export const GetUserActiveStatus = async (userId: string) => {
  return await GetUserActiveStatusFromDB(userId);
};

export const CheckDuplicateEmail = async (email: string) => {
  return await CheckDuplicateEmailFromDB(email);
};

export const UpdateUserEmail = async (
  userId: string,
  email: string,
  name: string,
) => {
  return await UpdateUserEmailInDB(userId, email, name);
};

export const UpdateUserPassword = async (
  userId: string,
  password: string,
  oldPassword: string,
) => {
  return await UpdateUserPasswordInDB(userId, password, oldPassword);
};

export const RestorUserPassword = async (userId: string, password: string) => {
  return await RestoreUserPasswordInDB(userId, password);
};
