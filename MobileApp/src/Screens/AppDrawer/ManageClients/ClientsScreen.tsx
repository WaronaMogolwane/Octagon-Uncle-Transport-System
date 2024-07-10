import {
  FlatList,
  ScrollView,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import {useFormik} from 'formik';
import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import * as yup from 'yup';
import {
  AuthContext,
  DeleteUserByUserIdAndRole,
  GetClientsByBusinessId,
} from '../../../Services/AuthenticationService';
import {GestureResponderEvent} from 'react-native';
import ClientDetailsModal from '../../../Components/Modals/ClientDetailsModal';
import {ClientListCard} from '../../../Components/Cards/ClientListCard';
import {Auth} from '../../../Classes/Auth';

export const ClientsScreen = () => {
  const {session}: any = useContext(AuthContext);

  const [ClientsList, setClientsList] = useState([]);
  const [refreshingClients, setrefreshingClients] = React.useState(false);
  const [auth, setAuth] = useState(new Auth(session));
  const onRefreshClients = React.useCallback(() => {
    setrefreshingClients(true);
    setTimeout(() => {
      GetClients(auth.GetBusinessId());
    }, 2000);
    setrefreshingClients(false);
  }, []);
  const [currentClient, setcurrentClient] = useState({
    UserId: '',
    FirstName: '',
    LastName: '',
    Email: '',
    RegistrationNumber: '',
  });
  const [showClientDetailsModal, setshowClientDetailsModal] = useState(false);
  const [showRemoveClientDialog, setshowRemoveClientDialog] =
    React.useState(false);
  const toast = useToast();

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

  const registerAddClientValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const formik = useFormik({
    initialValues: registerAddClientValues,
    validationSchema: addClientSchema,

    onSubmit: async () => {
      if (formik.isValid) {
      }
    },
  });

  const removeClientFormik = useFormik({
    initialValues: {
      confirmDriverName: '',
    },
    validationSchema: yup.object().shape({
      confirmDriverName: yup.string().required('Required'),
    }),
    onSubmit: async () => {
      if (formik.isValid) {
        if (
          removeClientFormik.values.confirmDriverName ===
          '{0} {1}'.format(currentClient.FirstName, currentClient.LastName)
        ) {
          DeleteUserByUserIdAndRole(currentClient.UserId, '2', (error: any) => {
            if (error) {
              console.error(error);
              ShowRemoveClientToast(false);
            } else {
              GetClients(auth.GetBusinessId());
              setshowRemoveClientDialog(false);
              setshowClientDetailsModal(false);
              ShowRemoveClientToast(true);
            }
          });
        }
      }
    },
  });
  const GetClients = async (businessId: string) => {
    return await GetClientsByBusinessId(
      businessId,
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          setClientsList(result.data);
        }
      },
    );
  };
  const ShowRemoveClientToast = (isSuccess: boolean) => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return isSuccess ? (
          <Toast nativeID={toastId} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>Client successfully removed..</ToastDescription>
            </VStack>
          </Toast>
        ) : (
          <Toast nativeID={toastId} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Failed</ToastTitle>
              <ToastDescription>
                An error has occurred. The client was not removed
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  useEffect(() => {
    if (session !== null) {
      GetClients(auth.GetBusinessId());
    }
  }, [session]);
  return (
    <View style={{flex: 1}}>
      {ClientsList[0] ? (
        <FlatList
          mt="$3"
          data={ClientsList}
          extraData={ClientsList}
          renderItem={({item}: any) => (
            <ClientListCard
              firstName={item.FirstName}
              lastName={item.LastName}
              email={item.Email}
              numberOfPassengers={
                item.RegistrationNumber
                  ? item.NumberOfPassengers
                  : 'No passengers added.'
              }
              handleDriverCardPress={() => {
                setcurrentClient(item);
                setshowClientDetailsModal(true);
              }}
            />
          )}
          keyExtractor={(item: any) => item.UserId}
          refreshControl={
            <RefreshControl
              refreshing={refreshingClients}
              onRefresh={onRefreshClients}
            />
          }
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshingClients}
              onRefresh={onRefreshClients}
            />
          }>
          <Text>You currently have no clients. Invite a new client.</Text>
        </ScrollView>
      )}
      <ClientDetailsModal
        profilePictureUrl="https://media.licdn.com/dms/image/C4D03AQFotIRK58pRNA/profile-displayphoto-shrink_200_200/0/1525163555622?e=2147483647&v=beta&t=lvummEevyaevcll0SjNg8UvthCNqz05ate3HonR4zfc"
        firstNameIsInvalid={!!formik.errors.firstName}
        firstNameOnChangeText={formik.handleChange('firstName')}
        firstNameErrorText={formik?.errors?.firstName}
        firstNameOnBlur={formik.handleBlur('firstName')}
        firstNameValue={currentClient.FirstName}
        lastNameIsInvalid={!!formik.errors.lastName}
        lastNameOnChangeText={formik.handleChange('lastName')}
        lastNameErrorText={formik?.errors?.lastName}
        lastNameOnBlur={formik.handleBlur('lastName')}
        lastNameValue={currentClient.LastName}
        emailIsInvalid={!!formik.errors.email}
        emailOnChangeText={formik.handleChange('email')}
        emailErrorText={formik?.errors?.email}
        emailOnBlur={formik.handleBlur('email')}
        emailValue={currentClient.Email}
        vehicleLicenseNumber={currentClient.RegistrationNumber}
        ShowModal={showClientDetailsModal}
        OpenRemoveClientAlert={() => {
          setshowRemoveClientDialog(true);
        }}
        CloseOtpModalButtonOnPress={() => {
          setshowClientDetailsModal(false);
        }}
        RemoveClientAlertProps={{
          RemoveClientAlertIsOpen: showRemoveClientDialog,
          VerifyRemoveIsInvalid: !!removeClientFormik.errors.confirmDriverName,
          VerifyRemoveOnChangeText:
            removeClientFormik.handleChange('confirmDriverName'),
          VerifyRemoveErrorText: removeClientFormik?.errors?.confirmDriverName,
          VerifyRemoveOnBlur:
            removeClientFormik.handleBlur('confirmDriverName'),
          VerifyRemoveValue: removeClientFormik.values?.confirmDriverName,
          RemoveClientConfirmation: '{0} {1}'.format(
            currentClient.FirstName,
            currentClient.LastName,
          ),
          HandleRemoveClient: removeClientFormik.handleSubmit as (
            values:
              | GestureResponderEvent
              | React.FormEvent<HTMLFormElement>
              | undefined,
          ) => void,
          CloseAlertOnPress: () => {
            setshowRemoveClientDialog(false);
          },
        }}
      />
    </View>
  );
};
