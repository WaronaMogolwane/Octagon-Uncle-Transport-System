import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  AssignPassengerScreenStyles,
  ThemeStyles,
} from '../../Stylesheets/GlobalStyles';
import {
  GetAllPassengerForBusiness,
  UpdateIsAssigned,
} from '../../Controllers/PassengerController';
import {PassengerCard} from '../../Components/PassengerCard';
import {CustomButton1} from '../../Components/Buttons';
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
} from '@gluestack-ui/themed';
import {
  AddPassengerSchedule,
  UpdatePassengerSchedule,
} from '../../Controllers/PassengerScheduleController';
import {PassengerSchedule} from '../../Models/PassengerSchedule';
import {Auth} from '../../Classes/Auth';
import {AuthContext} from '../../Services/AuthenticationService';
import {useStorageState} from '../../Services/StorageStateService';
import {useGlobalState} from '../../State';

const AssignPassengerScreen = ({route, navigation}: any) => {
  const initialState = [''];

  const [[tokenIsLoading, authToken], setAuthToken] =
    useStorageState('authToken');
  const [auth, setAuth] = useState<Auth>();

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

  const ref = React.useRef(null);
  const toast = useToast();

  const vehicleId = route.params.vehicleId;
  //const vehicleId = '281';
  //const businessId = '018f2940-e67c-78f3-8f22-400d7f0672b2';
  const [businessId, x] = useGlobalState('businessId');
  //const parentId = 'c7728615-394f-466b-833e-ea9dd60ba836';

  useEffect(() => {
    GetPassengers();
  }, []);

  const defaultData: never[] = [];

  const GetPassengers = async () => {
    GetAllPassengerForBusiness(businessId).then((response: any) => {
      if (response.code != 'ERR_BAD_REQUEST') {
        setIsDisabled(false);
        setPassengers(response);
      } else {
        setPassengers(defaultData);
        setIsDisabled(true);
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
      }}
    />
  );

  const PrepareTrip = async () => {
    if (newPassengerId != '') {
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
                if (result == 200) {
                  GetPassengers();
                }
              });
            }
          });
        }
      });
    }
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

  const showCalender = () => {
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
          </ModalBody>
          <ModalFooter>
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
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                if (modifyCalender == true) {
                  ModifyCalender();
                } else {
                  PrepareTrip();
                }
                setValues(initialState);
                setCalender(false);
              }}>
              <ButtonText>Comfirm</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1}}>
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
            search
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
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={AssignPassengerScreenStyles.icon}
            //     color={isFocus ? 'blue' : 'black'}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />
        </View>
      </View>
      <View>{showCalender()}</View>
      <View>
        <CustomButton1
          onPress={() => {
            // PrepareTrip();
            // setValue('');
            if (newPassengerId != '') {
              setCalender(true);
            }
          }}
          title="Add Passenger"
        />
      </View>
      <View>{showPopUp()}</View>
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

export default AssignPassengerScreen;
