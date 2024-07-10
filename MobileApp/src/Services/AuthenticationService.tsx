import React, {useState} from 'react';
import {setStorageItemAsync, useStorageState} from './StorageStateService';
import {AuthenticationResponseModel} from '../Models/AuthenticationResponseModel';
import axios from 'axios';
import {UserSignIn} from '../Controllers/AuthenticationController';
//import {SERVER_HOST, SERVER_PORT} from '../Const/colors';
import {SERVER_HOST, SERVER_PORT} from '@env';

import {UserInvitation} from '../Models/UserInvitation';
import {User} from '../Models/UserModel';

export const AuthContext = React.createContext<{
  signIn?: (
    userEmail: string,
    userPassword: string,
    callback: (error: any, result: any) => void,
  ) => any;
  signUp?: (user: User, callback: (error: any, result: any) => void) => any;
  signOut?: () => void;
  emailOtp?: (
    email: string,
    callback: (error: any, result: any) => void,
  ) => void;
  verifyOtp?: (
    email: string,
    otp: string,
    callback: (error: any, result: any) => void,
  ) => void;
  createUserInvitation?: (
    userInvitation: UserInvitation,
    callback: (error: any, result: any) => void,
  ) => void;
  verifyUserInvitation?: (
    invitationCode: string,
    userRole: number,
    callback: (error: any, result: any) => void,
  ) => void;
  updateEmail?: (
    email: string,
    callback: (error: any, result: any) => void,
  ) => void;
  updatePassword?: (
    email: string,
    password: string,
    callback: (error: any, result: any) => void,
  ) => void;
  session?: string | null | undefined;
  authToken?: string | null | undefined;
  isLoading?: boolean;
  SetSession?: (session: string) => void;
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

export function SessionProvider(props: any, navigation: any) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [[tokenIsLoading, authToken], setAuthToken] =
    useStorageState('authToken');
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
        signUp: async (
          user: User,
          callback: (error: any, result: any) => void,
        ) => {
          await CreateUserWithEmailPassword(user, (error, result) => {
            if (error) {
              callback(error, null);
            } else {
              setAuthToken(result.headers.sessionid);
              callback(null, result);
            }
          });
        },
        signOut: async () => {
          setSession(null);
        },
        emailOtp: async (
          email: string,
          callback: (error: any, result: any) => void,
        ) => {
          await InsertEmailOtp(email, (error, result) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, result);
            }
          });
        },
        verifyOtp: async (
          otp: string,
          email: string,
          callback: (error: any, result: any) => void,
        ) => {
          await GetOtp(otp, email, (error, result) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, result);
            }
          });
        },
        createUserInvitation: async (
          userinvitation: UserInvitation,
          callback: (error: any, resul: any) => void,
        ) => {
          await InsertUserInvitation(userinvitation, (error, result) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, result);
            }
          });
        },
        SetSession(session: string) {
          setSession(session);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const CreateUserWithEmailPassword = async (
  user: User,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/auth/register-user`, {
      Password: user.password,
      Email: user.email,
      UserRole: user.userRole,
      BusinessId: user.businessId,
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};

export const InsertEmailOtp = async (
  email: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/auth/send-email-otp`, {
      userDetails: {
        email: email,
      },
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};

export const LoginWithEmailPassword = async (
  userEmail: string,
  userPassword: string,
  callback: (error: any, result: any) => void,
) => {
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
  let authenticationResponse = new AuthenticationResponseModel();

  return authenticationResponse;
};

export const SetPassword = async (newUserPassword: string) => {
  let authenticationResponse = new AuthenticationResponseModel();

  return authenticationResponse;
};

export const GetOtp = async (
  otp: string,
  email: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/auth/verify-otp`, {
      otp: otp,
      email: email,
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};
export const InsertUserInvitation = async (
  userInvitation: UserInvitation,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/auth/create-invitation`, {
      businessId: userInvitation.businessId,
      firstName: userInvitation.firstName,
      lastName: userInvitation.lastName,
      userEmail: userInvitation.userEmail,
      userRole: userInvitation.userRole,
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};
export const VerifyUserInvitation = async (
  invitationCode: string,
  userRole: number,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/auth/verify-invitation`, {
      invitationCode: invitationCode,
      userRole: userRole,
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};

/**
 * Returns a list of pending incitations. @param businessID string @param userRole number
 */
export const GetInvitationsByBusinessIdUserRole = async (
  businessId: string,
  userRole: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/auth/get-pending-invitations`, {
      params: {
        businessId: businessId,
        userRole: userRole,
      },
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};
export const DeleteUserInvitation = async (
  userInvitationId: string,
  userRole: number,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .delete(`${SERVER_HOST}:${SERVER_PORT}/auth/delete-user-invitation`, {
      data: {
        UserInvitationId: userInvitationId,
        UserRole: userRole,
      },
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};
export const GetDriversByBusinessId = async (
  businessId: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/auth/get-business-drivers`, {
      params: {
        businessId: businessId,
      },
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};
export const DeleteUserByUserIdAndRole = async (
  userId: string,
  userRole: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/auth/deactivate-user`, {
      UserId: userId,
      UserRole: userRole,
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};
export const GetClientsByBusinessId = async (
  businessId: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/auth/get-business-clients`, {
      params: {
        businessId: businessId,
      },
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};
