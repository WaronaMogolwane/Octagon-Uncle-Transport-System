import {
  FlatList,
  GestureResponderEvent,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useGlobalState} from '../../State';
import {
  AddPassenger,
  DeletePassenger,
  GetAllPassengerForBusiness,
  GetAllPendingPassengerForBusiness,
  GetParentPassengers,
  UpdatePassenger,
} from '../../Controllers/PassengerController';
import {CustomButton1} from '../../Components/Buttons';
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
import {GetUserId, GetUserRole} from '../../Classes/Auth';
import {AuthContext} from '../../Services/AuthenticationService';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PassengerListAllCard from '../../Components/Cards/PassngerListForTransporterCard';
import PassengerListPendingCard from '../../Components/Cards/PassengerListPendingCard';

const ManagePassengerScreen = ({navigation}: any) => {
  const {createUserInvitation, session}: any = useContext(AuthContext);

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
  const [homeAddress, setHomeAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [isActive, setIsActive] = useState('');
  const [isActiveText, setIsActiveText] = useState('');

  const ref = React.useRef(null);
  const toast = useToast();
  const [isFocus, setIsFocus] = useState(false);

  const [allPassengers, setAllPassengers] = useState([]);
  const [allPendingPassengers, setPendingPassengers] = useState([]);

  const [statusCode, setStatusCode] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const [noPassenger, setNoPassenger] = useState(false);
  const [noPendingPassenger, setNoPendingPassenger] = useState(false);

  const [showPassengerSummary, setShowPassengerSummary] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showreason, setShowReason] = useState(true);

  // const userId =
  //   GetUserId(session) == null
  //     ? 'c7728615-394f-466b-833e-ea9dd60ba836'
  //     : GetUserId(session);
  // const businessId =
  //   GetUserId(session) == null
  //     ? 'w8728321-394f-466b-833e-ea9dd60ba000'
  //     : GetUserId(session);
  // const role = GetUserRole(session) == null ? 2 : Number(GetUserRole(session));

  const userId = 'c7728615-394f-466b-833e-ea9dd60ba836';
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';
  const role: number = 3;

  const defaultReasons = [
    {
      id: 0,
      reasonString:
        'I made an error and need to re-enter the passenger detals.',
    },
    {id: 1, reasonString: 'I need to update old informaation'},
    {id: 2, reasonString: 'other'},
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
    } else if (role == 3) {
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
        setDestinationAddress(itemData.destinationAddress);
        setParentName(itemData.parentName);
        setIsActiveText(itemData.isActivetext);
        setShowPassengerSummary(true);
      }}
    />
  );

  const renderItemComponentPendingPassengers = (itemData: any) => (
    <PassengerListPendingCard
      passengerName={itemData.passengerName}
      parentName={itemData.parentName}
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
        setShowButton(true);
      }}
    />
  );

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
                Please selct a the most appropriate reason you are requesting to
                be deleted.
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
                search
                maxHeight={300}
                labelField="reasonString"
                valueField="id"
                placeholder={!isFocus ? 'Select reason of deletion' : '...'}
                searchPlaceholder="Select..."
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item: any) => {
                  // setNewPassengerId(item.passengerId);
                  // setpassengerName(item.editedName);
                  console.log(item.reasonString);
                  setIsFocus(false);
                }}
              />
            </View>
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
                  onPress={() => {}}>
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

                {showButton ? (
                  <CustomButton1
                    title={'Comfirm'}
                    onPress={() => {
                      DeletePassenger(passengerId).then((result: any) => {
                        if (result[1] == 200) {
                          GetPassengers();
                          setShowButton(false);
                          setShowPassengerSummary(false);
                        } else {
                          //Something went wrong
                          const ShowToast = () => {
                            toast.show({
                              placement: 'top',
                              render: ({id}) => {
                                const toastId = 'toast-' + id;
                                return (
                                  <Toast
                                    nativeID={toastId}
                                    action="error"
                                    variant="solid">
                                    <VStack space="xs">
                                      <ToastTitle>
                                        Something went wrong
                                      </ToastTitle>
                                      <ToastDescription>
                                        Something went wrong please try again.
                                      </ToastDescription>
                                    </VStack>
                                  </Toast>
                                );
                              },
                            });
                          };
                        }
                      });
                    }}
                  />
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
                  // style={{
                  //   color: isActiveText == 'Active' ? '#008000' : '#FF0000',
                  // }}
                />

                <View style={{padding: 10}}>
                  <CustomButton1
                    title={'Edit Passenger'}
                    onPress={() => {
                      setUpdate(true);
                      setShowCard(false);
                    }}
                  />
                  <CustomButton1
                    title={'Delete Passenger'}
                    onPress={() => {
                      //setUpdate(true);
                      setShowReason(true);
                    }}
                  />
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

  //This is where the Toast is defined
  const ShowToast = () => {
    const toast = useToast();

    toast.show({
      placement: 'top',
      render: ({id}) => {
        return (
          <Toast nativeID={id} variant="accent" action="error">
            <ToastTitle>Something went wrong, please try again</ToastTitle>
          </Toast>
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
            <CustomButton1
              onPress={() => {
                setShowPModal(true);
              }}
              title="Create Passenger"
            />
          </View>
          <View>{showPopUpModal()}</View>
          <View>{showReasonModal()}</View>
          <View>{showUpdatePopUpModal()}</View>
          <View>
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
