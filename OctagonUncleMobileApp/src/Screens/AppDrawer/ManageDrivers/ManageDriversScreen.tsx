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
import DriverDetailsModal from '../../../Components/Modals/DriverDetailsModal';
import {Vehicle} from '../../../Models/VehicleModel';

const ManageDriverscreen = ({navigation}: any) => {
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
  const onRefreshPendingDrivers = React.useCallback(() => {
    setRefreshingPendingDrivers(true);

    setTimeout(() => {
      getPendingDrivers();
    }, 2000);
    setRefreshingPendingDrivers(false);
  }, []);

  const onRefreshDrivers = React.useCallback(() => {
    setRefreshingDrivers(true);

    setTimeout(() => {
      getDrivers();
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

  useEffect(() => {
    getDrivers();
    getPendingDrivers();
  }, []);

  const getDrivers = async () => {
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

  const getPendingDrivers = async () => {
    return await GetInvitationsByBusinessIdUserRole(
      businessId,
      '2',
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          setPendingDriversList(result.data);
        }
      },
    );
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
        await createUserInvitation(
          userInvitation,
          (error: any, result: any) => {
            if (error) {
              console.error(error);
            } else {
              getPendingDrivers();
              setShowInvitationModal(false);
              setShowAlertDialog(true);
            }
          },
        );
      }
    },
  });

  const Tab = createMaterialTopTabNavigator();

  function Driverscreen() {
    return (
      <View style={{flex: 1}}>
        <FlatList
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
      </View>
    );
  }

  function PendingDriverscreen() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={PendingDriversList}
          extraData={PendingDriversList}
          renderItem={({item}: any) => (
            <PendingDriverListCard
              firstName={item.FirstName}
              lastName={item.LastName}
              email={item.Email}
              expiryDate={item.ExpiryDate}
              removeButtonOnPress={() => {
                setCurrentInvitationId;
                setCurrentInvitationId(item.UserInvitationId);
                setCurrentInvitationFullName(
                  item.FirstName + ' ' + item.LastName,
                );
                setShowRemoveInviteAlertDialog(true);
              }}
            />
          )}
          keyExtractor={(item: any) => item.UserInvitationId}
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
  const RemoveAlert = () => {
    return (
      <AlertDialog
        isOpen={showRemoveInviteAlertDialog}
        onClose={() => {
          setShowRemoveInviteAlertDialog(false);
        }}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Delete invitation</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Are you sure you want to delete {CurrentInvitationFullName}'s
              invitation? This invitation will be permanently removed and cannot
              be undone. A new invitation will have to created.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowRemoveInviteAlertDialog(false);
                }}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                  RemoveInvitation(CurrentInvitationId);
                  setShowRemoveInviteAlertDialog(false);
                }}>
                <ButtonText>Delete</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  const renderItemComponent = (itemData: any) => (
    <Text>{itemData.firstName}</Text>
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
                formik.resetForm();
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

  const RemoveInvitation = async (invitationId: string) => {
    await DeleteUserInvitation(invitationId, 2, (error: any, result: any) => {
      if (error) {
        setRefreshingPendingDrivers(false);
        console.error(error.response.data);
      } else {
        getPendingDrivers();
        setRefreshingPendingDrivers(false);
        console.log(result);
      }
    });
  };

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Drivers" component={Driverscreen} />
        <Tab.Screen name="Pending Drivers" component={PendingDriverscreen} />
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
      <DriverDetailsModal
        profilePictureUrl="https://www.english-heritage.org.uk/siteassets/home/learn/histories/black-history/cunningham-hub-item-image.jpg"
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
      <InviteDriverFab />
      <InvitationAlert />
      <RemoveAlert />
    </NavigationContainer>
  );
};

export default ManageDriverscreen;
