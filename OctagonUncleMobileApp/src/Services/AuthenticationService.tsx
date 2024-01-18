import React, {useState} from 'react';
import {setStorageItemAsync, useStorageState} from './StorageStateService';
import {AuthenticationResponseModel} from '../Models/AuthenticationResponseModel';
import axios from 'axios';
import {UserSignIn} from '../Controllers/AuthenticationController';
import {SERVER_HOST, SERVER_PORT} from '@env';
import {UserInvitationModel} from '../Models/UserInvitation';

export const AuthContext = React.createContext<{
  signIn?: (
    userEmail: string,
    userPassword: string,
    callback: (error: any, result: any) => void,
  ) => any;
  signOut?: () => void;
  session?: string | null | undefined;
  isLoading?: boolean;
} | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: any) {
  const [[isLoading, session], setSession] = useStorageState('session');
  return (
    <AuthContext.Provider
      value={{
        signIn: async (
          userEmail: string,
          userPassword: string,
          callback: (error: any, result: any) => any,
        ) => {
          await LoginWithEmailPassword(
            userEmail,
            userPassword,
            (error, result) => {
              if (error) {
                callback(error, null);
              } else {
                setSession(result.headers.sessionid);
                callback(null, result.data);
              }
            },
          );
        },
        signOut: async () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

let authenticationResponse: AuthenticationResponseModel;

export const CreateUserWithEmailPassword = async (
  userEmail: string,
  userPassword: string,
) => {
  authenticationResponse = new AuthenticationResponseModel();

  return authenticationResponse;
};

export const LoginWithEmailPassword = async (
  userEmail: string,
  userPassword: string,
  callback: (error: any, result: any) => void,
) => {
  console.log(`${SERVER_HOST}:${SERVER_PORT}/auth/login`);
  authenticationResponse = new AuthenticationResponseModel();
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/auth/login`, {
      email: userEmail,
      password: userPassword,
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};

export const ForgotPassword = async (userEmail: string) => {
  authenticationResponse = new AuthenticationResponseModel();

  return authenticationResponse;
};

export const SetPassword = async (newUserPassword: string) => {
  authenticationResponse = new AuthenticationResponseModel();

  return authenticationResponse;
};

export const VerifyUserInvitation = async (
  userInvitation: UserInvitationModel,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/auth/verify-invitation`, {
      invitationCode: userInvitation.invitationCode,
      userRole: userInvitation.userRole,
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};
