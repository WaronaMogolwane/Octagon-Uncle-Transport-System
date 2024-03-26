import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ButtonGroup,
  ButtonText,
  CloseIcon,
  FlatList,
  Heading,
  Icon,
  Text,
} from '@gluestack-ui/themed';
import {useFormik} from 'formik';
import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import * as yup from 'yup';
import {DriverListCard} from '../../../Components/Cards/DriverListCard';
import {CustomFormControlInput} from '../../../Components/CustomFormInput';
import ManageDriverModal from '../../../Components/Modals/DriverDetailsModal';
import {
  AuthContext,
  DeleteDriverByUserIdAndRole,
  GetDriversByBusinessId,
} from '../../../Services/AuthenticationService';

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
    UserId: '',
    FirstName: '',
    LastName: '',
    Email: '',
    RegistrationNumber: '',
  });
  const [showDriverDetailsModal, setShowDriverDetailsModal] = useState(false);
  const [showRemoveDriverDialog, setShowRemoveDriverDialog] =
    React.useState(false);

  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';

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
  const removeDriverSchema = yup.object().shape({
    confirmDriverName: yup.string().required('Required'),
  });
  const registerRemoveDriverValues = {
    confirmDriverName: '',
  };
  const removeDriverFormik = useFormik({
    initialValues: registerRemoveDriverValues,
    validationSchema: removeDriverSchema,
    onSubmit: async () => {},
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
  const RemoveDriverAlert = () => {
    String.prototype.format = function () {
      var args = arguments;
      return this.replace(/{([0-9]+)}/g, function (match, index) {
        return typeof args[index] == 'undefined' ? match : args[index];
      });
    };

    return (
      <AlertDialog
        isOpen={showRemoveDriverDialog}
        onClose={() => {
          setShowRemoveDriverDialog(false);
        }}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Remove driver</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Are you sure you want to remove
              {' {0} {1} '.format(
                currentDriver.FirstName,
                currentDriver.LastName,
              )}
              as your driver? Any vehicle linked to this driver will have to be
              linked to another driver.
            </Text>
            <Text size="sm" highlight={true}>
              Enter
              {' "{0} {1}" '.format(
                currentDriver.FirstName,
                currentDriver.LastName,
              )}
              to remove the driver.
            </Text>
            <CustomFormControlInput
              placeHolder={' {0} {1} '.format(
                currentDriver.FirstName,
                currentDriver.LastName,
              )}
              isRequired={false}
              isInvalid={false}
              type="text"
            />
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowRemoveDriverDialog(false);
                }}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={
                  () => {
                    RemoveDriver();
                  }
                  //setShowRemoveDriverDialog(false);
                }>
                <ButtonText>Remove</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  const RemoveDriver = async () => {
    if (removeDriverFormik.values.confirmDriverName)
      DeleteDriverByUserIdAndRole(currentDriver.UserId, '2', (error: any) => {
        if (error) {
          console.error(error);
        } else {
          GetDrivers();
          setShowRemoveDriverDialog(false);
          setShowDriverDetailsModal(false);
        }
      });
  };

  useEffect(() => {
    GetDrivers();
  }, []);
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
      ) : (
        <Text>You currently have no drivers. Invite a driver.</Text>
      )}
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
        HandleRemoveDriver={() => {
          setShowRemoveDriverDialog(true);
        }}
        CloseOtpModalButtonOnPress={() => {
          setShowDriverDetailsModal(false);
        }}
      />
      <RemoveDriverAlert />
    </View>
  );
};
