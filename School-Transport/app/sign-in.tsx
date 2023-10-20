import { router } from "expo-router";
import { FormControlInput } from "../src/Components/FormControl";
import React, { useState } from "react";
import { FormStyles, Theme } from "../src/Stylesheets/GlobalStyles";
import {
  GluestackUIProvider,
  Text,
  Box,
  FormControlLabel,
  FormControl,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  AlertCircleIcon,
  Input,
  InputField,
  Button,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Heading,
  Icon,
  CloseIcon,
  Image,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import { useSession } from "../src/Data/Authentication";
import { UserSignIn } from "../src/Controllers/AuthenticationController";

export default function SignIn() {
  const { signIn }: any = useSession();

  const ref = React.useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [role, setRole] = useState("");
  const [signInInputs, setSignInInputs] = useState({
    email: "",
    password: "",
  });
  const [emailFormInput, setEmailInput] = useState({
    isInvalid: false,
    isDisabled: false,
    errorText: "",
  });
  const [passwordFormInput, setPasswordInput] = useState({
    isInvalid: true,
    isDisabled: false,
    errorText: "",
  });

  const [testState, setTestSTate] = useState(false);
  const handleOnChange = (text: any, input: any) => {
    setSignInInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const UserAuth = {
    SignIn: (userEmail: string, userPassword: string) => {
      UserSignIn(userEmail, userPassword)
        .then((response) => {
          console.log(response);
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
          setTestSTate(true);
          // setPasswordInput({
          //   isInvalid: false,
          //   isDisabled: false,
          //   errorText: "Email and password do not match.",
          // });
        });
    },
    ValidateLoginInputs: (email: string, password: string) => {},
  };

  return (
    <GluestackUIProvider config={config}>
      <Box style={Theme.container}>
        <Image
          style={Theme.logo}
          alt="Logo"
          size="lg"
          source={{
            uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          }}
        />

        <FormControlInput
          inputIsInvalid={testState}
          inputIsDisabled={emailFormInput.isDisabled}
          inputErrorText={emailFormInput.errorText}
          isRequired={true}
          type={"text"}
          defaultValue={""}
          placeHolder={""}
          size={"md"}
          labelText={"Email"}
          helperText={"Enter your email."}
          onChangeText={(text: any) => handleOnChange(text, "email")}
        />

        <FormControlInput
          inputIsInvalid={testState}
          inputIsDisabled={passwordFormInput.isDisabled}
          inputErrorText={passwordFormInput.errorText}
          isRequired={true}
          type={"password"}
          defaultValue={""}
          placeHolder={""}
          size={"md"}
          labelText={"Password"}
          helperText={"Enter your password."}
          onChangeText={(text: any) => handleOnChange(text, "password")}
        />

        <FormControl>
          <Button
            bg="$darkBlue600"
            ref={ref}
            onPress={() => {
              UserAuth.SignIn(signInInputs.email, signInInputs.password);
            }}
          >
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Login
            </ButtonText>
          </Button>
        </FormControl>
      </Box>
    </GluestackUIProvider>
  );
}
