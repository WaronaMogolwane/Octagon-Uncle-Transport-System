import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  UserSignUp,
  UserSignIn,
  UserForgotPassword,
  UserSetPassword,
  UserVerifyEmail,
} from "./../Controllers/AuthenticationController";

const SignUpPage = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32 }}>Authentication Functions</Text>
      <TouchableOpacity style={styles.button}
        onPress={() =>
          userAuthentication.SignUp("mogolwanew@gmail.com", "Test12345")}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={() =>
          userAuthentication.SignIn("mogolwanew@gmail.com", "Test12345")}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={() =>
          userAuthentication.ForgotPassword("mogolwanew@gmail.com")}>
        <Text>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={() =>
          userAuthentication.SetPassword("Test12345")}>
        <Text>Set Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={() =>
          userAuthentication.VerifyEmail()}>
        <Text>Verify Email</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUpPage

const userAuthentication = {
  SignUp: async (userEmail: string, userPassword: string) => {
    await UserSignUp(userEmail, userPassword)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  SignIn: async (userEmail: string, userPassword: string) => {
    await UserSignIn(userEmail, userPassword)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  ForgotPassword: async (userEmail: string) => {
    await UserForgotPassword(userEmail)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  SetPassword: async (userPassword: string) => {
    await UserSetPassword(userPassword)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  VerifyEmail: async () => {
    await UserVerifyEmail()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    fontSize: 16,
    marginVertical: 16
  }
});
