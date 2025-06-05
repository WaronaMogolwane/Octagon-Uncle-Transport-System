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
import {ClientsScreen} from './ClientsScreen';
import {PendingClientsScreen} from './PendingClientsScreen';
import {GetClientsInvitation} from '../../../Controllers/ClientController';
import {Auth} from '../../../Classes/Auth';
import ClientInvitationModal from '../../../Components/Modals/ClientInvitationModal';
import PaymentScheduleModal from '../../../Components/Modals/PaymentScheduleModal';
import {PaymentSchedule} from '../../../Models/PaymentShedule';
import {CreatePaymentSchedule} from '../../../Controllers/PaymentsController';

const ManageClientsScreen = ({navigation}: any) => {
  const {createUserInvitation, session}: any = useContext(AuthContext);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [showPaymentScheduleModal, setShowPaymentScheduleModal] =
    useState(false);
  const [auth, setAuth] = useState(new Auth(session));
  const addClientSchema = yup.object().shape({
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
  const paymentScheduleSchema = yup.object().shape({
    amount: yup
      .number()
      .min(10000, 'Amount too low!')
      .max(1000000, 'Choose a lower amount')
      .required('Required'),
    paymentDay: yup
      .number()
      .min(1, 'Day of the month does not exist!')
      .max(29, 'Pick a different payment day!')
      .required('Required'),
  });
  const removeClientSchema = yup.object().shape({
    confirmClientName: yup.string().required('Required'),
  });
  const registerRemoveClientValues = {
    confirmClientName: '',
  };
  const registerPaymentScheduleValues = {
    amount: 0,
    paymentDay: 0,
  };
  const registerAddClientValues = {
    firstName: '',
    lastName: '',
    email: '',
  };
  const removeCleintFormik = useFormik({
    initialValues: registerRemoveClientValues,
    validationSchema: removeClientSchema,
    onSubmit: async values => {
      if (removeCleintFormik.isValid && values.confirmClientName === 'z') {
      }
    },
  });
  const addClientFormik = useFormik({
    initialValues: registerAddClientValues,
    validationSchema: addClientSchema,
    onSubmit: async values => {
      if (addClientFormik.isValid) {
        setShowInvitationModal(false);
        setShowPaymentScheduleModal(true);
      }
    },
  });
  const paymentScheduleFormik = useFormik({
    initialValues: registerPaymentScheduleValues,
    validationSchema: paymentScheduleSchema,
    onSubmit: async values => {
      let userInvitation: UserInvitation = {
        businessId: auth.GetBusinessId(),
        invitationCode: '',
        firstName: addClientFormik.values.firstName,
        lastName: addClientFormik.values.lastName,
        userEmail: addClientFormik.values.email,
        userRole: '2',
      };
      if (paymentScheduleFormik.isValid) {
        await createUserInvitation(
          userInvitation,
          async (error: any, result: any) => {
            if (error) {
              throw new Error(error.response.data);
            } else {
              const userId: string = result.data.userId;
              let paymentSchedule: PaymentSchedule = new PaymentSchedule(
                userId,
                paymentScheduleFormik.values.amount.toString(),
                paymentScheduleFormik.values.paymentDay,
              );
              try {
                await CreatePaymentSchedule(paymentSchedule);
                setShowPaymentScheduleModal(false);
                setShowAlertDialog(true);
                paymentScheduleFormik.resetForm();
                await GetClientsInvitation(
                  auth.GetBusinessId(),
                  '2',
                  (error: any, result: any) => {
                    // handle result or error if needed
                  },
                );
              } catch (error: any) {
                throw new Error(error.toString());
              }
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
              An invite code has been sent to {addClientFormik.values.email}.
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
                addClientFormik.resetForm();
                setShowAlertDialog(false);
              }}>
              <ButtonText>Okay</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  const InviteClientFab = () => {
    return (
      <Fab
        onPress={ShowInvitationModal}
        size="sm"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}>
        <FabIcon as={AddIcon} />
        <FabLabel>Invite client</FabLabel>
      </Fab>
    );
  };
  const PaymentScheduleModalBackPress = () => {
    setShowPaymentScheduleModal(false);
    setShowInvitationModal(true);
  };
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Clients" component={ClientsScreen} />
        <Tab.Screen name="Pending Clients" component={PendingClientsScreen} />
      </Tab.Navigator>
      <ClientInvitationModal
        firstNameIsInvalid={!!addClientFormik.errors.firstName}
        firstNameOnChangeText={addClientFormik.handleChange('firstName')}
        firstNameErrorText={addClientFormik?.errors?.firstName}
        firstNameOnBlur={addClientFormik.handleBlur('firstName')}
        firstNameValue={addClientFormik.values?.firstName}
        lastNameIsInvalid={!!addClientFormik.errors.lastName}
        lastNameOnChangeText={addClientFormik.handleChange('lastName')}
        lastNameErrorText={addClientFormik?.errors?.lastName}
        lastNameOnBlur={addClientFormik.handleBlur('lastName')}
        lastNameValue={addClientFormik.values?.lastName}
        emailIsInvalid={!!addClientFormik.errors.email}
        emailOnChangeText={addClientFormik.handleChange('email')}
        emailErrorText={addClientFormik?.errors?.email}
        emailOnBlur={addClientFormik.handleBlur('email')}
        emailValue={addClientFormik.values?.email}
        confirmButtonText={'Next'}
        ShowModal={showInvitationModal}
        SendInviteOnPress={
          addClientFormik.handleSubmit as (
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
      <PaymentScheduleModal
        AmountIsInvalid={!!paymentScheduleFormik.errors.amount}
        AmountOnChangeText={paymentScheduleFormik.handleChange('amount')}
        AmountErrorText={paymentScheduleFormik?.errors?.amount}
        AmountOnBlur={paymentScheduleFormik.handleBlur('amount')}
        AmountValue={paymentScheduleFormik.values?.amount.toString()}
        PaymentDayIsInvalid={!!paymentScheduleFormik.errors.paymentDay}
        PaymentDayOnChangeText={paymentScheduleFormik.handleChange(
          'paymentDay',
        )}
        PaymentDayErrorText={paymentScheduleFormik?.errors?.paymentDay}
        PaymentDayOnBlur={paymentScheduleFormik.handleBlur('paymentDay')}
        PaymentDayValue={paymentScheduleFormik.values?.paymentDay.toString()}
        ShowModal={showPaymentScheduleModal}
        SendInviteOnPress={
          paymentScheduleFormik.handleSubmit as (
            values:
              | GestureResponderEvent
              | React.FormEvent<HTMLFormElement>
              | undefined,
          ) => void
        }
        CloseModalOnPress={() => {
          setShowPaymentScheduleModal(false);
        }}
        BackOnPpress={() => {
          PaymentScheduleModalBackPress();
        }}
      />
      <InviteClientFab />
      <InvitationAlert />
    </NavigationContainer>
  );
};

export default ManageClientsScreen;
