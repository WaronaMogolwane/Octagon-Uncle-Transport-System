import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GluestackUIProvider,
  config,
  Image,
  Input,
  InputField,
  RadioGroup,
  VStack,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  ButtonText,
  Button,
  Radio,
  CircleIcon,
} from "@gluestack-ui/themed";

const BasicInformationSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [role, setRole] = useState("");

  const submitButton = async () => {
    console.log(firstName, lastName, cellphone, idNumber, role);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <GluestackUIProvider config={config}>
          <View>
            <View style={styles.container}>
              <Image
                style={{ margin: 15 }}
                size="md"
                borderRadius={15}
                source={{
                  uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                }}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.textColorLabel}>First Name</Text>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  placeholder="John"
                  onChangeText={(text: string) => {
                    setFirstName(text);
                  }}
                  value={firstName}
                />
              </Input>
            </View>
            <View style={styles.input}>
              <Text style={styles.textColorLabel}>Last Name</Text>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  placeholder="Doe"
                  onChangeText={(text: string) => {
                    setLastName(text);
                  }}
                  value={lastName}
                />
              </Input>
            </View>
            <View style={styles.input}>
              <Text style={styles.textColorLabel}>Cellphone</Text>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  placeholder="1234567890"
                  onChangeText={(text: string) => {
                    setCellphone(text);
                  }}
                  value={cellphone}
                />
              </Input>
            </View>
            <View style={styles.input}>
              <Text style={styles.textColorLabel}>ID Number</Text>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  placeholder="Enter ID number here"
                  onChangeText={(text: string) => {
                    setIdNumber(text);
                  }}
                  value={idNumber}
                />
              </Input>
            </View>
            <View style={styles.input}>
              <Text style={{ fontWeight: "bold" }}>
                What role best fits who you are?
              </Text>
            </View>
            <View style={styles.input}>
              <RadioGroup value={role} onChange={setRole}>
                <VStack space="sm">
                  <Radio value="1">
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Client</RadioLabel>
                  </Radio>
                  <Radio value="2">
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Driver</RadioLabel>
                  </Radio>
                  <Radio value="3">
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Transport Partner</RadioLabel>
                  </Radio>
                </VStack>
              </RadioGroup>
            </View>
            <View style={styles.button}>
              <Button
                size="md"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={submitButton}
              >
                <ButtonText>Next</ButtonText>
              </Button>
            </View>
          </View>
        </GluestackUIProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasicInformationSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    margin: 30,
  },
  input: {
    alignItems: "flex-start",
    margin: 15,
    marginEnd: 10,
  },
  textLabel: {
    alignItems: "center",
    margin: 15,
    marginEnd: 10,
  },
  textColorLabel: {
    color: "#808080",
    marginBottom: 5,
  },
  textStyle: {
    fontWeight: "bold",
  },
});
