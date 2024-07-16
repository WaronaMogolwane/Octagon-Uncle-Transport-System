import {
  FlatList,
  GestureResponderEvent,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  AddPassenger,
  DeletePassenger,
  DeletePassengerRequest,
  GetAllPassengerForBusiness,
  GetAllPendingPassengerForBusiness,
  GetParentPassengers,
  UpdatePassenger,
} from '../../Controllers/PassengerController';
import {PassengerParentCard} from '../../Components/Cards/PassengerListForParentCard';
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
  ButtonIcon,
  AddIcon,
  Input,
  InputField,
  useToast,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  Fab,
  FabLabel,
  FabIcon,
  ArrowLeftIcon,
  TrashIcon,
  EditIcon,
} from '@gluestack-ui/themed';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {AddPassengerForm} from '../../Components/Forms/AddPassengerForm';
import {Passenger} from '../../Models/Passenger';
import {CustomFormControlInput} from '../../Components/CustomFormInput';
import {
  AssignPassengerScreenStyles,
  FlatlistStyles,
  ManagePassengerScreenStyles,
} from '../../Stylesheets/GlobalStyles';
import {Dropdown} from 'react-native-element-dropdown';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../../Services/AuthenticationService';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PassengerListAllCard from '../../Components/Cards/PassngerListForTransporterCard';
import PassengerListPendingCard from '../../Components/Cards/PassengerListPendingCard';
import {Auth} from '../../Classes/Auth';

