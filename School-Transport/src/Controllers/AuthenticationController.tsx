import { 
  CreateUserWithEmailPassword, 
  LoginWithEmailPassword,
  ForgotPassword,
  SetPassword,
  VerifyEmail
} from "../Data/Authentication";

export const UserSignUp = async (userEmail: string, userPassword: string) => {
   return await CreateUserWithEmailPassword(userEmail, userPassword);
};
export const UserSignIn = async (userEmail: string, userPassword: string) => {
   return await LoginWithEmailPassword(userEmail, userPassword);
};
export const UserForgotPassword = async (userEmail: string) => {
   return await ForgotPassword(userEmail);
};
export const UserSetPassword = async (userPassword: string) => {
   return await SetPassword(userPassword);
};
export const UserVerifyEmail = async () => {
   return await VerifyEmail();
};
