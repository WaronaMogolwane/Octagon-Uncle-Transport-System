import {
  FlatList,
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGlobalState} from '../../State';
import {
  AddPassenger,
  GetParentPassengers,
  UpdatePassenger,
} from '../../Controllers/PassengerController';
import {CustomButton1} from '../../Components/Buttons';
import {PassengerParentCard} from '../../Components/PassengerParentCard';
import {
  Modal,
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
  Input,
  InputField,
  useToast,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {AddPassengerForm} from '../../Components/Forms/AddPassengerForm';
import {Passenger} from '../../Models/Passenger';
import {CustomFormControlInput} from '../../Components/CustomFormInput';

const ManagePassengerScreen = ({navigation}: any) => {
  //   const [userId, x] = useGlobalState('userId');
  //   const [role, y] = useGlobalState('role');
  //   const [businessId, z] = useGlobalState('businessId');

  const [passengerList, setPassengerList] = useState([]);
  const [statusCode, setStatusCode] = useState(false);
  const [showPModal, setShowPModal] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [update, setUpdate] = useState(false);

  const [passengerId, setPassengerId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  //const [isActive, setIsActive] = useState('');
  const [isActiveText, setIsActiveText] = useState('');

  const ref = React.useRef(null);
  const toast = useToast();

  const userId = 'c7728615-394f-466b-833e-ea9dd60ba836';
  const role = 3;
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';

  useEffect(() => {
    GetPassengers();
  }, []);

  const GetPassengers = async () => {
    await GetParentPassengers(userId).then((result: any) => {
      setPassengerList(result);
      setStatusCode(!statusCode);
    });
  };

  const UpdatePassengerDetails = async (values: any) => {
    const updatePassenger = new Passenger(
      passengerId,
      values.firstname != '' ? values.firstname : firstName,
      values.lastname != '' ? values.lastname : lastName,
      values.age != '' ? values.age : age,
      values.homeAddress != '' ? values.homeAddress : homeAddress,
      values.destinationAddress != ''
        ? values.destinationAddress
        : destinationAddress,
      userId,
      businessId,
    );

    UpdatePassenger(updatePassenger).then((response: any) => {
      if (response[1] == 200) {
        setUpdate(false);
      }
    });
  };

  const CreatePassenger = async (values: any) => {
    const newPassenger = new Passenger(
      '',
      values.firstname,
      values.lastname,
      values.age,
      values.homeAddress,
      values.destinationAddress,
      userId,
      businessId,
    );

    AddPassenger(newPassenger).then(response => {
      if (response == 200) {
        setShowPModal(false);
        setStatusCode(!statusCode);
      } else {
        toast.show({
          placement: 'top',
          render: ({id}) => {
            const toastId = 'toast-' + id;
            return (
              <Toast nativeID={toastId} action="error" variant="solid">
                <VStack space="xs">
                  <ToastTitle>Error</ToastTitle>
                  <ToastDescription>
                    There was an a problem please try again
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      }
    });
  };

  const ClearFields = async () => {
    setPassengerId('');

    setFirstName('');
    setLastName('');
    setAge('');
    setHomeAddress('');
    setDestinationAddress('');
    setIsActiveText('');
  };

  const renderItemComponentPassengers = (itemData: any) => (
    <PassengerParentCard
      firstName={itemData.firstName}
      lastName={itemData.lastName}
      isActive={itemData.isActive}
      onPress={() => {
        setPassengerId(itemData.passengerId);
        setFirstName(itemData.firstName);
        setLastName(itemData.lastName);
        setAge(itemData.age);
        setHomeAddress(itemData.homeAddress);
        setDestinationAddress(itemData.destinationAddress);
        setIsActiveText(itemData.isActiveText);
        setShowCard(true);
      }}
    />
  );

  const showPopUp = () => {
    return (
      <Modal
        isOpen={showPModal}
        onClose={() => {
          setShowPModal(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Create Passenger</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <AddPassengerForm
              firstNameIsInvalid={!!formik.errors.firstname}
              firstNameOnChangeText={formik.handleChange('firstname')}
              firstNameErrorText={formik?.errors?.firstname}
              firstNameOnBlur={formik.handleBlur('firstname')}
              firstNameValue={formik.values?.firstname}
              lastNameIsInvalid={!!formik.errors.lastname}
              lastNameOnChangeText={formik.handleChange('lastname')}
              lastNameErrorText={formik?.errors?.lastname}
              lastNameOnBlur={formik.handleBlur('lastname')}
              lastNameValue={formik.values?.lastname}
              ageIsInvalid={!!formik.errors.age}
              ageOnChangeText={formik.handleChange('age')}
              ageErrorText={formik?.errors?.age}
              ageOnBlur={formik.handleBlur('age')}
              ageValue={formik.values?.age}
              homeAddressIsInvalid={!!formik.errors.homeAddress}
              homeAddressOnChangeText={formik.handleChange('homeAddress')}
              homeAddressErrorText={formik?.errors?.homeAddress}
              homeAddressOnBlur={formik.handleBlur('homeAddress')}
              homeAddressValue={formik.values?.homeAddress}
              destinationAddressIsInvalid={!!formik.errors.destinationAddress}
              destinationAddressOnChangeText={formik.handleChange(
                'destinationAddress',
              )}
              destinationAddressErrorText={formik?.errors?.destinationAddress}
              destinationAddressOnBlur={formik.handleBlur('destinationAddress')}
              destinationAddressValue={formik.values?.destinationAddress}
              submitPassenger={
                formik.handleSubmit as (
                  values:
                    | GestureResponderEvent
                    | React.FormEvent<HTMLFormElement>
                    | undefined,
                ) => void
              }
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const showUpdatePopUp = () => {
    return (
      <Modal
        isOpen={update}
        onClose={() => {
          setUpdate(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Update Passenger</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <AddPassengerForm
              firstNameIsInvalid={!!updateFormik.errors.firstname}
              firstNameOnChangeText={updateFormik.handleChange('firstname')}
              firstNameErrorText={updateFormik?.errors?.firstname}
              firstNameOnBlur={updateFormik.handleBlur('firstname')}
              firstNameValue={updateFormik.values?.firstname}
              lastNameIsInvalid={!!updateFormik.errors.lastname}
              lastNameOnChangeText={updateFormik.handleChange('lastname')}
              lastNameErrorText={updateFormik?.errors?.lastname}
              lastNameOnBlur={updateFormik.handleBlur('lastname')}
              lastNameValue={updateFormik.values?.lastname}
              ageIsInvalid={!!updateFormik.errors.age}
              ageOnChangeText={updateFormik.handleChange('age')}
              ageErrorText={updateFormik?.errors?.age}
              ageOnBlur={updateFormik.handleBlur('age')}
              ageValue={updateFormik.values?.age}
              homeAddressIsInvalid={!!updateFormik.errors.homeAddress}
              homeAddressOnChangeText={updateFormik.handleChange('homeAddress')}
              homeAddressErrorText={updateFormik?.errors?.homeAddress}
              homeAddressOnBlur={updateFormik.handleBlur('homeAddress')}
              homeAddressValue={updateFormik.values?.homeAddress}
              destinationAddressIsInvalid={
                !!updateFormik.errors.destinationAddress
              }
              destinationAddressOnChangeText={updateFormik.handleChange(
                'destinationAddress',
              )}
              destinationAddressErrorText={
                updateFormik?.errors?.destinationAddress
              }
              destinationAddressOnBlur={updateFormik.handleBlur(
                'destinationAddress',
              )}
              destinationAddressValue={updateFormik.values?.destinationAddress}
              submitPassenger={
                updateFormik.handleSubmit as (
                  values:
                    | GestureResponderEvent
                    | React.FormEvent<HTMLFormElement>
                    | undefined,
                ) => void
              }
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const showPassengerCard = () => {
    return (
      <Modal
        isOpen={showCard}
        onClose={() => {
          setShowCard(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Passenger Details</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View>
              <VStack>
                <CustomFormControlInput
                  labelText="Firstname"
                  isInvalid={false}
                  isDisabled={true}
                  type="text"
                  value={firstName}
                  isRequired={false}
                />

                <CustomFormControlInput
                  labelText="Lastname"
                  isInvalid={false}
                  isDisabled={true}
                  type="text"
                  value={lastName}
                  isRequired={false}
                />
                <CustomFormControlInput
                  labelText="Age"
                  isInvalid={false}
                  isDisabled={true}
                  type="text"
                  value={age}
                  isRequired={false}
                />
                <CustomFormControlInput
                  labelText="Home Address"
                  isInvalid={false}
                  isDisabled={true}
                  type="text"
                  value={homeAddress}
                  isRequired={false}
                />

                <CustomFormControlInput
                  labelText="Destination Address"
                  isInvalid={false}
                  isDisabled={true}
                  type="text"
                  value={destinationAddress}
                  isRequired={false}
                />

                <CustomFormControlInput
                  labelText="Active Status"
                  isInvalid={false}
                  isDisabled={true}
                  type="text"
                  value={isActiveText}
                  isRequired={false}
                  // style={{
                  //   color: isActiveText == 'Active' ? '#008000' : '#FF0000',
                  // }}
                />

                <CustomButton1
                  title={'Edit Passenger'}
                  onPress={() => {
                    setUpdate(true);
                    setShowCard(false);
                  }}
                />
              </VStack>
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const passengerInitialValues = {
    firstname: '',
    lastname: '',
    age: '',
    homeAddress: '',
    destinationAddress: '',
  };

  const passengerSchema = yup.object().shape({
    firstname: yup
      .string()
      .min(2, 'Firstname too Short!')
      .max(50, 'Firstname too Long!')
      .required('Required'),
    lastname: yup
      .string()
      .min(2, 'lastname too Short!')
      .max(50, 'lastname too Long!')
      .required('Required'),
    age: yup
      .number()
      .nullable()
      .notRequired()
      .min(1)
      .max(100)
      .required('Required')
      .test(
        'noEOrSign', // type of the validator (should be unique)
        "Number had an 'e' or sign.", // error message
        value => typeof value === 'number' && !/[eE+-]/.test(value.toString()),
      ),
    homeAddress: yup
      .string()
      .min(2, 'Address too Short')
      .max(200, 'Address long')
      .required('Required'),
    destinationAddress: yup
      .string()
      .min(2, 'Address too short')
      .max(200, 'Address too long')
      .required('Required'),
  });

  const updatePassengerSchema = yup.object().shape({
    firstname: yup
      .string()
      .min(2, 'Firstname too Short!')
      .max(50, 'Firstname too Long!'),
    lastname: yup
      .string()
      .min(2, 'lastname too Short!')
      .max(50, 'lastname too Long!'),
    age: yup
      .number()
      .nullable()
      .notRequired()
      .min(1)
      .max(100)
      .test(
        'noEOrSign', // type of the validator (should be unique)
        "Number had an 'e' or sign.", // error message
        value => typeof value === 'number' && !/[eE+-]/.test(value.toString()),
      ),
    homeAddress: yup
      .string()
      .min(2, 'Address too Short')
      .max(200, 'Address long'),
    destinationAddress: yup
      .string()
      .min(2, 'Address too short')
      .max(200, 'Address too long'),
  });

  const formik = useFormik({
    initialValues: passengerInitialValues,
    validationSchema: passengerSchema,

    onSubmit: (values, {resetForm}) => {
      CreatePassenger(values);
    },
  });

  const updateFormik = useFormik({
    initialValues: passengerInitialValues,
    validationSchema: updatePassengerSchema,

    onSubmit: (values, {resetForm}) => {
      UpdatePassengerDetails(values);
    },
  });

  return (
    <View style={{flex: 1}}>
      <View>
        <Text>ManagePassengerScreen</Text>
        {showPassengerCard()}
      </View>
      <View>
        <CustomButton1
          onPress={() => {
            setShowPModal(true);
          }}
          title="Create Passenger"
        />
      </View>
      <View>{showPopUp()}</View>
      <View>{showUpdatePopUp()}</View>
      <View>
        <FlatList
          data={passengerList}
          extraData={statusCode}
          renderItem={({item}) => renderItemComponentPassengers(item)}
        />
      </View>
    </View>
  );
};

export default ManagePassengerScreen;

const styles = StyleSheet.create({});
