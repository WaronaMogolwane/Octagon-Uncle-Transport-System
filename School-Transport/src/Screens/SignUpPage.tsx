import { StyleSheet } from "react-native";
import {
  UserSignUp,
  UserSignIn,
  UserForgotPassword,
  UserSetPassword,
  UserVerifyEmail,
} from "./../Controllers/AuthenticationController";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { FormControlInput } from "./../Components/FormControl";
import React, { useState, useEffect } from "react";
import { FormStyles, ThemeStyles } from "./../Stylesheets/GlobalStyles";
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

const ref = React.useRef(null);
const [showModal, setShowModal] = useState(false);
const [isEmailVerified, setIsEmailVerified] = useState(false);
const [role, setRole] = useState("");
const [inputs, setInputs] = useState({
  firstName: "",
  lastName: "",
  cellphone: "",
  IdNumber: "",
});

const handleOnChange = (text: any, input: any) => {
  setInputs((prevState) => ({ ...prevState, [input]: text }));
};

export default function SignUpPage() {
  <GluestackUIProvider config={config}>
    <Box style={ThemeStyles.container}>
      <Image
        style={ThemeStyles.logo}
        alt="Logo"
        size="lg"
        source={{
          uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        }}
      />
      <FormControlInput
        isInvalid={false}
        isDisabled={false}
        isRequired={false}
        type={"text"}
        defaultValue={""}
        placeHolder={"John"}
        size={"md"}
        labelText={"Cellphone"}
        helperText={"help"}
        errorText={"error"}
        onChangeText={(text: any) => handleOnChange(text, "firstName")}
      />
      {isEmailVerified ? (
        <FormControl>
          <Button bg="$darkBlue600">
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Next
            </ButtonText>
          </Button>
        </FormControl>
      ) : (
        <FormControl>
          <Button
            bg="$darkBlue600"
            onPress={() => setShowModal(true)}
            ref={ref}
          >
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Confirm
            </ButtonText>
          </Button>
        </FormControl>
      )}
    </Box>
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Cellphone verification</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>Enter the OTP sent to {}</Text>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField placeholder="Enter Text here" />
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => {
              setShowModal(false);
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={() => {
              setShowModal(false);
              setIsEmailVerified(true);
            }}
          >
            <ButtonText>Explore</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </GluestackUIProvider>;
}

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
    marginVertical: 16,
  },
});
