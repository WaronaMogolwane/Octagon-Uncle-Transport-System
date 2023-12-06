import React, {useState} from 'react';
import {setStorageItemAsync, useStorageState} from './StorageStateService';
import {AuthenticationResponseModel} from '../Models/AuthenticationResponseModel';
import axios from 'axios';
import {UserSignIn} from '../Controllers/AuthenticationController';

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
  let [[isLoading, session], setSession] = useStorageState('session');

  // const [isLoading, setIsLoading] = useState(false);
  // const [session, setSession] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (
          userEmail: string,
          userPassword: string,
          callback: (error: any, result: any) => any,
        ) => {
          // Perform sign-in logic here
          await LoginWithEmailPassword(
            userEmail,
            userPassword,
            (error, result) => {
              if (error) {
                callback(error, null);
              } else {
                setStorageItemAsync('usesrToken', result);
                console.log('Session Sign In:' + session);
                callback(null, result);
              }
            },
          );
        },
        signOut: () => {
          setSession(null);
          console.log('Session Sign Out:' + session);
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
  authenticationResponse = new AuthenticationResponseModel();
  await axios
    .post('http://192.168.1.36:9999/auth/login', {
      email: 'Yetty.Braun@yopmail.com',
      password: 'wK6mMQESfR',
    })
    .then((response: any) => {
      let result = response.data;
      callback(null, result);
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

export const VerifyEmail = async () => {
  return authenticationResponse;
};
