import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import * as yup from 'yup';
import React, {useContext, useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  AssignPassengerScreenStyles,
  ThemeStyles,
} from '../../../Stylesheets/GlobalStyles';
import {
  GetAllActivePassengerForBusiness,
  UpdateIsAssigned,
} from '../../../Controllers/PassengerController';
import {
  AddPassengerDriverVehicleLinking,
  GetPassengerDriverVehicleLinking,
  RemovePassengerDriverLinking,
} from '../../../Controllers/PassengerDriverVehicleLinkingController';
import {PassengerDriverVehicleLinking} from '../../../Models/PassengerDriverVehicleLinkingModel';
import {
  Modal,
  Button,
  ButtonText,
  ModalBackdrop,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Heading,
  Icon,
  CloseIcon,
  ModalBody,
  Checkbox,
  CheckboxGroup,
  VStack,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  CheckIcon,
  Toast,
  ToastTitle,
  useToast,
  ToastDescription,
  ScrollView,
  FabIcon,
  ArrowLeftIcon,
  FabLabel,
  Fab,
  Card,
  AddIcon,
  ButtonIcon,
} from '@gluestack-ui/themed';
import {
  AddPassengerSchedule,
  AddTempPassengerSchedule,
  GetPassengerSchedule,
  UpdatePassengerSchedule,
} from '../../../Controllers/PassengerScheduleController';
import {PassengerSchedule} from '../../../Models/PassengerSchedule';
import {AuthContext} from '../../../Services/AuthenticationService';
import {PassengerCard} from '../../../Components/Cards/PassengerListCard';
import {AddTrip} from '../../../Controllers/TripController';
import {Auth} from '../../../Classes/Auth';
import {AlarmClock, Car} from 'lucide-react-native';
import {Trip} from '../../../Models/Trip';
import {useFormik} from 'formik';

