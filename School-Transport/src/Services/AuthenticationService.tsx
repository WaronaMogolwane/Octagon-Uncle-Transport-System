import React from "react";
import { useStorageState } from "./StorageStateService";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase/FirebaseConfig";
import { AuthenticationResponseModel } from "../Models/AuthenticationResponseModel";

const AuthContext = React.createContext<{
  signIn: (userEmail: string, userPassword: string) => any;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
} | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: any) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (userEmail: string, userPassword: string) => {
          // Perform sign-in logic here
          let response;
          authenticationResponse = new AuthenticationResponseModel();
          await signInWithEmailAndPassword(
            FIREBASE_AUTH,
            userEmail,
            userPassword
          )
            .then((userCredential) => {
              const user = userCredential.user;
              authenticationResponse.firebaseFunction =
                "signInWithEmailAndPassword";
              authenticationResponse.uid = user.uid;
              authenticationResponse.status = "Success";
              response = Promise.resolve(authenticationResponse);
              setSession(user.uid);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              authenticationResponse.firebaseFunction =
                "signInWithEmailAndPassword";
              authenticationResponse.errorCode = errorCode;
              authenticationResponse.errorMessage = errorMessage;
              authenticationResponse.status = "Failed";
              response = Promise.reject(authenticationResponse);
            });
          return response;
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

let authenticationResponse: AuthenticationResponseModel;

export const CreateUserWithEmailPassword = async (
  userEmail: string,
  userPassword: string
) => {
  authenticationResponse = new AuthenticationResponseModel();
  await createUserWithEmailAndPassword(FIREBASE_AUTH, userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      authenticationResponse.firebaseFunction =
        "createUserWithEmailAndPassword";
      authenticationResponse.uid = user.uid;
      authenticationResponse.status = "Success";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      authenticationResponse.firebaseFunction =
        "createUserWithEmailAndPassword";
      authenticationResponse.errorCode = errorCode;
      authenticationResponse.errorMessage = errorMessage;
      authenticationResponse.status = "Failed";
    });
  return authenticationResponse;
};

export const LoginWithEmailPassword = async (
  userEmail: string,
  userPassword: string
) => {
  let response;
  authenticationResponse = new AuthenticationResponseModel();
  await signInWithEmailAndPassword(FIREBASE_AUTH, userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      authenticationResponse.firebaseFunction = "signInWithEmailAndPassword";
      authenticationResponse.uid = user.uid;
      authenticationResponse.status = "Success";
      response = Promise.resolve(authenticationResponse);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      authenticationResponse.firebaseFunction = "signInWithEmailAndPassword";
      authenticationResponse.errorCode = errorCode;
      authenticationResponse.errorMessage = errorMessage;
      authenticationResponse.status = "Failed";
      response = Promise.reject(authenticationResponse);
    });
  return response;
};

export const ForgotPassword = async (userEmail: string) => {
  authenticationResponse = new AuthenticationResponseModel();
  await sendPasswordResetEmail(FIREBASE_AUTH, userEmail)
    .then(() => {
      authenticationResponse.firebaseFunction = "sendPasswordResetEmail";
      authenticationResponse.status = "Success";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      authenticationResponse.firebaseFunction = "sendPasswordResetEmail";
      authenticationResponse.errorCode = errorCode;
      authenticationResponse.errorMessage = errorMessage;
      authenticationResponse.status = "Failed";
    });
  return authenticationResponse;
};

export const SetPassword = async (newUserPassword: string) => {
  authenticationResponse = new AuthenticationResponseModel();
  const user: any = FIREBASE_AUTH.currentUser;
  await updatePassword(user, newUserPassword)
    .then(() => {
      authenticationResponse.firebaseFunction = "updatePassword";
      authenticationResponse.status = "Success";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      authenticationResponse.firebaseFunction = "updatePassword";
      authenticationResponse.errorCode = errorCode;
      authenticationResponse.errorMessage = errorMessage;
      authenticationResponse.status = "Failed";
    });
  return authenticationResponse;
};

export const VerifyEmail = async () => {
  const user: any = FIREBASE_AUTH.currentUser;
  await sendEmailVerification(user).then(() => {
    authenticationResponse.firebaseFunction = "sendEmailVerification";
    authenticationResponse.status = "Success";
  });
  return authenticationResponse;
};
