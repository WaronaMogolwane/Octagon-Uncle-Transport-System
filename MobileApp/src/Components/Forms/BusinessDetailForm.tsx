import {Button, ButtonText, VStack} from '@gluestack-ui/themed';
import {View} from 'react-native';
import {AddBusinessDetailFormProps} from '../../Models/FormControlProps';
import {CustomButton1} from '../Buttons';
import {
  CustomFormControlInput,
  CustomFormControlInputNumber,
} from '../CustomFormInput';

export function BusinessDetailForm(props: AddBusinessDetailFormProps) {
  return (
    <VStack>
      <CustomFormControlInput
        labelText="Business name"
        placeHolder="business name"
        isInvalid={props.businessNameIsInvalid}
        isRequired={true}
        type="text"
        onChangeText={props.businessNameOnChangeText}
        errorText={props.businessNameErrorText}
        onBlur={props.businessNameOnBlur}
        value={props.businessNameValue}
      />

      <CustomFormControlInputNumber
        labelText="Business phone number"
        placeHolder="business phone number"
        isInvalid={props.businessPhoneNumberIsInvalid}
        isRequired={true}
        type="text"
        onChangeText={props.businessPhoneNumberOnChangeText}
        errorText={props.businessPhoneNumberErrorText}
        onBlur={props.businessPhoneNumberOnBlur}
        value={props.businessPhoneNumberValue}
      />

      <CustomFormControlInput
        labelText="Address line 1"
        placeHolder="address line 1"
        isInvalid={props.addressline1IsInvalid}
        isRequired={true}
        type="text"
        onChangeText={props.addressline1OnChangeText}
        errorText={props.addressline1ErrorText}
        onBlur={props.addressline1OnBlur}
        value={props.addressline1Value}
      />
      <CustomFormControlInput
        labelText="Address line 2"
        placeHolder="address line 2"
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
        labelText="Postal code"
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
        <Button
          size="sm"
          action="positive"
          borderWidth="$0"
          onPress={props.submitBusinessDetail}>
          <ButtonText>{props.buttonText}</ButtonText>
        </Button>
      ) : null}
    </VStack>
  );
}