const ManagePassengerScreen = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const Tab = createMaterialTopTabNavigator();

  const [passengerList, setPassengerList] = useState([]);
  const [showPModal, setShowPModal] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [update, setUpdate] = useState(false);

  const [passengerId, setPassengerId] = useState('');
  const [parentName, setParentName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [suburb, setSuburb] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [isActive, setIsActive] = useState('');
  const [isActiveText, setIsActiveText] = useState('');

  const ref = React.useRef(null);
  const toast = useToast();
  const [isFocus, setIsFocus] = useState(false);

  const [allPassengers, setAllPassengers] = useState([]);
  const [allPendingPassengers, setPendingPassengers] = useState([]);

  const [statusCode, setStatusCode] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const [noPassenger, setNoPassenger] = useState(false);
  const [noPendingPassenger, setNoPendingPassenger] = useState(false);

  const [showPassengerSummary, setShowPassengerSummary] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showreason, setShowReason] = useState(false);
  const [reason, setReason] = useState('');
  const [showOther, setShowOther] = useState(false);
  const [showReasonField, setShowReasonField] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const userId = auth.GetUserId();
  const businessId = auth.GetBusinessId();
  const role: number = Number(auth.GetUserRole());

  const defaultReasons = [
    {
      id: 0,
      reasonString: 'Input error.',
    },
    {id: 1, reasonString: 'Updating old information.'},
    {id: 2, reasonString: 'Other'},
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      GetPassengers();
    }, 2000);

    setRefreshing(false);
  }, []);

  useEffect(() => {
    GetPassengers();
  }, []);

  const GetPassengers = async () => {
    if (role == 1) {
      //Transporter
      await GetAllPassengerForBusiness(businessId).then((result: any) => {
        if (result.length != 0) {
          setNoPassenger(false);
          setAllPassengers(result);
          setStatusCode(!statusCode);
        } else {
          setNoPassenger(true);
        }
      });
      await GetAllPendingPassengerForBusiness(businessId).then(
        (result: any) => {
          if (result.length != 0) {
            setNoPendingPassenger(false);
            setPendingPassengers(result);
            setStatusCode(!statusCode);
          } else {
            setNoPendingPassenger(true);
          }
        },
      );
    } else if (role == 2) {
      //Parent
      await GetParentPassengers(userId).then((result: any) => {
        if (result.length != 0) {
          setNoPassenger(false);
          setPassengerList(result);
          setStatusCode(!statusCode);
        } else {
          setNoPassenger(true);
        }
      });
    }
  };

  const renderItemComponentAllPassengers = (itemData: any) => (
    <PassengerListAllCard
      passengerName={itemData.passengerName}
      pickUpLocation={itemData.homeAddress}
      isActive={itemData.isActive}
      onPress={() => {
        setPassengerId(itemData.passengerId);
        setFirstName(itemData.passengerFirstName);
        setLastName(itemData.passengerLastName);
        setAge(itemData.age.toString());
        setHomeAddress(itemData.homeAddress);
        setPostalCode(itemData.postalCode);
        setProvince(itemData.province);
        setCity(itemData.city);
        setSuburb(itemData.suburb);
        setDestinationAddress(itemData.destinationAddress);
        setParentName(itemData.parentName);
        setIsActiveText(itemData.isActivetext);
        setShowReasonField(false);
        setShowButton(false);
        setShowPassengerSummary(true);
      }}
    />
  );

  const renderItemComponentPendingPassengers = (itemData: any) => (
    <PassengerListPendingCard
      passengerName={itemData.passengerName}
      parentName={itemData.parentName}
      reason={itemData.reason}
      isActive={itemData.isActive}
      onPress={() => {
        setPassengerId(itemData.passengerId);
        setFirstName(itemData.passengerFirstName);
        setLastName(itemData.passengerLastName);
        setAge(itemData.age.toString());
        setHomeAddress(itemData.homeAddress);
        setDestinationAddress(itemData.destinationAddress);
        setParentName(itemData.parentName);
        setIsActiveText(itemData.isActivetext);
        setShowPassengerSummary(true);
        setShowReasonField(true);
        setShowButton(true);
      }}
    />
  );

  const UpdatePassengerDetails = async (values: any) => {
    const updatePassenger = new Passenger(
      passengerId,
      values.firstname != '' ? values.firstname.trim() : firstName,
      values.lastname != '' ? values.lastname.trim() : lastName,
      values.age != '' ? values.age.trim() : age,
      values.homeAddress != '' ? values.homeAddress.trim() : homeAddress,
      values.suburb != '' ? values.suburb.trim() : suburb,
      values.city != '' ? values.city.trim() : city,
      values.province != '' ? values.province.trim() : province,
      values.postalCode != '' ? values.postalCode.trim() : postalCode,
      values.destinationAddress != ''
        ? values.destinationAddress.trim()
        : destinationAddress,
      userId,
      businessId,
    );

    UpdatePassenger(updatePassenger).then((response: any) => {
      if (response[1] == 200) {
        setUpdate(false);
        GetPassengers();
        ClearFields();
      }
    });
  };

  const CreatePassenger = async (values: any) => {
    const newPassenger = new Passenger(
      '',
      values.firstname.trim(),
      values.lastname.trim(),
      values.age.trim(),
      values.homeAddress.trim(),
      values.suburb.trim(),
      values.city.trim(),
      values.province.trim(),
      values.postalCode.trim(),
      values.destinationAddress.trim(),
      userId,
      businessId,
    );

    AddPassenger(newPassenger).then(response => {
      if (response == 200) {
        setShowPModal(false);
        GetPassengers();
        setStatusCode(!statusCode);
        ClearFields();
      } else {
        ShowToast();
      }
    });
  };

  const ClearFields = async () => {
    setPassengerId('');
    setFirstName('');
    setLastName('');
    setAge('');
    setSuburb('');
    setCity('');
    setProvince('');
    setPostalCode('');
    setHomeAddress('');
    setDestinationAddress('');
    setIsActiveText('');
  };

  const renderItemComponentPassengers = (itemData: any) => (
    <PassengerParentCard
      firstName={itemData.firstName}
      lastName={itemData.lastName}
      isActive={itemData.isActive}
      isDeleted={itemData.isDeleted}
      onPress={() => {
        setPassengerId(itemData.passengerId);
        setFirstName(itemData.firstName);
        setLastName(itemData.lastName);
        setAge(itemData.age);
        setHomeAddress(itemData.homeAddress);
        setDestinationAddress(itemData.destinationAddress);
        setIsActiveText(itemData.isActiveText);
        setIsDeleted(itemData.isDeleted);
        setShowCard(true);
      }}
    />
  );

  const showPopUpModal = () => {
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
            <View style={{marginBottom: 30}}>
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
                destinationAddressOnBlur={formik.handleBlur(
                  'destinationAddress',
                )}
                destinationAddressValue={formik.values?.destinationAddress}
                suburbIsInvalid={!!formik.errors.suburb}
                suburbOnChangeText={formik.handleChange('suburb')}
                suburbErrorText={formik?.errors?.suburb}
                suburbOnBlur={formik.handleBlur('suburb')}
                suburbValue={formik.values?.suburb}
                cityIsInvalid={!!formik.errors.city}
                cityOnChangeText={formik.handleChange('city')}
                cityErrorText={formik?.errors?.city}
                cityOnBlur={formik.handleBlur('city')}
                cityValue={formik.values?.city}
                provinceIsInvalid={!!formik.errors.province}
                provinceOnChangeText={formik.handleChange('province')}
                provinceErrorText={formik?.errors?.province}
                provinceOnBlur={formik.handleBlur('province')}
                provinceValue={formik.values?.province}
                postalCodeIsInvalid={!!formik.errors.postalCode}
                postalCodeOnChangeText={formik.handleChange('postalCode')}
                postalCodeErrorText={formik?.errors?.postalCode}
                postalCodeOnBlur={formik.handleBlur('postalCode')}
                postalCodeValue={formik.values?.postalCode}
                submitPassenger={
                  formik.handleSubmit as (
                    values:
                      | GestureResponderEvent
                      | React.FormEvent<HTMLFormElement>
                      | undefined,
                  ) => void
                }
              />
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const showReasonModal = () => {
    return (
      <Modal
        isOpen={showreason}
        onClose={() => {
          setShowReason(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Delete Request</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View>
              <Text>
                Please selct a the most appropriate reason you are requesting{' '}
                {firstName} to be deleted.
              </Text>
            </View>
            <View style={{marginTop: 15}}>
              <Dropdown
                style={[
                  AssignPassengerScreenStyles.dropdown,
                  isFocus && {borderColor: 'blue'},
                ]}
                placeholderStyle={AssignPassengerScreenStyles.placeholderStyle}
                selectedTextStyle={
                  AssignPassengerScreenStyles.selectedTextStyle
                }
                inputSearchStyle={AssignPassengerScreenStyles.inputSearchStyle}
                iconStyle={AssignPassengerScreenStyles.iconStyle}
                data={defaultReasons}
                value={reason}
                maxHeight={300}
                labelField="reasonString"
                valueField="reasonString"
                placeholder={!isFocus ? 'Select reason of deletion' : '...'}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item: any) => {
                  if (item.id == 2) {
                    setReason('');
                    setShowOther(true);
                  } else {
                    setShowOther(false);
                    setReason(item.reasonString);
                  }
                  setIsFocus(false);
                }}
              />
            </View>
            {showOther ? (
              <View style={{marginTop: 15}}>
                <View>
                  <Text>Please enter the reason below.</Text>
                </View>
                <View>
                  <CustomFormControlInput
                    labelText="Reason"
                    isInvalid={false}
                    isDisabled={false}
                    type="text"
                    value={reason}
                    onChangeText={(text: any) => setReason(text)}
                    isRequired={false}
                  />
                </View>
              </View>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={{padding: 5}}>
                <Button
                  size="md"
                  variant="solid"
                  action="secondary"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={() => {
                    setShowReason(false);
                  }}>
                  <ButtonIcon as={ArrowLeftIcon} />
                  <ButtonText>Back</ButtonText>
                </Button>
              </View>
              <View style={{padding: 5}}>
                <Button
                  size="md"
                  variant="solid"
                  action="negative"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={() => {
                    DeletePassengerRequest(passengerId, reason.trim()).then(
                      (result: any) => {
                        if (result[1] == 200) {
                          GetPassengers();
                          setShowButton(false);
                          setShowCard(false);
                          setShowReason(false);

                          ShowSuccessToast();
                        } else {
                          //Something went wrong
                          ShowToast();
                        }
                      },
                    );
                  }}>
                  <ButtonIcon as={TrashIcon} />
                  <ButtonText>Delete</ButtonText>
                </Button>
              </View>
            </View>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const showPassengerSummaryModal = () => {
    return (
      <Modal
        isOpen={showPassengerSummary}
        onClose={() => {
          setShowPassengerSummary(false);
          setShowButton(false);
          setShowReasonField(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Passenger Summary</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View>
              <VStack>
                <CustomFormControlInput
                  labelText="Parent Name"
                  isInvalid={false}
                  isDisabled={true}
                  type="text"
                  value={parentName}
                  isRequired={false}
                />
                <CustomFormControlInput
                  labelText="Child Firstname"
                  isInvalid={false}
                  isDisabled={true}
                  type="text"
                  value={firstName}
                  isRequired={false}
                />

                <CustomFormControlInput
                  labelText="Child Lastname"
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
                />

                {showReasonField ? (
                  <CustomFormControlInput
                    labelText="Reason For Passenger Deletion"
                    isInvalid={false}
                    isDisabled={true}
                    type="text"
                    value={reason}
                    isRequired={false}
                  />
                ) : null}

                {showButton ? (
                  <Button
                    size="md"
                    variant="solid"
                    action="negative"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={() => {
                      DeletePassenger(passengerId).then((result: any) => {
                        if (result[1] == 200) {
                          GetPassengers();
                          setShowButton(false);
                          setShowPassengerSummary(false);
                          setShowReasonField(true);

                          ShowDeleteToast();
                        } else {
                          //Something went wrong
                          ShowToast();
                        }
                      });
                    }}>
                    <ButtonIcon as={TrashIcon} />
                    <ButtonText>Delete</ButtonText>
                  </Button>
                ) : null}
              </VStack>
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const showUpdatePopUpModal = () => {
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
            <View style={{marginBottom: 30}}>
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
                homeAddressOnChangeText={updateFormik.handleChange(
                  'homeAddress',
                )}
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
                destinationAddressValue={
                  updateFormik.values?.destinationAddress
                }
                suburbIsInvalid={!!updateFormik.errors.suburb}
                suburbOnChangeText={updateFormik.handleChange('suburb')}
                suburbErrorText={updateFormik?.errors?.suburb}
                suburbOnBlur={updateFormik.handleBlur('suburb')}
                suburbValue={updateFormik.values?.suburb}
                cityIsInvalid={!!updateFormik.errors.city}
                cityOnChangeText={updateFormik.handleChange('city')}
                cityErrorText={updateFormik?.errors?.city}
                cityOnBlur={updateFormik.handleBlur('city')}
                cityValue={updateFormik.values?.city}
                provinceIsInvalid={!!updateFormik.errors.province}
                provinceOnChangeText={updateFormik.handleChange('province')}
                provinceErrorText={updateFormik?.errors?.province}
                provinceOnBlur={updateFormik.handleBlur('province')}
                provinceValue={updateFormik.values?.province}
                postalCodeIsInvalid={!!updateFormik.errors.postalCode}
                postalCodeOnChangeText={updateFormik.handleChange('postalCode')}
                postalCodeErrorText={updateFormik?.errors?.postalCode}
                postalCodeOnBlur={updateFormik.handleBlur('postalCode')}
                postalCodeValue={updateFormik.values?.postalCode}
                submitPassenger={
                  updateFormik.handleSubmit as (
                    values:
                      | GestureResponderEvent
                      | React.FormEvent<HTMLFormElement>
                      | undefined,
                  ) => void
                }
              />
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const showPassengerCardModal = () => {
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
                />

                <View>
                  <View style={{padding: 5}}>
                    <Button
                      size="md"
                      variant="solid"
                      action="secondary"
                      isDisabled={false}
                      isFocusVisible={false}
                      onPress={() => {
                        setUpdate(true);
                        setShowCard(false);
                      }}>
                      <ButtonIcon as={EditIcon} />
                      <ButtonText>Edit Passenger</ButtonText>
                    </Button>
                  </View>
                  <View style={{padding: 5}}>
                    <Button
                      size="md"
                      variant="solid"
                      action="negative"
                      isDisabled={false}
                      isFocusVisible={false}
                      onPress={() => {
                        if (isDeleted) {
                          showDeletePendingToast();
                        } else {
                          setShowReason(true);
                        }
                      }}>
                      <ButtonIcon as={TrashIcon} />
                      <ButtonText>Delete Passenger</ButtonText>
                    </Button>
                  </View>
                </View>
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
    suburb: '',
    city: '',
    province: '',
    postalCode: '',
    destinationAddress: '',
  };

  const passengerSchema = yup.object().shape({
    firstname: yup
      .string()
      .min(2, 'Firstname too Short!')
      .max(50, 'Firstname too Long!'),
    lastname: yup
      .string()
      .min(2, 'lastname too Short!')
      .max(50, 'lastname too Long!'),
    age: yup.number().nullable().notRequired().min(1).max(100),
    homeAddress: yup
      .string()
      .min(2, 'Address too Short')
      .max(200, 'Address long'),
    suburb: yup
      .string()
      .min(2, 'Suburb too Short!')
      .max(50, 'Suburb too  Long!')
      .required('Required'),
    city: yup
      .string()
      .min(2, 'City too Short!')
      .max(50, 'City too Long!')
      .required('Required'),
    province: yup
      .string()
      .min(2, 'Province too Short!')
      .max(50, 'Province too Long!')
      .required('Required'),
    postalCode: yup
      .string()
      .min(2, 'Postal code too Short!')
      .max(4, 'Postal code too Long!')
      .required('Required'),
    destinationAddress: yup
      .string()
      .min(2, 'Address too short')
      .max(200, 'Address too long'),
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
    age: yup.number().nullable().notRequired().min(1).max(100),
    homeAddress: yup
      .string()
      .min(2, 'Address too Short')
      .max(200, 'Address long'),
    suburb: yup
      .string()
      .min(2, 'Suburb too Short!')
      .max(50, 'Suburb too  Long!'),
    city: yup.string().min(2, 'City too Short!').max(50, 'City too Long!'),
    province: yup
      .string()
      .min(2, 'Province too Short!')
      .max(50, 'Province too Long!'),
    postalcode: yup
      .string()
      .min(2, 'Postal code too Short!')
      .max(4, 'Postal code too Long!'),
    destinationAddress: yup
      .string()
      .min(2, 'Address too short')
      .max(200, 'Address too long'),
  });

  const formik = useFormik({
    initialValues: passengerInitialValues,
    validationSchema: passengerSchema,

    onSubmit: async (values, {resetForm}) => {
      CreatePassenger(values).finally(() => {
        resetForm();
      });
    },
  });

  const updateFormik: any = useFormik({
    initialValues: passengerInitialValues,
    validationSchema: updatePassengerSchema,

    onSubmit: (values, {resetForm}) => {
      UpdatePassengerDetails(values);
    },
  });

  //Empty flatlist text is defined
  const EmtpyFlatListText = () => {
    return (
      <View>
        <Text>You currently have no trips.</Text>
      </View>
    );
  };

  //Empty flatlist text is defined
  const EmtpyPassengerFlatListText = () => {
    return (
      <View>
        <Text>You currently have no trips.</Text>
      </View>
    );
  };

  const ShowDeleteToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>
                Passsenger was deleted successfuly.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  //This is where the Toast is defined
  const ShowToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Something went wrong, please try again</ToastTitle>
              <ToastDescription>
                Please check your internet connection and try again.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const showDeletePendingToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Delete Request Pending</ToastTitle>
              <ToastDescription>
                Your deletion request has been sent. Please wait for your
                transporter approve it.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const ShowSuccessToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <VStack space="xs">
            <Toast nativeID={toastId} action="success" variant="solid">
              <ToastTitle>Delete request sent successfully</ToastTitle>
            </Toast>
          </VStack>
        );
      },
    });
  };

  //Handles FAB onPress
  const HandleBackFabPress = () => {
    navigation.goBack();
  };

  //Defines the FAB
  const GoBackFab = () => {
    return (
      <Fab
        onPress={HandleBackFabPress}
        size="sm"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}>
        <FabIcon as={ArrowLeftIcon} mr="$1" />
        <FabLabel>Back</FabLabel>
      </Fab>
    );
  };

  //Contains Upcoming Flatlist for all roles
  function FirstRoute() {
    return (
      <View style={{flex: 1}}>
        <View style={FlatlistStyles.container}>
          <View>{showPassengerSummaryModal()}</View>
          {noPassenger ? EmtpyFlatListText() : null}
          <FlatList
            data={allPassengers}
            extraData={statusCode}
            renderItem={({item}) => renderItemComponentAllPassengers(item)}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
    );
  }

  //Contains Past Flatlist for all roles
  function SecondRoute() {
    return (
      <View style={{flex: 1}}>
        <View style={FlatlistStyles.container}>
          <View>{showPassengerSummaryModal()}</View>
          {noPendingPassenger ? EmtpyPassengerFlatListText() : null}
          <FlatList
            data={allPendingPassengers}
            extraData={statusCode}
            renderItem={({item}) => renderItemComponentPendingPassengers(item)}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      {GoBackFab()}
      {role == 1 ? (
        <Tab.Navigator>
          <Tab.Screen name="All Passengers" component={FirstRoute} />
          <Tab.Screen name="Pending Removals" component={SecondRoute} />
        </Tab.Navigator>
      ) : (
        <View style={{flex: 1}}>
          <View>
            <Text style={ManagePassengerScreenStyles.headingText}>
              Add and view your passengers below.
            </Text>
            {showPassengerCardModal()}
          </View>
          <View>
            <Button
              size="md"
              variant="solid"
              action="secondary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={() => {
                setShowPModal(true);
              }}>
              <ButtonIcon as={AddIcon} />
              <ButtonText>Create Passenger</ButtonText>
            </Button>
          </View>
          <View>{showPopUpModal()}</View>
          <View>{showReasonModal()}</View>
          <View>{showUpdatePopUpModal()}</View>
          <View style={{marginTop: 5, padding: 1}}>
            {noPassenger ? EmtpyPassengerFlatListText() : null}
            <FlatList
              data={passengerList}
              extraData={statusCode}
              renderItem={({item}) => renderItemComponentPassengers(item)}
            />
          </View>
        </View>
      )}
    </NavigationContainer>
  );
};

export default ManagePassengerScreen;
