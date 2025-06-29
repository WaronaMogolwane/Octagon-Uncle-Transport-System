import {Button, ButtonText, Heading, VStack} from '@gluestack-ui/themed';
import {View} from 'react-native';
import {AddPassengerFormProps} from '../../Models/FormControlProps';
import {CustomButton1} from '../Buttons';
import {
  CustomFormControlInput,
  CustomFormControlInputNumber,
} from '../CustomFormInput';

export function AddPassengerForm(props: AddPassengerFormProps) {
  return (
    <VStack>
      <CustomFormControlInput
        labelText="Firstname"
        placeHolder="firstname"
        isInvalid={props.firstNameIsInvalid}
        isRequired={true}
        type="text"
        onChangeText={props.firstNameOnChangeText}
        errorText={props.firstNameErrorText}
        onBlur={props.firstNameOnBlur}
        value={props.firstNameValue}
      />

      <CustomFormControlInput
        labelText="Lastname"
        placeHolder="lastname"
        isInvalid={props.lastNameIsInvalid}
        isRequired={true}
        type="text"
        onChangeText={props.lastNameOnChangeText}
        errorText={props.lastNameErrorText}
        onBlur={props.lastNameOnBlur}
        value={props.lastNameValue}
      />
      <CustomFormControlInputNumber
        labelText="Age"
        placeHolder="age"
        isInvalid={props.ageIsInvalid}
        isRequired={true}
        type="text"
        onChangeText={props.ageOnChangeText}
        errorText={props.ageErrorText}
        onBlur={props.ageOnBlur}
        value={props.ageValue}
      />
      <CustomFormControlInput
        labelText="Home Address"
        placeHolder="home address"
        isInvalid={props.homeAddressIsInvalid}
        isRequired={false}
        type="text"
        onChangeText={props.homeAddressOnChangeText}
        errorText={props.homeAddressErrorText}
        onBlur={props.homeAddressOnBlur}
        value={props.homeAddressValue}
      />

      <CustomFormControlInput
        labelText="Destination Address"
        placeHolder="destination address"
        isInvalid={props.destinationAddressIsInvalid}
        isRequired={false}
        type="text"
        onChangeText={props.destinationAddressOnChangeText}
        errorText={props.destinationAddressErrorText}
        onBlur={props.destinationAddressOnBlur}
        value={props.destinationAddressValue}
      />

      <CustomFormControlInput
        labelText="Suburb"
        placeHolder="suburb"
        isInvalid={props.suburbIsInvalid}
        isRequired={false}
        type="text"
        onChangeText={props.suburbOnChangeText}
        errorText={props.suburbErrorText}
        onBlur={props.suburbOnBlur}
        value={props.suburbValue}
      />

      <CustomFormControlInput
        labelText="City"
        placeHolder="city"
        isInvalid={props.cityIsInvalid}
        isRequired={false}
        type="text"
        onChangeText={props.cityOnChangeText}
        errorText={props.cityErrorText}
        onBlur={props.cityOnBlur}
        value={props.cityValue}
      />

      <CustomFormControlInput
        labelText="Province"
        placeHolder="province"
        isInvalid={props.provinceIsInvalid}
        isRequired={false}
        type="text"
        onChangeText={props.provinceOnChangeText}
        errorText={props.provinceErrorText}
        onBlur={props.provinceOnBlur}
        value={props.provinceValue}
      />

      <CustomFormControlInput
        labelText="Postal Code"
        placeHolder="postal code"
        isInvalid={props.postalCodeIsInvalid}
        isRequired={false}
        type="text"
        onChangeText={props.postalCodeOnChangeText}
        errorText={props.postalCodeErrorText}
        onBlur={props.postalCodeOnBlur}
        value={props.postalCodeValue}
      />
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        onPress={props.submitPassenger}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
}
