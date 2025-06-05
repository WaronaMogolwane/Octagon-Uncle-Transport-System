import React, {useContext, useState} from 'react';
import {GestureResponderEvent} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
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
import InvitationModal from '../../../Components/Modals/DriverInvitationModal';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {AuthContext} from '../../../Services/AuthenticationService';
import {UserInvitation} from '../../../Models/UserInvitation';
import {PendingDriverscreen} from './PendingDriversScreen';
import {DriversScreen} from './DriversScreen';
import {GetDriverInvitation} from '../../../Controllers/DriverController';
import {Auth} from '../../../Classes/Auth';
import DriverInvitationModal from '../../../Components/Modals/DriverInvitationModal';

const ManageDriverscreen = ({navigation}: any) => {
  const {createUserInvitation, session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [PendingDriversList, setPendingDriversList] = useState([]);

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
  const addDriverFormik = useFormik({
    initialValues: registerAddDriverValues,
    validationSchema: addDriverSchema,

    onSubmit: async values => {
      let userInvitation: UserInvitation = {
        businessId: auth.GetBusinessId(),
        invitationCode: '',
        firstName: addDriverFormik.values.firstName,
        lastName: addDriverFormik.values.lastName,
        userEmail: addDriverFormik.values.email,
        userRole: '3',
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
                auth.GetBusinessId(),
                '3',
                (error: any, result: any) => {
                  if (error) {
                  } else {
                    setPendingDriversList(result.data);
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
      <DriverInvitationModal
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
