import React, {useEffect, useState} from 'react';
import {
  FlatList,
  GestureResponderEvent,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TripCardDriverSwipable} from '../../../Components/TripCardDriverSwipable';
import {
  Button,
  Text,
  Fab,
  FabIcon,
  AddIcon,
  FabLabel,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  ButtonText,
  CheckCircleIcon,
  HStack,
  Heading,
  Icon,
} from '@gluestack-ui/themed';
import InvitationModal from '../../../Components/Modals/InvitationModal';
import * as yup from 'yup';
import {useFormik} from 'formik';

const ManageDriversScreen = ({navigation}: any) => {
  const [DriversList, setDriversList] = useState([]);
  const [PendingDriversList, setPendingDriversList] = useState([]);
  const [refreshingDriverss, setRefreshingDriverss] = React.useState(false);
  const [refreshingPendingDrivers, setRefreshingPendingDrivers] =
    React.useState(false);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);

  const onRefreshPendingDrivers = React.useCallback(() => {
    setRefreshingPendingDrivers(true);

    setTimeout(() => {
      getPendingDrivers();
    }, 2000);
    setRefreshingPendingDrivers(false);
  }, []);

  const onRefreshDrivers = React.useCallback(() => {
    setRefreshingDriverss(true);

    setTimeout(() => {
      getDriverss();
    }, 2000);
    setRefreshingDriverss(false);
  }, []);
  const [showInvitationModal, setShowInvitationModal] = useState(false);

  const payerId = 'c7728615-394f-466b-833e-ea9dd60ba836';
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';
  const southAfricanIdRegex: RegExp =
    /(([0-9]{2})(0|1)([0-9])([0-3])([0-9]))([ ]?)(([0-9]{4})([ ]?)([0-1][8]([ ]?)[0-9]))/;

  useEffect(() => {
    getDriverss();
    getPendingDrivers();
  }, []);

  const getDriverss = async () => {
    // return await GetDriverssForClient(payerId, businessId).then(trip => {
    //   setDriversList(trip);
    // });
  };

  const getPendingDrivers = async () => {
    // return await GetPendingDriversForClient(payerId, businessId).then(trip => {
    //   setPendingDriversList(trip);
    // });
  };

  const addDriverSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, 'First name too Short!')
      .max(50, 'First name too Long!')
      .required('Required'),
    lastName: yup
      .string()
      .min(2, 'Last name too Short!')
      .max(50, 'Last name too Long!')
      .required('Required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    idNumber: yup
      .string()
      .length(13, 'ID number is too short')
      .matches(
        southAfricanIdRegex,
        'Please enter a valid South African ID number.',
      )
      .required('Required'),
  });

  const registerAddDriverValues = {
    firstName: '',
    lastName: '',
    email: '',
    idNumber: '',
  };

  const formik = useFormik({
    initialValues: registerAddDriverValues,
    validationSchema: addDriverSchema,

    onSubmit: values => {
      if (formik.isValid) {
        setShowInvitationModal(false);
        setShowAlertDialog(true);
      }
    },
  });

  const Tab = createMaterialTopTabNavigator();

  function ActiveDriversScreen() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={DriversList}
          renderItem={({item}) => renderItemComponent(item)}
          refreshControl={
            <RefreshControl
              refreshing={refreshingDriverss}
              onRefresh={onRefreshDrivers}
            />
          }
        />
      </View>
    );
  }

  function PendingDriversScreen() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={PendingDriversList}
          renderItem={({item}) => renderItemComponent(item)}
          refreshControl={
            <RefreshControl
              refreshing={refreshingPendingDrivers}
              onRefresh={onRefreshPendingDrivers}
            />
          }
        />
      </View>
    );
  }
  const ShowInvitationModal = () => {
    setShowInvitationModal(true);
  };

  const renderItemComponent = (itemData: any) => (
    <TripCardDriverSwipable
      passengerName={itemData.passengerName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      pickUpLocation={itemData.pickUpLocation}
      tripStatus={itemData.tripStatus}
      handlePickup={() => {
        //changeTripStatus(itemData.tripId, itemData.passengerId, 2);
      }}
      handleDropoff={() => {
        //changeTripStatus(itemData.tripId, itemData.passengerId, 3);
      }}
      handleAbsentPassenger={() => {
        //changeTripStatus(itemData.tripId, itemData.passengerId, 1);
      }}
    />
  );

  const InvitationAlert = () => {
    return (
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false);
        }}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader borderBottomWidth={0}>
            <HStack space="sm" alignItems="center">
              <Icon
                as={CheckCircleIcon}
                color="green"
                //$dark-color="$success300"
              />
              <Heading size="lg">Invitation sent!</Heading>
            </HStack>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              An invite code has been sent to {formik.values.email}. This invite
              will expire after 7 days.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter borderTopWidth={0}>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr={3}
              onPress={() => {
                setShowAlertDialog(false);
              }}>
              <ButtonText>Okay</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  const InviteDriverFab = () => {
    return (
      <Fab
        onPress={ShowInvitationModal}
        size="sm"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}>
        <FabIcon as={AddIcon} mr="$3" />
        <FabLabel>Invite driver</FabLabel>
      </Fab>
    );
  };
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Drivers" component={ActiveDriversScreen} />
        <Tab.Screen name="Pending Drivers" component={PendingDriversScreen} />
      </Tab.Navigator>
      <InvitationModal
        firstNameIsInvalid={!!formik.errors.firstName}
        firstNameOnChangeText={formik.handleChange('firstName')}
        firstNameErrorText={formik?.errors?.firstName}
        firstNameOnBlur={formik.handleBlur('firstName')}
        firstNameValue={formik.values?.firstName}
        lastNameIsInvalid={!!formik.errors.lastName}
        lastNameOnChangeText={formik.handleChange('lastName')}
        lastNameErrorText={formik?.errors?.lastName}
        lastNameOnBlur={formik.handleBlur('lastName')}
        lastNameValue={formik.values?.lastName}
        emailIsInvalid={!!formik.errors.email}
        emailOnChangeText={formik.handleChange('email')}
        emailErrorText={formik?.errors?.email}
        emailOnBlur={formik.handleBlur('email')}
        emailValue={formik.values?.email}
        idNumberIsInvalid={!!formik.errors.idNumber}
        idNumberOnChangeText={formik.handleChange('idNumber')}
        idNumberErrorText={formik?.errors?.idNumber}
        idNumberOnBlur={formik.handleBlur('idNumber')}
        idNumberValue={formik.values?.idNumber}
        ShowModal={showInvitationModal}
        SendInviteOnPress={
          formik.handleSubmit as (
            values:
              | GestureResponderEvent
              | React.FormEvent<HTMLFormElement>
              | undefined,
          ) => void
        }
        CloseOtpModalButtonOnPress={() => {
          setShowInvitationModal(false);
        }}
      />
      <InviteDriverFab />
      <InvitationAlert />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 2,
    textAlign: 'center',
  },
});

export default ManageDriversScreen;
