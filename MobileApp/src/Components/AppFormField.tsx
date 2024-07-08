import React from "react";
import { Text, TextInput } from "react-native";
const AppFormField = (props: any) => {
  const {
    placeholder,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;
  const hasError = errors[name] && touched[name];
  return (
    <>
      <TextInput
        placeholder={placeholder}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        {...inputProps}
      />
      {hasError && <Text style={{ color: "red" }}>{errors[name]}</Text>}
    </>
  );
};
export default AppFormField;
