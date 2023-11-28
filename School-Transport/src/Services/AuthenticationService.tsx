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
import axios from "axios";
import { UserSignIn } from "../Controllers/AuthenticationController";
import { router } from "expo-router";

const AuthContext = React.createContext<{
  signIn: (
    userEmail: string,
    userPassword: string,
    callback: (error: any, result: any) => void
  ) => any;
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
        signIn: async (
          userEmail: string,
          userPassword: string,
          callback: (error: any, result: any) => any
        ) => {
          // Perform sign-in logic here
          await LoginWithEmailPassword(
            userEmail,
            userPassword,
            (error, result) => {
              if (error) {
                callback(error, null);
              } else {
                setSession(result);
                console.log("Session Sign In:" + session);
                callback(null, result);
              }
            }
          );
        },
        signOut: () => {
          setSession(null);
          console.log("Session Sign Out:" + session);
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
  userPassword: string,
  callback: (error: any, result: any) => void
) => {
  authenticationResponse = new AuthenticationResponseModel();
  await axios
    .post("http://192.168.1.36:9999/auth/login", {
      email: "Yetty.Braun@yopmail.com",
      password: "wK6mMQESfR",
    })
    .then((response: any) => {
      let result = response.data;
      callback(null, result);
    })
    .catch((error) => {
      callback(error, null);
    });
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
