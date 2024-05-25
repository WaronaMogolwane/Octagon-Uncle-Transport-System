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
import {DriverListCard} from '../../../Components/Cards/DriverListCard';
import DriverDetailsModal from '../../../Components/Modals/DriverDetailsModal';
import {
  AuthContext,
  DeleteUserByUserIdAndRole,
  GetDriversByBusinessId,
} from '../../../Services/AuthenticationService';
import {GestureResponderEvent} from 'react-native';
import {Auth} from '../../../Classes/Auth';
export const DriversScreen = () => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [DriversList, setDriversList] = useState([]);
  const [refreshingDrivers, setRefreshingDrivers] = React.useState(false);
  const onRefreshDrivers = React.useCallback(() => {
    setRefreshingDrivers(true);
    setTimeout(() => {
      try {
        GetDrivers(auth.GetBusinessId());
      } catch (error) {}
    }, 2000);
    setRefreshingDrivers(false);
  }, []);
  const [currentDriver, setCurrentDriver] = useState({
    UserId: '',
    FirstName: '',
    LastName: '',
    Email: '',
    RegistrationNumber: '',
  });
  const [showDriverDetailsModal, setShowDriverDetailsModal] = useState(false);
  const [showRemoveDriverDialog, setShowRemoveDriverDialog] =
    React.useState(false);
  const toast = useToast();

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

    onSubmit: async () => {
      if (formik.isValid) {
      }
    },
  });

  const removeDriverFormik = useFormik({
    initialValues: {
      confirmDriverName: '',
    },
    validationSchema: yup.object().shape({
      confirmDriverName: yup.string().required('Required'),
    }),
    onSubmit: async () => {
      if (formik.isValid) {
        if (
          removeDriverFormik.values.confirmDriverName ===
          '{0} {1}'.format(currentDriver.FirstName, currentDriver.LastName)
        ) {
          DeleteUserByUserIdAndRole(currentDriver.UserId, '2', (error: any) => {
            if (error) {
              console.error(error);
              ShowRemoveDriverToast(false);
            } else {
              GetDrivers(auth.GetBusinessId());
              setShowRemoveDriverDialog(false);
              setShowDriverDetailsModal(false);
              ShowRemoveDriverToast(true);
            }
          });
        }
      }
    },
  });
  const GetDrivers = async (businessId: string) => {
    return await GetDriversByBusinessId(
      businessId,
      (error: any, result: any) => {
        if (error) {
          console.error(error);
        } else {
          setDriversList(result.data);
        }
      },
    );
  };
  const ShowRemoveDriverToast = (isSuccess: boolean) => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return isSuccess ? (
          <Toast nativeID={toastId} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>Driver successfully removed..</ToastDescription>
            </VStack>
          </Toast>
        ) : (
          <Toast nativeID={toastId} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Failed</ToastTitle>
              <ToastDescription>
                An error has occurred. The driver was not removed
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  useEffect(() => {
    GetDrivers(auth.GetBusinessId());
  }, [auth]);
  return (
    <View style={{flex: 1}}>
      {DriversList[0] ? (
        <FlatList
          mt="$3"
          data={DriversList}
          extraData={DriversList}
          renderItem={({item}: any) => (
            <DriverListCard
              firstName={item.FirstName}
              lastName={item.LastName}
              email={item.Email}
              vehicleLicenseNumber={
                item.RegistrationNumber
                  ? item.RegistrationNumber
                  : 'No vehicle linked.'
              }
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
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshingDrivers}
              onRefresh={onRefreshDrivers}
            />
          }>
          <Text>You currently have no drivers. Invite a driver.</Text>
        </ScrollView>
      )}
      <DriverDetailsModal
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
        OpenRemoveDriverAlert={() => {
          setShowRemoveDriverDialog(true);
        }}
        CloseOtpModalButtonOnPress={() => {
          setShowDriverDetailsModal(false);
        }}
        RemoveDriverAlertProps={{
          RemoveDriverAlertIsOpen: showRemoveDriverDialog,
          VerifyRemoveIsInvalid: !!removeDriverFormik.errors.confirmDriverName,
          VerifyRemoveOnChangeText:
            removeDriverFormik.handleChange('confirmDriverName'),
          VerifyRemoveErrorText: removeDriverFormik?.errors?.confirmDriverName,
          VerifyRemoveOnBlur:
            removeDriverFormik.handleBlur('confirmDriverName'),
          VerifyRemoveValue: removeDriverFormik.values?.confirmDriverName,
          RemoveDriverConfirmation: '{0} {1}'.format(
            currentDriver.FirstName,
            currentDriver.LastName,
          ),
          HandleRemoveDriver: removeDriverFormik.handleSubmit as (
            values:
              | GestureResponderEvent
              | React.FormEvent<HTMLFormElement>
              | undefined,
          ) => void,
          CloseAlertOnPress: () => {
            setShowRemoveDriverDialog(false);
          },
        }}
      />
    </View>
  );
};