const AssignPassengerScreen = ({route, navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const initialState = [''];

  const [newPassengerId, setNewPassengerId] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [passengers, setPassengers] = useState([]);
  const [passengerList, setpassengerList] = useState([]);
  const [statusCode, setStatusCode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [calender, setCalender] = useState(false);
  const [modifyCalender, setModifyCalender] = useState(false);
  const [values, setValues] = useState(initialState);

  const [isDisabled, setIsDisabled] = useState(true);

  const [passengerName, setpassengerName] = useState('');
  const [age, setAge] = useState('');
  const [homeAddress, sethomeAddress] = useState('');
  const [destinationAdress, setdestinationAdress] = useState('');
  const [passengerId, setPassngerId] = useState('');
  const [pDVLId, setPDVLId] = useState('');

  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const [weekDays, setWeekDays] = useState<PassengerSchedule>();

  const [refreshing, setRefreshing] = React.useState(false);

  const ref = React.useRef(null);
  const toast = useToast();

  const vehicleId = route.params.vehicleId;
  const make = route.params.curentVehicle.make;
  const model = route.params.curentVehicle.model;
  const license = route.params.curentVehicle.license;

  const businessId = auth.GetBusinessId();
  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    GetPassengers();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    GetPassengers();
  }, []);

  const defaultData: never[] = [];

  const GetPassengers = async () => {
    GetAllActivePassengerForBusiness(businessId).then((response: any) => {
      if (response.code != 'ERR_BAD_REQUEST') {
        setIsDisabled(false);
        setPassengers(response);
        setIsLoading(false);
      } else {
        setPassengers(defaultData);
        setIsDisabled(true);
        setIsLoading(false);

        //Toast Notifiaction
        NoPassengerToast();
      }
    });
    GetPassengerDriverVehicleLinking(businessId).then(passengers => {
      setpassengerList(passengers);
      setStatusCode(!statusCode);
    });
  };

  const NoPassengerToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="attention" variant="solid">
            <VStack space="xs">
              <ToastTitle>Notice</ToastTitle>
              <ToastDescription>
                There are currently no unassigned passengers
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const renderLabel = () => {
    if (newPassengerId || isFocus) {
      return (
        <Text
          style={[
            AssignPassengerScreenStyles.label,
            isFocus && {color: 'blue'},
          ]}>
          Please select passenger
        </Text>
      );
    }
    return null;
  };

  const ClearModalUseState = () => {
    setPDVLId('');
    sethomeAddress('');
    setpassengerName('');
    setdestinationAdress('');
    setAge('');
    setPassngerId('');
  };

  const ClearCalender = () => {
    setMonday(false);
    setTuesday(false);
    setWednesday(false);
    setThursday(false);
    setFriday(false);
    setSaturday(false);
    setSunday(false);
    setNewPassengerId('');
  };

  const GoBackFab = () => {
    return (
      <Fab
        onPress={() => {
          navigation.navigate('Manage Trip');
        }}
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

  const renderItemComponentPassengers = (itemData: any) => (
    <PassengerCard
      passengerName={itemData.fullName}
      age={itemData.age}
      pickUpLocation={itemData.pickUpLocation}
      dropOffLocation={itemData.dropOffLocation}
      onPress={() => {
        setShowModal(true);
        setPassngerId(itemData.passengerId);
        setPDVLId(itemData.pDVLId);
        sethomeAddress(itemData.pickUpLocation);
        setpassengerName(itemData.fullName);
        setdestinationAdress(itemData.dropOffLocation);
        setAge(itemData.age);

        GetScheduleForPassengers(passengerId);
      }}
    />
  );

  const PrepareSchedule = async () => {
    let newPVL = new PassengerDriverVehicleLinking(
      vehicleId,
      businessId,
      newPassengerId,
    );

    let newSchedule = new PassengerSchedule(
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      newPassengerId,
      vehicleId,
    );

    await AddPassengerDriverVehicleLinking(newPVL).then((result: any) => {
      if (result == 200) {
        UpdateIsAssigned(newPassengerId).then((result1: any) => {
          if (result1[1] == 200) {
            AddPassengerSchedule(newSchedule).then((result2: any) => {
              if (result2 == 200) {
                setNewPassengerId('');
                GetPassengers();
              }
            });
          }
        });
      }
    });
  };

  const PrepareTrip = async () => {
    let newPVL = new PassengerDriverVehicleLinking(
      vehicleId,
      businessId,
      newPassengerId,
    );

    let newTrip = new Trip('', newPassengerId, vehicleId);

    await AddPassengerDriverVehicleLinking(newPVL).then((result: any) => {
      UpdateIsAssigned(newPassengerId).then((result1: any) => {
        if (result1[1] == 200) {
          AddTempPassengerSchedule(newPassengerId).then((result2: any) => {
            if (result2 == 200) {
              AddTrip(newTrip).then((response: any) => {
                if (response[1] == 200) {
                  GetPassengers();
                  setNewPassengerId('');
                  ShowSuccessToast();
                  setIsLoading(false);
                } else {
                  setIsLoading(false);
                }
              });
            } else {
              setIsLoading(false);
            }
          });
        } else {
          setIsLoading(false);
        }
      });
    });
  };

  const ModifyCalender = async () => {
    let newSchedule = new PassengerSchedule(
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      passengerId,
      vehicleId,
    );

    UpdatePassengerSchedule(newSchedule).then((result: any) => {
      if (result == 200) {
        ClearCalender();
        setModifyCalender(false);
        setIsLoading(false);

        //Toast of Success
        toast.show({
          placement: 'top',
          render: ({id}) => {
            const toastId = 'toast-' + id;
            return (
              <Toast nativeID={toastId} action="success" variant="solid">
                <VStack space="xs">
                  <ToastTitle>Update Success</ToastTitle>
                  <ToastDescription>
                    The schecdule for {passengerName} has been successfully
                    updated.
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      } else {
        setIsLoading(false);
      }
    });
  };

  const showPopUp = () => {
    return (
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          ClearModalUseState();
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">{passengerName}</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Age: {age}</Text>
            <Text>Homeaddress: {homeAddress}</Text>
            <Text>Destination Address: {destinationAdress}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
                ClearCalender();
                setModifyCalender(true);
                setCalender(true);
              }}>
              <ButtonText>Edit Schedule</ButtonText>
            </Button>
            <Button
              size="sm"
              action="negative"
              borderWidth="$0"
              onPress={() => {
                RemovePassengerDriverLinking(pDVLId).then(response => {
                  if (response == 200) {
                    GetPassengers();
                    ClearModalUseState();
                    ClearCalender;
                    setShowModal(false);
                  }
                });
              }}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const GetScheduleForPassengers = (passengerId: string) => {
    GetPassengerSchedule(passengerId).then((result: any) => {
      console.log(result);

      if (result.monday == 1) {
        setMonday(true);
      } else if (result.tuesday == 1) {
        setTuesday(true);
      } else if (result.wednesday == 1) {
        setWednesday(true);
      } else if (result.thursday == 1) {
        setThursday(true);
      } else if (result.friday == 1) {
        setFriday(true);
      } else if (result.saturday == 1) {
        setSaturday(true);
      } else if (result.sunday == 1) {
        setSaturday(true);
      }
      // setMonday(result.monday == 1 ? true : false);
      // setTuesday(result.tuesday == 1 ? true : false);
      // setWednesday(result.wednesday == 1 ? true : false);
      // setThursday(result.thursday == 1 ? true : false);
      // setFriday(result.friday == 1 ? true : false);
      // setSaturday(result.saturday == 1 ? true : false);
      // setSunday(result.sunday == 1 ? true : false);

      console.log(
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      );
    });
  };

  const CalenderModal = () => {
    return (
      <Modal
        isOpen={calender}
        onClose={() => {
          setValues(initialState);
          ClearModalUseState();
          ClearCalender();
          setCalender(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="sm">{passengerName}'s trip schedule</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View style={{paddingBottom: 20}}>
              <Text>Please schedule the days for {passengerName} below.</Text>
            </View>
            <View>
              <CheckboxGroup
                value={values}
                onChange={(keys: any) => {
                  setValues(keys);
                }}>
                <VStack space="xl">
                  <Checkbox
                    isChecked={monday}
                    aria-label="Monday"
                    value="monday"
                    onPress={() => {
                      setMonday(!monday);
                    }}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Monday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={tuesday}
                    aria-label="Tuesday"
                    value="tuesday"
                    onPress={() => {
                      setTuesday(!tuesday);
                    }}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Tuesday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={wednesday}
                    aria-label="Wednesday"
                    value="wednesday"
                    onPress={() => {
                      setWednesday(!wednesday);
                    }}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Wednseday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={thursday}
                    aria-label="Thursday"
                    value="thursday"
                    onPress={() => {
                      setThursday(!thursday);
                    }}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Thursday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={friday}
                    aria-label="Friday"
                    value="friday"
                    onPress={() => {
                      setFriday(!friday);
                    }}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Friday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={saturday}
                    aria-label="Saturday"
                    value="saturday"
                    onPress={() => {
                      setSaturday(!saturday);
                    }}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Saturday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={sunday}
                    aria-label="Sunday"
                    value="sunday"
                    onPress={() => {
                      setSunday(!sunday);
                    }}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Sunday</CheckboxLabel>
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </View>
          </ModalBody>
          <ModalFooter>
            <ScrollView>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  <View style={{padding: 5}}>
                    <Button
                      variant="outline"
                      size="sm"
                      action="secondary"
                      mr="$3"
                      onPress={() => {
                        setCalender(false);
                      }}>
                      <ButtonText>Back</ButtonText>
                    </Button>
                  </View>
                  <View style={{padding: 5}}>
                    <Button
                      size="sm"
                      action="positive"
                      borderWidth="$0"
                      onPress={() => {
                        if (modifyCalender == true) {
                          setIsLoading(true);
                          ModifyCalender();
                        } else {
                          setIsLoading(true);
                          PrepareSchedule();
                        }
                        setValues(initialState);
                        setCalender(false);
                      }}>
                      <ButtonText>Comfirm</ButtonText>
                    </Button>
                  </View>
                </View>
              </View>
            </ScrollView>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const ShowSuccessToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>Trip added successfully.</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const ShowPickPassengerToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="attention" variant="solid">
            <VStack space="xs">
              <ToastTitle>Please pick a passenger</ToastTitle>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const passengerScheduleInitialValues = {
    monday: weekDays?.monday,
    tuesday: weekDays?.tuesday,
    wednesday: weekDays?.wednesday,
    thursday: weekDays?.thursday,
    friday: weekDays?.friday,
    saturday: weekDays?.saturday,
    sunday: weekDays?.sunday,
  };

  const passengerScheduleSchema = yup.object().shape({
    businessName: yup
      .string()
      .min(2, 'Business name too Short!')
      .max(50, 'Business name too Long!'),
    businessPhoneNumber: yup
      .string()
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        'not valid',
      )
      .min(10, 'Business phone number should be 10 digits')
      .max(10, 'Business phone number should be 10 digits'),
    addressline1: yup
      .string()
      .min(2, 'Address too Short!')
      .max(100, 'Address too Long!'),
    addressline2: yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
    suburb: yup
      .string()
      .min(2, 'Suburb too Short!')
      .max(50, 'Suburb too  Long!'),
    city: yup.string().min(2, 'City too Short!').max(50, 'City too Long!'),
    province: yup
      .string()
      .min(2, 'Province too Short!')
      .max(50, 'Province too Long!'),
    postalCode: yup
      .string()
      .min(4, 'Postal code too Short!')
      .max(4, 'Postal code too Long!'),
  });
  const formik = useFormik({
    initialValues: passengerScheduleInitialValues,
    validationSchema: passengerScheduleSchema,
    enableReinitialize: true,

    onSubmit: async (values, {resetForm}) => {
      // await businessDetailHelper(values);
    },
  });

  return (
    <View style={{flex: 1, backgroundColor: '#e8f0f3'}}>
      {IsLoading ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff75',
            zIndex: 100,
          }}>
          <ActivityIndicator size="large" />
          <Text>Working</Text>
        </View>
      ) : null}
      <Card
        size="sm"
        variant="outline"
        style={{
          marginBottom: 10,
          paddingTop: 0,
          height: '35%',
          marginHorizontal: 12,
          backgroundColor: '#ffffff',
          borderRadius: 5,
          elevation: 10,
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: '#e89d0e',
                marginBottom: 20,
              }}>
              Assign Passengers
            </Text>
          </View>

          <View style={{width: '50%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                // color: '#e89d0e',
                textAlign: 'right',
              }}>
              {make + ' ' + model}
            </Text>

            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                // color: '#e89d0e',
                marginBottom: 20,
                textAlign: 'right',
              }}>
              ({license})
            </Text>
          </View>
        </View>
        <Dropdown
          style={[
            AssignPassengerScreenStyles.dropdown,
            isFocus && {borderColor: 'blue'},
          ]}
          placeholderStyle={AssignPassengerScreenStyles.placeholderStyle}
          selectedTextStyle={AssignPassengerScreenStyles.selectedTextStyle}
          inputSearchStyle={AssignPassengerScreenStyles.inputSearchStyle}
          iconStyle={AssignPassengerScreenStyles.iconStyle}
          data={passengers}
          search={true}
          disable={isDisabled}
          maxHeight={300}
          labelField="passengerName"
          valueField="passengerId"
          placeholder={!isFocus ? 'Select passenger' : '...'}
          searchPlaceholder="Search..."
          value={newPassengerId}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: any) => {
            setNewPassengerId(item.passengerId);
            setpassengerName(item.editedName);
            setIsFocus(false);
          }}
        />
        <View
          style={{
            marginTop: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 25,
          }}>
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
                  if (newPassengerId != '') {
                    setIsLoading(true);
                    PrepareTrip();
                  } else {
                    ShowPickPassengerToast();
                  }
                }}>
                <Car size={20} strokeWidth={1} color={'#FFFFFF'} />
                <ButtonText> Add Trip</ButtonText>
              </Button>
            </View>
            <View style={{padding: 5}}>
              <Button
                size="md"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => {
                  if (newPassengerId != '') {
                    setCalender(true);
                  } else {
                    ShowPickPassengerToast();
                  }
                }}>
                <AlarmClock size={20} strokeWidth={1} color={'#FFFFFF'} />
                <ButtonText> Schedule Trip</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </Card>
      <FlatList
        style={{backgroundColor: '#e8f0f3'}}
        data={passengerList}
        extraData={statusCode}
        renderItem={({item}) => renderItemComponentPassengers(item)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <View>{CalenderModal()}</View>
      <View>{showPopUp()}</View>

      {GoBackFab()}
    </View>
  );
};

export default AssignPassengerScreen;
