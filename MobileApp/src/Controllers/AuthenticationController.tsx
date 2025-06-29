import {UserInvitation} from '../Models/UserInvitation';
import {User} from '../Models/UserModel';
import {
  CreateUserWithEmailPassword,
  LoginWithEmailPassword,
  ForgotPassword,
  SetPassword,
  VerifyUserInvitation,
  GetUserInvitationByEmail as GetUserInvitationByEmailAnduSerRole,
} from '../Services/AuthenticationService';

export const UserSignUp = async (
  user: User,
  callback: (error: any, result: any) => void,
) => {
  await CreateUserWithEmailPassword(user, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};
export const UserSignIn = async (userEmail: string, userPassword: string) => {
  await LoginWithEmailPassword(userEmail, userPassword, (error, result) => {
    if (error) {
      Promise.reject(error);
    } else {
      Promise.resolve(result);
    }
  });
};
export const UserForgotPassword = async (userEmail: string) => {
  return await ForgotPassword(userEmail);
};
export const UserSetPassword = async (userPassword: string) => {
  return await SetPassword(userPassword);
};
export const GetUserInvitation = async (
  email: string,
  userRole: number,
  callback: (error: any, result: any) => void,
) => {
  await GetUserInvitationByEmailAnduSerRole(
    email,
    userRole,
    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.data);
      }
    },
  );
};
export const UserVerifyEmail = async (
  invitationCode: string,
  userRole: number,
  callback: (error: any, result: any) => void,
) => {
  await VerifyUserInvitation(invitationCode, userRole, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result.data);
    }
  });
};
