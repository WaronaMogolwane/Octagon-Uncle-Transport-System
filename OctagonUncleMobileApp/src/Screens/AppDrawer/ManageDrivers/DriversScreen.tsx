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
const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';

export const DriversScreen = () => {
  const {createUserInvitation, session}: any = useContext(AuthContext);

  const [CurrentInvitationId, setCurrentInvitationId] = useState('');
  const [CurrentInvitationFullName, setCurrentInvitationFullName] =
    useState('');
  const [DriversList, setDriversList] = useState([]);
  const [PendingDriversList, setPendingDriversList] = useState([]);
  const [refreshingDrivers, setRefreshingDrivers] = React.useState(false);
  const [refreshingPendingDrivers, setRefreshingPendingDrivers] =
    React.useState(false);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [showRemoveInviteAlertDialog, setShowRemoveInviteAlertDialog] =
    React.useState(false);

  const onRefreshDrivers = React.useCallback(() => {
    setRefreshingDrivers(true);

    setTimeout(() => {
      GetDrivers();
    }, 2000);
    setRefreshingDrivers(false);
  }, []);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [currentDriver, setCurrentDriver] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    RegistrationNumber: '',
  });
  const [showDriverDetailsModal, setShowDriverDetailsModal] = useState(false);

  const payerId = 'c7728615-394f-466b-833e-ea9dd60ba836';
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

  const registerAddDriverValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const formik = useFormik({
    initialValues: registerAddDriverValues,
    validationSchema: addDriverSchema,

    onSubmit: async values => {
      let userInvitation: UserInvitation = {
        businessId: businessId,
        invitationCode: '',
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        userEmail: formik.values.email,
        userRole: '2',
      };
      if (formik.isValid) {
      }
    },
  });

  const GetDrivers = async () => {
    return await GetDriversByBusinessId(
      businessId,
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          setDriversList(result.data);
        }
      },
    );
  };

  useEffect(() => {
    GetDrivers();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        mt="$3"
        data={DriversList}
        extraData={DriversList}
        renderItem={({item}: any) => (
          <DriverListCard
            firstName={item.FirstName}
            lastName={item.LastName}
            email={item.Email}
            vehicleLicenseNumber={item.RegistrationNumber}
            handleDriverCardPress={() => {
              setCurrentDriver(item);
              setShowDriverDetailsModal(true);
            }}
          />
        )}
        keyExtractor={(item: any) => item.UserId}
        refreshControl={
          <RefreshControl
            refreshing={refreshingDrivers}
            onRefresh={onRefreshDrivers}
          />
        }
      />
      <ManageDriverModal
        profilePictureUrl="https://media.licdn.com/dms/image/C4D03AQFotIRK58pRNA/profile-displayphoto-shrink_200_200/0/1525163555622?e=2147483647&v=beta&t=lvummEevyaevcll0SjNg8UvthCNqz05ate3HonR4zfc"
        firstNameIsInvalid={!!formik.errors.firstName}
        firstNameOnChangeText={formik.handleChange('firstName')}
        firstNameErrorText={formik?.errors?.firstName}
        firstNameOnBlur={formik.handleBlur('firstName')}
        firstNameValue={currentDriver.FirstName}
        lastNameIsInvalid={!!formik.errors.lastName}
        lastNameOnChangeText={formik.handleChange('lastName')}
        lastNameErrorText={formik?.errors?.lastName}
        lastNameOnBlur={formik.handleBlur('lastName')}
        lastNameValue={currentDriver.LastName}
        emailIsInvalid={!!formik.errors.email}
        emailOnChangeText={formik.handleChange('email')}
        emailErrorText={formik?.errors?.email}
        emailOnBlur={formik.handleBlur('email')}
        emailValue={currentDriver.Email}
        vehicleLicenseNumber={currentDriver.RegistrationNumber}
        ShowModal={showDriverDetailsModal}
        HandleRemoveDriver={() => {}}
        CloseOtpModalButtonOnPress={() => {
          setShowDriverDetailsModal(false);
        }}
      />
    </View>
  );
};
