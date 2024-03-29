import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
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
  ButtonIcon,
  ButtonSpinner,
  ButtonGroup,
  ModalBackdrop,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Heading,
  Icon,
  CloseIcon,
  ModalBody,
} from '@gluestack-ui/themed';

const AssignPassengerScreen = ({route, navigation}: any) => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [passengers, setPassengers] = useState([]);
  const [passengerList, setpassengerList] = useState([]);
  const [statusCode, setStatusCode] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [passengerName, setpassengerName] = useState('');
  const [age, setAge] = useState('');
  const [homeAddress, sethomeAddress] = useState('');
  const [destinationAdress, setdestinationAdress] = useState('');
  const [pDVLId, setPDVLId] = useState('');

  const ref = React.useRef(null);

  // const vehicleId = route.params.vehicleId;
  const vehicleId = '281';
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';
  const parentId = 'c7728615-394f-466b-833e-ea9dd60ba836';

  useEffect(() => {
    GetPassengers();
  }, []);

  const GetPassengers = async () => {
    GetAllPassengerForBusiness(businessId).then((response: any) => {
      setPassengers(response);
    });
    GetPassengerDriverVehicleLinking(businessId).then(passengers => {
      setpassengerList(passengers);
      setStatusCode(!statusCode);
    });
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
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
  };

  const renderItemComponentPassengers = (itemData: any) => (
    <PassengerCard
      passengerName={itemData.fullName}
      age={itemData.age}
      pickUpLocation={itemData.pickUpLocation}
      dropOffLocation={itemData.dropOffLocation}
      onPress={() => {
        setShowModal(true);
        setPDVLId(itemData.pDVLId);
        sethomeAddress(itemData.pickUpLocation);
        setpassengerName(itemData.fullName);
        setdestinationAdress(itemData.dropOffLocation);
        setAge(itemData.age);
      }}
    />
  );

  const PrepareTrip = async () => {
    if (value != '') {
      let newPVL = new PassengerDriverVehicleLinking(
        vehicleId,
        businessId,
        value,
      );

      await AddPassengerDriverVehicleLinking(newPVL).then((result: any) => {
        if (result == 200) {
          UpdateIsAssigned(value).then((result1: any) => {
            if (result1[1] == 200) {
              GetPassengers();
            }
          });
        }
      });
    }
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
              }}>
              <ButtonText>View Parent</ButtonText>
            </Button>
            <Button
              size="sm"
              action="negative"
              borderWidth="$0"
              onPress={() => {
                RemovePassengerDriverLinking(pDVLId).then(response => {
                  if (response == 200) {
                    GetPassengers();
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

  return (
    <View style={{flex: 1}}>
      <View>
        <View style={styles.container}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={passengers}
            search
            maxHeight={300}
            labelField="passengerName"
            valueField="passengerId"
            placeholder={!isFocus ? 'Select passenger' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item: any) => {
              setValue(item.passengerId);
              setIsFocus(false);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? 'blue' : 'black'}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />
        </View>
      </View>
      <View>
        <CustomButton1
          onPress={() => {
            PrepareTrip();
            setValue('');
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
