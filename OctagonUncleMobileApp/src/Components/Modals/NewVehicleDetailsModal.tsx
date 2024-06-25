import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {CustomFormControlInput} from '../CustomFormInput';
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  Icon,
  CloseIcon,
  ModalBody,
  ModalFooter,
  ButtonText,
  Button,
  Modal,
  Image,
  Text,
  FormControlLabel,
  FormControlLabelText,
  ScrollView,
} from '@gluestack-ui/themed';
import {
  DriverDetailsModalProps,
  VehicleDetailsModalProps as VehicleModalProps,
} from '../../Props/ModalProps';
import VehicleSelect from '../Cards/Select/VehicleSelect';
import RemoveDriverAlert from '../Alerts/RemoveDriverAlert';
import DriverSelect from '../Cards/Select/DriverSelect';
import RemoveVehicleAlert from '../Alerts/RemoveVehicleAlert';
const data: any = [];

const NewVehicleModal = (props: VehicleModalProps) => {
  return (
    <View>
      <Modal
        closeOnOverlayClick={false}
        isOpen={props.ShowModal}
        onClose={props.CloseOtpModalButtonOnPress}>
        <ModalBackdrop />
        <ModalContent backgroundColor="#fff" height={'90%'}>
          <ModalHeader>
            <Heading size="lg">Add New Vehicle</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ScrollView persistentScrollbar={true}>
            <ModalBody>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                {props.VehicleImageFrontUrl !== '' ? (
                  <Image
                    source={props.VehicleImageFrontUrl}
                    alt="Vehicle front image."
                  />
                ) : null}
                {props.VehicleImageFrontUrl !== '' ? (
                  <Image
                    source={props.VehicleImageBackUrl}
                    alt="Vehicle rear image."
                  />
                ) : null}
              </View>
              <FormControlLabel>
                <FormControlLabelText>Link a driver.</FormControlLabelText>
              </FormControlLabel>
              <DriverSelect
                data={props.DriverList?.length ? props.DriverList : null}
                currentDriverIndex={0}
              />
              <CustomFormControlInput
                labelText="Make"
                placeHolder="Make"
                isInvalid={props.MakeIsInvalid}
                isRequired={true}
                type="text"
                onChangeText={props.MakeOnChangeText}
                errorText={props.MakeErrorText}
                onBlur={props.MakeOnBlur}
                value={props.MakeValue}
                isDisabled={true}
              />
              <CustomFormControlInput
                labelText="Model"
                placeHolder="Model"
                isInvalid={props.ModelIsInvalid}
                isRequired={true}
                type="text"
                onChangeText={props.ModelOnChangeText}
                errorText={props.ModelErrorText}
                onBlur={props.ModelOnBlur}
                value={props.ModelValue}
                isDisabled={true}
              />
              <CustomFormControlInput
                labelText="Colour"
                placeHolder="Colour"
                isInvalid={props.ColourIsInvalid}
                isRequired={true}
                type="text"
                onChangeText={props.ColourOnChangeText}
                errorText={props.ColourErrorText}
                onBlur={props.ColourOnBlur}
                value={props.ColourValue}
                isDisabled={true}
              />

              <CustomFormControlInput
                labelText="License Number"
                placeHolder="License Number"
                isInvalid={props.LicenseNumberIsInvalid}
                isRequired={true}
                type="text"
                onChangeText={props.LicenseNumberOnChangeText}
                errorText={props.LicenseNumberErrorText}
                onBlur={props.LicenseNumberOnBlur}
                value={props.LicenseNumberValue}
                isDisabled={true}
              />
              <CustomFormControlInput
                labelText="Vin"
                placeHolder="Vin"
                isInvalid={props.VinIsInvalid}
                isRequired={true}
                type="text"
                onChangeText={props.VinOnChangeText}
                errorText={props.VinErrorText}
                onBlur={props.VinOnBlur}
                value={props.VinValue}
                isDisabled={true}
              />
              <CustomFormControlInput
                labelText="Engine Number"
                placeHolder="Engine Number"
                isInvalid={props.EngineNumberIsInvalid}
                isRequired={true}
                type="text"
                onChangeText={props.EngineNumberOnChangeText}
                errorText={props.EngineNumberErrorText}
                onBlur={props.EngineNumberOnBlur}
                value={props.EngineNumberValue}
                isDisabled={true}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                size="sm"
                action="negative"
                borderWidth="$0"
                onPress={props.CloseOtpModalButtonOnPress}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                variant="solid"
                size="sm"
                action="primary"
                mr="$3"
                onPress={props.HandleSaveVehicle}>
                {/* onPress={() => {}}> */}
                <ButtonText>Save</ButtonText>
              </Button>
            </ModalFooter>
          </ScrollView>
        </ModalContent>
      </Modal>
    </View>
  );
};

export default NewVehicleModal;
