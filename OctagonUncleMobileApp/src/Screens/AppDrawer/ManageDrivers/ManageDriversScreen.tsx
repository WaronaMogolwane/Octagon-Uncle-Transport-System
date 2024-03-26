import React, {useContext, useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TripCardDriverSwipable} from '../../../Components/TripCardDriverSwipable';
import {
  Box,
  FlatList,
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
  AlertDialogCloseButton,
  ButtonText,
  CheckCircleIcon,
  HStack,
  Heading,
  Icon,
  ButtonGroup,
  CloseIcon,
} from '@gluestack-ui/themed';
import InvitationModal from '../../../Components/Modals/InvitationModal';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {
  AuthContext,
  DeleteUserInvitation,
  GetDriversByBusinessId,
  GetInvitationsByBusinessIdUserRole,
} from '../../../Services/AuthenticationService';
import {UserInvitation} from '../../../Models/UserInvitation';
import {
  PendingDriverListCard,
  DriverListCard,
} from '../../../Components/Cards/DriverListCard';
import ManageDriverModal from '../../../Components/Modals/DriverDetailsModal';
import {Vehicle} from '../../../Models/VehicleModel';
import {PendingDriverscreen} from './PendingDriversScreen';
import {DriversScreen} from './DriversScreen';
import {GetDriverInvitation} from '../../../Controllers/DriverController';

const ManageDriverscreen = ({navigation}: any) => {
  const {createUserInvitation, session}: any = useContext(AuthContext);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [currentDriver, setCurrentDriver] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    RegistrationNumber: '',
  });
  const [showDriverDetailsModal, setShowDriverDetailsModal] = useState(false);

  const payerId = 'c7728615-394f-466b-833e-ea9dd60ba836 ';
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';
  const southAfricanIdRegex: RegExp =
    /(([0-9]{2})(0|1)([0-9])([0-3])([0-9]))([ ]?)(([0-9]{4})([ ]?)([0-1][8]([ ]?)[0-9]))/;

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
  });
  const removeDriverSchema = yup.object().shape({
    confirmDriverName: yup.string().required('Required'),
  });
  const registerRemoveDriverValues = {
    confirmDriverName: '',
  };
  const registerAddDriverValues = {
    firstName: '',
    lastName: '',
    email: '',
  };
  const removeDriverFormik = useFormik({
    initialValues: registerRemoveDriverValues,
    validationSchema: removeDriverSchema,
    onSubmit: async values => {
      // let driverName =
      console.log(
        'Hello {0}, your order {1} has been shipped.'.format('John', 10001),
      );
      if (removeDriverFormik.isValid && values.confirmDriverName === 'z') {
      }
    },
  });
  const addDriverFormik = useFormik({
    initialValues: registerAddDriverValues,
    validationSchema: addDriverSchema,

    onSubmit: async values => {
      let userInvitation: UserInvitation = {
        businessId: businessId,
        invitationCode: '',
        firstName: addDriverFormik.values.firstName,
        lastName: addDriverFormik.values.lastName,
        userEmail: addDriverFormik.values.email,
        userRole: '2',
      };
      if (addDriverFormik.isValid) {
        await createUserInvitation(
          userInvitation,
          (error: any, result: any) => {
            if (error) {
              console.error(error);
            } else {
              setShowInvitationModal(false);
              setShowAlertDialog(true);
              GetDriverInvitation(
                businessId,
                '2',
                (error: any, result: any) => {
                  if (error) {
                  } else {
                  }
                },
              );
            }
          },
        );
      }
    },
  });

  const Tab = createMaterialTopTabNavigator();

  const ShowInvitationModal = () => {
    setShowInvitationModal(true);
  };
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
              An invite code has been sent to {addDriverFormik.values.email}.
              This invite will expire after 7 days.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter borderTopWidth={0}>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr={3}
              onPress={() => {
                addDriverFormik.resetForm();
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
        <FabIcon as={AddIcon} />
        <FabLabel>Invite driver</FabLabel>
      </Fab>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Drivers" component={DriversScreen} />
        <Tab.Screen name="Pending Drivers" component={PendingDriverscreen} />
      </Tab.Navigator>
      <InvitationModal
        firstNameIsInvalid={!!addDriverFormik.errors.firstName}
        firstNameOnChangeText={addDriverFormik.handleChange('firstName')}
        firstNameErrorText={addDriverFormik?.errors?.firstName}
        firstNameOnBlur={addDriverFormik.handleBlur('firstName')}
        firstNameValue={addDriverFormik.values?.firstName}
        lastNameIsInvalid={!!addDriverFormik.errors.lastName}
        lastNameOnChangeText={addDriverFormik.handleChange('lastName')}
        lastNameErrorText={addDriverFormik?.errors?.lastName}
        lastNameOnBlur={addDriverFormik.handleBlur('lastName')}
        lastNameValue={addDriverFormik.values?.lastName}
        emailIsInvalid={!!addDriverFormik.errors.email}
        emailOnChangeText={addDriverFormik.handleChange('email')}
        emailErrorText={addDriverFormik?.errors?.email}
        emailOnBlur={addDriverFormik.handleBlur('email')}
        emailValue={addDriverFormik.values?.email}
        ShowModal={showInvitationModal}
        SendInviteOnPress={
          addDriverFormik.handleSubmit as (
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

export default ManageDriverscreen;
