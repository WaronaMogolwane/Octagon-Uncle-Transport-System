import {Heading, VStack} from '@gluestack-ui/themed';
import {View} from 'react-native';
import {UserDetailsFormProps} from '../../Models/FormControlProps';
import {CustomButton1} from '../Buttons';
import {
  CustomFormControlInput,
  CustomFormControlInputNumber,
  CustomFormControlInputPhone,
} from '../CustomFormInput';

export function UserDetailForm(props: UserDetailsFormProps) {
  return (
    <View>
      <Heading mb="$3">{props.heading}</Heading>
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
        <CustomFormControlInputPhone
          labelText="Phone number"
          placeHolder="phone number"
          isInvalid={props.phoneNumberIsInvalid}
          isRequired={true}
          type="text"
          onChangeText={props.phoneNumberOnChangeText}
          errorText={props.phoneNumberErrorText}
          onBlur={props.phoneNumberOnBlur}
          value={props.phoneNumberValue}
        />
        <CustomFormControlInput
          labelText="Addressline 1"
          placeHolder="address"
          isInvalid={props.addressline1IsInvalid}
          isRequired={true}
          type="text"
          onChangeText={props.addressline1OnChangeText}
          errorText={props.addressline1ErrorText}
          onBlur={props.addressline1OnBlur}
          value={props.addressline1Value}
        />
        <CustomFormControlInput
          labelText="Addressline 2"
          placeHolder="address"
          isInvalid={props.addressline2IsInvalid}
          isRequired={false}
          type="text"
          onChangeText={props.addressline2OnChangeText}
          errorText={props.addressline2ErrorText}
          onBlur={props.addressline2OnBlur}
          value={props.addressline2Value}
        />

        <CustomFormControlInput
          labelText="Suburb"
          placeHolder="suburb"
          isInvalid={props.suburbIsInvalid}
          isRequired={true}
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
          isRequired={true}
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
          isRequired={true}
          type="text"
          onChangeText={props.provinceOnChangeText}
          errorText={props.provinceErrorText}
          onBlur={props.provinceOnBlur}
          value={props.provinceValue}
        />

        <CustomFormControlInputNumber
          labelText="Postal Code"
          placeHolder="postal code"
          isInvalid={props.postalCodeIsInvalid}
          isRequired={true}
          type="text"
          onChangeText={props.postalCodeOnChangeText}
          errorText={props.postalCodeErrorText}
          onBlur={props.postalCodeOnBlur}
          value={props.postalCodeValue}
        />
        {props.showButton ? (
          <CustomButton1 title={'Submit'} onPress={props.submitUserDetails} />
        ) : null}
      </VStack>
    </View>
  );
}
