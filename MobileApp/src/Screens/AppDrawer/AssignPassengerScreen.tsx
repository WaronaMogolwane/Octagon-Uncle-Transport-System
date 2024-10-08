import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  AssignPassengerScreenStyles,
  ThemeStyles,
} from '../../Stylesheets/GlobalStyles';
import {
  GetAllActivePassengerForBusiness,
  UpdateIsAssigned,
} from '../../Controllers/PassengerController';
import {
  AddPassengerDriverVehicleLinking,
  GetPassengerDriverVehicleLinking,
  RemovePassengerDriverLinking,
} from '../../Controllers/PassengerDriverVehicleLinkingController';
import {PassengerDriverVehicleLinking} from '../../Models/PassengerDriverVehicleLinkingModel';
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
} from '@gluestack-ui/themed';
import {
  AddPassengerSchedule,
  AddTempPassengerSchedule,
  GetPassengerSchedule,
  UpdatePassengerSchedule,
} from '../../Controllers/PassengerScheduleController';
import {PassengerSchedule} from '../../Models/PassengerSchedule';
import {AuthContext} from '../../Services/AuthenticationService';
import {PassengerCard} from '../../Components/Cards/PassengerListCard';
import {AddTrip} from '../../Controllers/TripController';
import {Auth} from '../../Classes/Auth';
import {AlarmClock, Car} from 'lucide-react-native';
import {Trip} from '../../Models/Trip';

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

  const ref = React.useRef(null);
  const toast = useToast();

  const vehicleId = route.params.vehicleId;
  const businessId = auth.GetBusinessId();

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
      }
    });
    GetPassengerDriverVehicleLinking(businessId).then(passengers => {
      setpassengerList(passengers);
      setStatusCode(!statusCode);
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
      pickUpLocation={itemData.suburb}
      dropOffLocation={itemData.dropOffLocation}
      onPress={() => {
        // GetPassengerSchedule(itemData.passengerId).then((result: any) => {
        //   result.monday == 1 ? setMonday(true) : setMonday(true);
        //   result.tuesday == 1 ? setTuesday(true) : setTuesday(false);
        //   result.wednesday == 1 ? setWednesday(true) : setWednesday(false);
        //   result.thursday == 1 ? setThursday(true) : setThursday(false);
        //   result.friday == 1 ? setFriday(true) : setFriday(false);
        //   result.saturday == 1 ? setSaturday(true) : setSaturday(false);
        //   result.sunday == 1 ? setSunday(true) : setSunday(false);

        //   setShowModal(true);
        //   setPassngerId(itemData.passengerId);
        //   setPDVLId(itemData.pDVLId);
        //   sethomeAddress(itemData.pickUpLocation);
        //   setpassengerName(itemData.fullName);
        //   setdestinationAdress(itemData.dropOffLocation);
        //   setAge(itemData.age);
        // });

        setShowModal(true);
        setPassngerId(itemData.passengerId);
        setPDVLId(itemData.pDVLId);
        sethomeAddress(itemData.pickUpLocation);
        setpassengerName(itemData.fullName);
        setdestinationAdress(itemData.dropOffLocation);
        setAge(itemData.age);
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

  return (
    <View style={{flex: 1}}>
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
      <View>
        <View style={AssignPassengerScreenStyles.container}>
          {renderLabel()}
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
        </View>
      </View>
      <View>{CalenderModal()}</View>
      <View>
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
                <ButtonText>Add Trip</ButtonText>
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
                <ButtonText>Schedule Trip</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </View>
      <View>{showPopUp()}</View>
      <View>
        <FlatList
          data={passengerList}
          extraData={statusCode}
          renderItem={({item}) => renderItemComponentPassengers(item)}
        />
      </View>
      {GoBackFab()}
    </View>
  );
};

export default AssignPassengerScreen;
