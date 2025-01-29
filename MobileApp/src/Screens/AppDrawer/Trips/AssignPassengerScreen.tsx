import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  AssignPassengerScreenStyles,
  ThemeStyles,
} from '../../../Stylesheets/GlobalStyles';
import {
  GetActivePassengerForBusiness,
  GetUnassignedActivePassengerForBusiness,
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
import {Trip} from '../../../Models/Trip';
import {CustomButton1} from '../../../Components/Buttons';

const AssignPassengerScreen = ({route, navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const [newPassengerId, setNewPassengerId] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [passengers, setPassengers] = useState([]);
  const [passengerList, setpassengerList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [calender, setCalender] = useState(false);
  const [modifyCalender, setModifyCalender] = useState(false);
  const [values, setValues] = useState(['']);

  const [isDisabled, setIsDisabled] = useState(true);

  const [passengerName, setpassengerName] = useState('');
  const [age, setAge] = useState('');
  const [homeAddress, sethomeAddress] = useState('');
  const [destinationAdress, setdestinationAdress] = useState('');
  const [passengerId, setPassngerId] = useState('');
  const [pDVLId, setPDVLId] = useState('');

  const [IsLoading, setIsLoading] = useState(false);
  const [isLoadingSmall, setIsLoadingSmall] = useState(false);

  const [isEmptyFlatList, setIsEmptyFlatList] = useState(true);

  const ref = React.useRef(null);
  const toast = useToast();

  const vehicleId = route.params.curentVehicle.vehicleId;
  const make = route.params.curentVehicle.make;
  const model = route.params.curentVehicle.model;
  const license = route.params.curentVehicle.license;
  const dvlId = route.params.curentVehicle.dVLId;

  const businessId = auth.GetBusinessId();

  useEffect(() => {
    setIsLoading(true);
    GetPassengers();
  }, [dvlId]);

  const defaultData: never[] = [];

  const GetPassengers = async () => {
    GetUnassignedActivePassengerForBusiness(businessId).then(
      (response: any) => {
        if (response[0] != '' && response[1] == 200) {
          setIsDisabled(false);
          setPassengers(response[0]);
          setIsLoading(false);
        } else {
          setPassengers(defaultData);
          setIsDisabled(true);
          setIsLoading(false);
          //Toast Notifiaction
          NoPassengerToast();
        }
      },
    );
    GetPassengerDriverVehicleLinking(businessId, dvlId)
      .then(passengers => {
        if (passengers[0] != '') {
          setpassengerList(passengers[0]);
          setIsEmptyFlatList(false);
        } else {
          setIsEmptyFlatList(true);
          setpassengerList([]);
        }
      })
      .catch(error => {
        console.error(
          'Error fetching passenger driver vehicle linking:',
          error,
        );
        setIsLoading(false);
        setIsEmptyFlatList(true);
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

  const ClearModalUseState = () => {
    setPDVLId('');
    sethomeAddress('');
    setpassengerName('');
    setdestinationAdress('');
    setAge('');
    setPassngerId('');
  };

  const ClearCalender = () => {
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
      passengerId={itemData.passengerId}
    />
  );

  const PrepareSchedule = async () => {
    let newPVL = new PassengerDriverVehicleLinking(
      vehicleId,
      businessId,
      newPassengerId,
    );

    let newSchedule = new PassengerSchedule(
      values.includes('monday') ? true : false,
      values.includes('tuesday') ? true : false,
      values.includes('wedndeday') ? true : false,
      values.includes('thursday') ? true : false,
      values.includes('friday') ? true : false,
      values.includes('saturday') ? true : false,
      values.includes('sunday') ? true : false,
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
                setIsLoading(false);
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

    let newTrip = new Trip('', newPassengerId, vehicleId, businessId);

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
      values.includes('monday') ? true : false,
      values.includes('tuesday') ? true : false,
      values.includes('wedndeday') ? true : false,
      values.includes('thursday') ? true : false,
      values.includes('friday') ? true : false,
      values.includes('saturday') ? true : false,
      values.includes('sunday') ? true : false,
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

  const showPopUpModal = () => {
    return (
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          // ClearModalUseState();
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
            {isLoadingSmall ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 100,
                }}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <>
                <Text>Age: {age}</Text>
                <Text>Homeaddress: {homeAddress}</Text>
                <Text>Destination Address: {destinationAdress}</Text>
              </>
            )}
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
                GetScheduleForPassengers(passengerId);
                setModifyCalender(true);
              }}>
              <ButtonText>Edit Schedule</ButtonText>
            </Button>
            <Button
              size="sm"
              action="negative"
              borderWidth="$0"
              onPress={() => {
                setIsLoadingSmall(true);
                RemovePassengerDriverLinking(pDVLId).then(response => {
                  if (response == 200) {
                    GetPassengers();
                    setShowModal(false);
                    ClearModalUseState();
                    ClearCalender();
                  }
                  setIsLoadingSmall(false);
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
      const newValues = [];

      if (result.monday === 1) {
        newValues.push('monday');
      }

      if (result.tuesday === 1) {
        newValues.push('tuesday');
      }

      if (result.wednesday === 1) {
        newValues.push('wednesday');
      }

      if (result.thursday === 1) {
        newValues.push('thursday');
      }

      if (result.friday === 1) {
        newValues.push('friday');
      }

      if (result.saturday === 1) {
        newValues.push('saturday');
      }

      if (result.sunday === 1) {
        newValues.push('sunday');
      }

      setValues(newValues); // Use the state update function to set the new values
    });

    setCalender(true);
  };

  const CalenderModal = () => {
    return (
      <Modal
        isOpen={calender}
        onClose={() => {
          setValues([]);
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
                    isChecked={values.includes('monday') ? true : false}
                    aria-label="Monday"
                    value={'monday'}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Monday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={values.includes('tuesday') ? true : false}
                    aria-label="Tuesday"
                    value="tuesday">
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Tuesday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={values.includes('wednesday') ? true : false}
                    aria-label="Wednesday"
                    value="wednesday">
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Wednseday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={values.includes('thursday') ? true : false}
                    aria-label="Thursday"
                    value="thursday">
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Thursday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={values.includes('friday') ? true : false}
                    aria-label="Friday"
                    value="friday">
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Friday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={values.includes('saturday') ? true : false}
                    aria-label="Saturday"
                    value="saturday">
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Saturday</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    isChecked={values.includes('sunday') ? true : false}
                    aria-label="Sunday"
                    value="sunday">
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
            <View style={{flex: 1}}>
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
                  setValues([]);
                  setCalender(false);
                }}>
                <ButtonText>Comfirm</ButtonText>
              </Button>
            </View>
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

  const EmtpyFlatListText = () => {
    return (
      <View>
        <Text style={AssignPassengerScreenStyles.flatListText}>
          There are no passengers assigned to this vehicle.
        </Text>
      </View>
    );
  };

  return (
    <View style={ThemeStyles.container}>
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
        </View>
      ) : null}
      {CalenderModal()}
      {showPopUpModal()}
      <Text style={AssignPassengerScreenStyles.titleText}>Vehicle</Text>
      <Text style={AssignPassengerScreenStyles.secondTitleText}>
        {make} {model}
      </Text>
      <Text style={AssignPassengerScreenStyles.thirdTitleText}>
        License plate: {license}
      </Text>

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

      <View style={AssignPassengerScreenStyles.buttonContainer}>
        <CustomButton1
          styles={AssignPassengerScreenStyles.button}
          title="Add trip"
          size="md"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => {
            if (newPassengerId != '') {
              setIsLoading(true);
              PrepareTrip();
            } else {
              ShowPickPassengerToast();
            }
          }}
        />

        <CustomButton1
          styles={AssignPassengerScreenStyles.button}
          title="Schedule trip"
          size="md"
          action="positive"
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => {
            if (newPassengerId != '') {
              setCalender(true);
            } else {
              ShowPickPassengerToast();
            }
          }}
        />
      </View>

      <Text style={[AssignPassengerScreenStyles.titleText, {marginBottom: 20}]}>
        Assigned passengers
      </Text>
      {isEmptyFlatList ? EmtpyFlatListText() : null}
      <FlatList
        data={passengerList}
        extraData
        renderItem={({item}) => renderItemComponentPassengers(item)}
      />
    </View>
  );
};

export default AssignPassengerScreen;
