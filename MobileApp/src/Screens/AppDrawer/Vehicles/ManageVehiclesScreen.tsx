import {
  AddIcon,
  Fab,
  FabIcon,
  FlatList,
  MenuItem,
  MenuItemLabel,
  SafeAreaView,
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
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import * as yup from 'yup';
import {
  AuthContext,
  DeleteUserByUserIdAndRole,
  GetDriversByBusinessId,
} from '../../../Services/AuthenticationService';
import {GestureResponderEvent} from 'react-native';
import {Auth} from '../../../Classes/Auth';
import {VehicleListCard} from '../../../Components/Cards/VehicleListCard';
import VehicleDetailsModal from '../../../Components/Modals/VehicleDetailsModal';
import {Menu} from '@gluestack-ui/themed';
import {Vehicle} from '../../../Models/VehicleModel';
import NewVehicleModal from '../../../Components/Modals/NewVehicleDetailsModal';
import {useFocusEffect} from '@react-navigation/native';
import CaptureVehicleImageAlert from '../../../Components/Alerts/CaptureVehicleImageAlert';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {
  AddNewDriverVehicleLink,
  AddNewVehicle,
  CheckIfVehicleExists,
  DeleteDriverVehicleLink,
  GetVehicles,
  RemoveVehicle,
} from '../../../Controllers/VehicleController';
import NotificationToast from '../../../Components/Toasts/NotificationToast';
import NotificationAlert from '../../../Components/Alerts/NotificationAlert';
import {OpenCamera} from '../../../Services/CameraService';
import {ThemeStyles} from '../../../Stylesheets/GlobalStyles';

const ManageVehiclesScreen = ({route, navigation}: any) => {
  const {session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [VehicleList, setVehicleList] = useState([]);
  const [currentDriverId, setCurrentDriverId] = useState<string | null>();
  const [refreshingVehicles, setRefreshingVehicles] = useState(false);
  const onRefreshVehicles = React.useCallback(() => {
    setRefreshingVehicles(true);
    setTimeout(() => {
      try {
        GetDrivers(auth.GetBusinessId());
        GetBusinessVehicles(auth.GetBusinessId());
      } catch (error) {}
    }, 2000);
    setRefreshingVehicles(false);
  }, []);
  const [currentVehicle, setCurrentVehicle] = useState({
    VehicleId: '',
    LicenseNumber: '',
    RegistrationNumber: '',
    Vin: '',
    EngineNumber: '',
    Make: '',
    Model: '',
    Colour: '',
    LicenseDiskImageUrl: '',
    FrontImageUrl: '',
    RearImageUrl: '',
  });
  const [newVehicle, setNewVehicle] = useState<Vehicle>();
  const [showVehicleDetailsModal, setShowVehicleDetailsModal] = useState(false);
  const [showNewVehicleDetailsModal, setShowNewVehicleDetailsModal] =
    useState(false);
  const [showRemoveVehicleDialog, setShowRemoveVehicleDialog] = useState(false);
  const [selected, setSelected] = React.useState(new Set([]));
  const [vehicleFrontImage, setVehicleFrontImage] = useState('');
  const [vehicleRearImage, setVehicleRearImage] = useState('');
  const [showCaptureImageAlert, setShowCaptureImageAlert] = useState(false);
  const [captureImageAlertTitle, setCaptureImageAlertTitle] = useState(
    'Successfully scanned',
  );
  const [captureImageAlertDescription, setCaptureImageAlertDescription] =
    useState('Please take a picture of the front and rear of the vehicle.');
  const [confirmButtonTitle, setConfirmButtonTitle] = useState('Capture front');
  const [driversList, setDriversList] = useState<[]>();
  const [newLinkedDriverId, setNewLinkedDriverId] = useState('');
  const [driverList, setDriverList] = useState<[]>();
  const [IsLoading, setIsLoading] = useState(false);
  const [notificationAlert, setNotificationAlert] = useState<{
    showNotificationAlert: boolean;
    notificationAlertMessage: string;
    AlertDescription: string;
    ConfirmButtonTitle: string;
    AlertTitle: string;
    HandleConfirm: () => void;
  }>();
  const toast = useToast();

  const VehicleSchema = yup.object().shape({});
  const RegisterVehicleValues = {
    licenseNumber: '',
    registrationNumber: '',
    vin: '',
    engineNumber: '',
    make: '',
    model: '',
    colour: '',
    licenseDiskImageUrl: '',
    frontImageUrl: '',
    rearImageUrl: '',
    newLinkedDriverId: '',
  };
  const formik = useFormik({
    initialValues: RegisterVehicleValues,
    validationSchema: VehicleSchema,
    onSubmit: async () => {
      if (1 == 1) {
        setIsLoading(true);
        setShowNewVehicleDetailsModal(false);
        await AddNewVehicle(
          newVehicle!,
          vehicleFrontImage,
          vehicleRearImage,
          (error: any, result: any) => {
            if (error) {
              throw new Error(error);
              setIsLoading(false);
              ShowAddVehicleToast(false, 'Error', error);
              setShowNewVehicleDetailsModal(true);
            } else {
              onRefreshVehicles();
              setIsLoading(false);
              setShowCaptureImageAlert(false);
              setShowNewVehicleDetailsModal(false);
              ShowAddVehicleToast(
                true,
                'Success',
                'Vehicle successfully added',
              );
              ClearVehicleState();
            }
          },
        );
      }
    },
  });
  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport';

  const removeVehicleFormik = useFormik({
    initialValues: {
      confirmLicenseNumber: '',
    },
    validationSchema: yup.object().shape({
      confirmLicenseNumber: yup.string().required('Required'),
    }),
    onSubmit: async () => {
      if (formik.isValid) {
        if (
          removeVehicleFormik.values.confirmLicenseNumber ===
          currentVehicle.LicenseNumber
        ) {
          setIsLoading(true);
          setShowVehicleDetailsModal(false);
          RemoveVehicle(
            currentDriverId!,
            parseInt(currentVehicle.VehicleId),
            (error: any, resut: any) => {
              if (error) {
                throw new Error(error.response.data);
                ShowRemoveDriverToast(true);
              } else {
                onRefreshVehicles();
                ShowRemoveDriverToast(true);

                setIsLoading(false);
                setShowRemoveVehicleDialog(false);
              }
            },
          );
        }
      }
    },
  });
  const GetBusinessVehicles = async (businessId: string) => {
    return await GetVehicles(businessId, (error: any, result: any) => {
      if (error) {
        throw new Error(error.response.data);
      } else {
        setVehicleList(result.data);
      }
    });
  };
  const ShowAddVehicleToast = (
    isSuccess: boolean,
    title: string,
    message: string,
  ) => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <NotificationToast
            ToastId={toastId}
            Title={title}
            IsSuccess={isSuccess}
            Message={message}
          />
        );
      },
    });
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
  const AddVehicleFab = (props: any) => {
    return (
      <Fab
        style={{zIndex: 1}}
        onPress={() => {
          navigation.navigate('BarcodeScanner');
        }}
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}>
        <FabIcon as={AddIcon} />
      </Fab>
    );
  };
  const ScanLicenseDisc = (params?: {}) => {
    navigation.navigate({
      name: 'BarcodeScanner',
      params: params,
      merge: true,
    });
  };
  const FabMenu = () => {
    return (
      <Menu
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={keys => {
          const selectedMenuItem: any = keys;
          if (selectedMenuItem.currentKey === 'AddNewVehicle') {
            setIsLoading(true);
            ScanLicenseDisc({IsReScan: false});
          }
        }}
        closeOnSelect={true}
        placement="top"
        trigger={({...triggerProps}) => {
          return (
            <Fab
              {...triggerProps}
              style={{zIndex: 1}}
              size="md"
              placement="bottom right"
              isHovered={false}
              isDisabled={false}
              isPressed={false}>
              <FabIcon as={AddIcon} />
            </Fab>
          );
        }}>
        <MenuItem key="AddNewVehicle" textValue="Add new vehicle">
          <AddIcon />
          <MenuItemLabel size="sm">Add new vehicle</MenuItemLabel>
        </MenuItem>
      </Menu>
    );
  };
  const ConvertDriversListToDropDownList = (driversList: []) => {
    let driverDropDownList: any = [];
    if (driversList) {
      driversList!.forEach((driver: any, index: number) => {
        let driverName = driver.FirstName + ' ' + driver.LastName;
        let vehicleLicenseNumber = driver.LicenseNumber
          ? ` • ${driver.LicenseNumber}`
          : '';
        let dropDownLabel = driverName + vehicleLicenseNumber;
        driverDropDownList.push({label: dropDownLabel, value: driver.UserId});
      });
    }
    return driverDropDownList;
  };
  const OpenVehicleDetailsModal = () => {
    setShowVehicleDetailsModal(true);
  };
  const CloseVehicleDetailsModal = () => {
    setShowVehicleDetailsModal(false);
  };
  const GetDrivers = async (businessId: string) => {
    return await GetDriversByBusinessId(
      businessId,
      (error: any, result: any) => {
        if (error) {
          throw new Error(error);
        } else {
          setDriversList(result.data);
        }
      },
    );
  };
  const ClearVehicleState = () => {
    navigation.setParams({
      NewVehicle: undefined,
      IsReScan: false,
      ExistingVehicle: undefined,
    });
    setCurrentVehicle({
      VehicleId: '',
      LicenseNumber: '',
      RegistrationNumber: '',
      Vin: '',
      EngineNumber: '',
      Make: '',
      Model: '',
      Colour: '',
      LicenseDiskImageUrl: '',
      FrontImageUrl: '',
      RearImageUrl: '',
    });
    setNewLinkedDriverId('');
    setVehicleFrontImage('');
    setVehicleRearImage('');
    setConfirmButtonTitle('Capture front');
    formik!!!.resetForm();
  };
  async function GetFileBlob(url: string, callback: any) {
    let data: Blob;
    await fetch(url)
      .then(response => response.blob())
      .then(blob => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function (e) {
          callback(e.target!.result.toString());
        };
      });
  }

  const CaptureVehicle = () => {
    OpenCamera(false, (result: any, error: any) => {
      if (error) {
      } else {
        const image: ImageOrVideo = result;
        if (!vehicleFrontImage) {
          GetFileBlob(image.path, async function (imageUrl: string) {
            setVehicleFrontImage(imageUrl);
            setCaptureImageAlertTitle('Successfully scanned');
            setConfirmButtonTitle('Capture rear');
          });
        }
        if (vehicleFrontImage && !vehicleRearImage) {
          GetFileBlob(image.path, async function (imageUrl: string) {
            setVehicleRearImage(imageUrl!);
            let NewVehicle: Vehicle = route.params.NewVehicle;
            NewVehicle.FrontImage = vehicleFrontImage;
            NewVehicle.RearImage = vehicleRearImage;
            setNewVehicle(NewVehicle!);
            setShowCaptureImageAlert(false);
            setShowNewVehicleDetailsModal(true);
            navigation.setParams({NewVehicle: undefined});
          });
        }
      }
    });
  };

  const SetCurrentDriver = (vehicle: any, driverList: []) => {
    driverList.forEach((driver: any, index) => {
      if (vehicle.LicenseNumber === driver.LicenseNumber) {
        setCurrentDriverId(driver.UserId);
      }
    });
  };
  const LinkDriverToVehicle = async () => {
    if (newLinkedDriverId) {
      await AddNewDriverVehicleLink(
        newLinkedDriverId,
        currentVehicle.LicenseNumber,
        currentVehicle.VehicleId,
        (error: any, result: any) => {
          if (error) {
            ShowAddVehicleToast(false, 'Update failed', error);
            throw new Error(error.response.data);
          } else {
            ShowAddVehicleToast(
              true,
              'Update successful',
              'Vehicle has successfully been updated',
            );
          }
        },
      );
    }
  };
  const RemoveDriverVehicleLink = async (driverId: string) => {
    setIsLoading(true);
    await DeleteDriverVehicleLink(driverId, (error: any, result: any) => {
      if (error) {
        setIsLoading(false);
        ShowAddVehicleToast(false, 'Unlink failed', error);
        throw new Error(error.response.data);
      } else {
        setVehicleList([]);
        onRefreshVehicles();
        setIsLoading(false);
        setNewLinkedDriverId('');
        setCurrentDriverId('');
        ShowAddVehicleToast(
          true,
          'Unlink successful',
          'The divers has successfully been unlinked from the vehicle.',
        );
      }
    });
  };
  const ReScanVehicle = () => {
    //ClearVehicleState();
    setShowVehicleDetailsModal(false);
    setCurrentDriverId('');
    setIsLoading(true);
    ScanLicenseDisc({IsReScan: true, ExistingVehicle: currentVehicle});
  };
  const CheckRouteParams = () => {
    if (route.params?.NewVehicle) {
      CheckIfVehicleExists(
        auth.GetBusinessId(),
        route.params.NewVehicle.LicenseNumber,
        (error: any, result: any) => {
          if (error) {
            throw new Error(error);
          } else {
            let vehicleStatus: any = result.data;
            if (
              !vehicleStatus.VehicleExists &&
              !vehicleStatus.IsActive &&
              !route.params?.IsReScan
            ) {
              //Vehicle does not exists
              setShowCaptureImageAlert(true);
            }
            if (
              vehicleStatus.VehicleExists &&
              !vehicleStatus.IsActive &&
              !route.params?.IsReScan
            ) {
              //Vehicle exists and is deactivated
              setNotificationAlert({
                showNotificationAlert: true,
                AlertTitle: 'Vehicle exists',
                ConfirmButtonTitle: 'Re-add vehicle',
                AlertDescription:
                  'This vehicle has previously been added. Do you want to reactivate it?',
                notificationAlertMessage: 'test',
                HandleConfirm: () => {
                  setShowCaptureImageAlert(true);
                  setCurrentDriverId('');
                  setNotificationAlert({
                    showNotificationAlert: false,
                    AlertTitle: '',
                    ConfirmButtonTitle: '',
                    AlertDescription: '',
                    notificationAlertMessage: '',
                    HandleConfirm: () => {},
                  });
                },
              });
            }
            if (
              vehicleStatus.VehicleExists &&
              vehicleStatus.IsActive &&
              !route.params?.IsReScan
            ) {
              //Vehicle exists and is active
              setIsLoading(false);
              ShowAddVehicleToast(
                false,
                'Vehicle exists',
                'You have already added this vehicle',
              );
            }
            if (
              vehicleStatus.VehicleExists &&
              vehicleStatus.IsActive &&
              route.params?.IsReScan
            ) {
              //Rescanning vehicle
              if (route.params.NewVehicle.Vin === currentVehicle.Vin) {
                setNotificationAlert({
                  showNotificationAlert: true,
                  AlertTitle: 'Vehicle update',
                  ConfirmButtonTitle: 'Yes',
                  AlertDescription:
                    'Would you like to re-capture your vehicle?',
                  notificationAlertMessage: 'test',
                  HandleConfirm: () => {
                    setShowCaptureImageAlert(true);
                    setCurrentDriverId('');
                    setNotificationAlert({
                      showNotificationAlert: false,
                      AlertTitle: '',
                      ConfirmButtonTitle: '',
                      AlertDescription: '',
                      notificationAlertMessage: '',
                      HandleConfirm: () => {},
                    });
                  },
                });
              } else {
                OpenVehicleDetailsModal();
                ShowAddVehicleToast(
                  false,
                  'Error',
                  'You have scanned a different vehicle. Please re-scan the selected vehicle: ' +
                    currentVehicle.LicenseNumber,
                );
              }
            }
          }
        },
      );
    }
    if (!route.params?.NewVehicle && !route.params?.IsReScan) {
      setIsLoading(false);
    }
  };
  const RefreshData = () => {
    // if (!VehicleList[0]) {
    try {
      onRefreshVehicles();
    } catch (error: any) {
      throw new Error(error);
    }
    // }
  };
  const GetRandomQueryString = () => {
    return '?no-cache=' + Math.round(Math.random() * Date.now());
  };
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      CheckRouteParams();
      RefreshData();

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [route.params?.NewVehicle]),
  );

  useEffect(() => {
    RefreshData();
  }, [currentDriverId, newLinkedDriverId]);
  useEffect(() => {
    setDriverList(ConvertDriversListToDropDownList(driversList!));
  }, [driversList]);

  useEffect(() => {
    if (formik.values.newLinkedDriverId!) {
      setNewLinkedDriverId(formik.values.newLinkedDriverId);
    }
  }, [formik.values.newLinkedDriverId]);

  return (
    <SafeAreaView style={ThemeStyles.container}>
      {IsLoading ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff75',
            zIndex: 100,
          }}>
          <ActivityIndicator size="large" />
          <Text>Saving</Text>
        </View>
      ) : null}

      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <View>
          {VehicleList[0] ? (
            <FlatList
              height={'$full'}
              data={VehicleList}
              extraData
              renderItem={({item}: any) => (
                <VehicleListCard
                  LicenseNumber={item.LicenseNumber}
                  Make={item.Make}
                  Model={item.Model}
                  Colour={item.Colour}
                  VehicleImageFrontUrl={storageUrl + item.FrontImageUrl}
                  DriverFullName={
                    item.DriverFullName
                      ? item.DriverFullName
                      : 'No driver linked'
                  }
                  handleVehicleCardPress={() => {
                    SetCurrentDriver(item, driversList!);
                    setDriverList(
                      ConvertDriversListToDropDownList(driversList!),
                    );
                    setCurrentVehicle(item);
                    setShowVehicleDetailsModal(true);
                  }}
                />
              )}
              keyExtractor={(item: any) => item.VehicleId}
              refreshControl={
                <RefreshControl
                  refreshing={refreshingVehicles}
                  onRefresh={onRefreshVehicles}
                />
              }
            />
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshingVehicles}
                  onRefresh={onRefreshVehicles}
                />
              }>
              <Text>You currently have no drivers. Invite a driver.</Text>
            </ScrollView>
          )}
          <NewVehicleModal
            HandleReScan={() => {}}
            HandleLinkDriver={() => {}}
            HandleUnlinkDriver={() => {}}
            NewLinkedDriverId={formik.values.newLinkedDriverId}
            setNewLinkedDriver={setNewLinkedDriverId}
            onDriverChange={formik.handleChange('newLinkedDriverId')}
            CurrentDriverId={null}
            LicenseNumberIsInvalid={!!formik.errors.licenseNumber}
            LicenseNumberOnChangeText={formik.handleChange('licenseNumber')}
            LicenseNumberErrorText={formik?.errors?.licenseNumber}
            LicenseNumberOnBlur={formik.handleBlur('licenseNumber')}
            LicenseNumberValue={newVehicle?.LicenseNumber!}
            RegistrationNumberIsInvalid={!!formik.errors.registrationNumber}
            RegistrationNumberOnChangeText={formik.handleChange(
              'registrationNumber',
            )}
            RegistrationNumberErrorText={formik?.errors?.registrationNumber}
            RegistrationNumberOnBlur={formik.handleBlur('registrationNumber')}
            RegistrationNumberValue={newVehicle?.RegistrationNumber!}
            VinIsInvalid={!!formik.errors.vin}
            VinOnChangeText={formik.handleChange('vin')}
            VinErrorText={formik?.errors?.vin}
            VinOnBlur={formik.handleBlur('vin')}
            VinValue={newVehicle?.Vin!}
            EngineNumberIsInvalid={!!formik.errors.engineNumber}
            EngineNumberOnChangeText={formik.handleChange('engineNumber')}
            EngineNumberErrorText={formik?.errors?.engineNumber}
            EngineNumberOnBlur={formik.handleBlur('engineNumber')}
            EngineNumberValue={newVehicle?.EngineNumber!}
            MakeIsInvalid={!!formik.errors.make}
            MakeOnChangeText={formik.handleChange('make')}
            MakeErrorText={formik?.errors?.make}
            MakeOnBlur={formik.handleBlur('make')}
            MakeValue={newVehicle?.Make!}
            ModelIsInvalid={!!formik.errors.model}
            ModelOnChangeText={formik.handleChange('model')}
            ModelErrorText={formik?.errors?.model}
            ModelOnBlur={formik.handleBlur('model')}
            ModelValue={newVehicle?.Model!}
            ColourIsInvalid={!!formik.errors.colour}
            ColourOnChangeText={formik.handleChange('colour')}
            ColourErrorText={formik?.errors?.colour}
            ColourOnBlur={formik.handleBlur('colour')}
            ColourValue={newVehicle?.Colour!}
            ShowModal={showNewVehicleDetailsModal}
            LicenseDiskImageUrl={currentVehicle.LicenseDiskImageUrl}
            VehicleImageFrontUrl={vehicleFrontImage}
            VehicleImageBackUrl={vehicleRearImage}
            DriverList={driverList!}
            HandleSaveVehicle={
              formik.handleSubmit as (
                values:
                  | GestureResponderEvent
                  | React.FormEvent<HTMLFormElement>
                  | undefined,
              ) => void
            }
            OpenRemoveVehicleAlert={() => {
              setShowRemoveVehicleDialog(true);
            }}
            HandleCloseModal={() => {
              setShowNewVehicleDetailsModal(false);
              ClearVehicleState();
            }}
            RemoveVehicleAlertProps={{
              RemoveVehicleAlertIsOpen: showRemoveVehicleDialog,
              VerifyRemoveIsInvalid:
                !!removeVehicleFormik.errors.confirmLicenseNumber,
              VerifyRemoveOnChangeText: removeVehicleFormik.handleChange(
                'confirmLicenseNumber',
              ),
              VerifyRemoveErrorText:
                removeVehicleFormik?.errors?.confirmLicenseNumber,
              VerifyRemoveOnBlur: removeVehicleFormik.handleBlur(
                'confirmLicenseNumber',
              ),
              VerifyRemoveValue:
                removeVehicleFormik.values?.confirmLicenseNumber,
              RemoveVehicleConfirmation: currentVehicle.LicenseNumber,
              HandleRemoveVehicle: removeVehicleFormik.handleSubmit as (
                values:
                  | GestureResponderEvent
                  | React.FormEvent<HTMLFormElement>
                  | undefined,
              ) => void,
              CloseAlertOnPress: () => {
                setShowRemoveVehicleDialog(false);
                navigation.setParams({NewVehicleModal: undefined});
              },
            }}
          />
          <VehicleDetailsModal
            HandleReScan={ReScanVehicle}
            NewLinkedDriverId={newLinkedDriverId}
            HandleLinkDriver={async () => {
              setIsLoading(true);
              CloseVehicleDetailsModal();

              await LinkDriverToVehicle()
                .then(() => {
                  setCurrentDriverId(newLinkedDriverId);
                  setNewLinkedDriverId('');
                  onRefreshVehicles();
                })
                .finally(() => {
                  setIsLoading(false);
                  OpenVehicleDetailsModal();
                });
            }}
            HandleUnlinkDriver={async () => {
              CloseVehicleDetailsModal();
              setIsLoading(true);
              await RemoveDriverVehicleLink(currentDriverId!)
                .then(result => {
                  setNewLinkedDriverId('');
                  setCurrentDriverId('');
                })
                .finally(() => {
                  onRefreshVehicles();
                  OpenVehicleDetailsModal();
                });
            }}
            setNewLinkedDriver={setNewLinkedDriverId}
            onDriverChange={formik.handleChange('newLinkedDriverId')}
            CurrentDriverId={currentDriverId!}
            DriverList={driverList!}
            HandleSaveVehicle={() => {
              LinkDriverToVehicle();
              onRefreshVehicles();
            }}
            LicenseNumberIsInvalid={!!formik.errors.licenseNumber}
            LicenseNumberOnChangeText={formik.handleChange('licenseNumber')}
            LicenseNumberErrorText={formik?.errors?.licenseNumber}
            LicenseNumberOnBlur={formik.handleBlur('licenseNumber')}
            LicenseNumberValue={currentVehicle.LicenseNumber}
            RegistrationNumberIsInvalid={!!formik.errors.registrationNumber}
            RegistrationNumberOnChangeText={formik.handleChange(
              'registrationNumber',
            )}
            RegistrationNumberErrorText={formik?.errors?.registrationNumber}
            RegistrationNumberOnBlur={formik.handleBlur('registrationNumber')}
            RegistrationNumberValue={currentVehicle.RegistrationNumber}
            VinIsInvalid={!!formik.errors.vin}
            VinOnChangeText={formik.handleChange('vin')}
            VinErrorText={formik?.errors?.vin}
            VinOnBlur={formik.handleBlur('vin')}
            VinValue={currentVehicle.Vin}
            EngineNumberIsInvalid={!!formik.errors.engineNumber}
            EngineNumberOnChangeText={formik.handleChange('engineNumber')}
            EngineNumberErrorText={formik?.errors?.engineNumber}
            EngineNumberOnBlur={formik.handleBlur('engineNumber')}
            EngineNumberValue={currentVehicle.EngineNumber}
            MakeIsInvalid={!!formik.errors.make}
            MakeOnChangeText={formik.handleChange('make')}
            MakeErrorText={formik?.errors?.make}
            MakeOnBlur={formik.handleBlur('make')}
            MakeValue={currentVehicle.Make}
            ModelIsInvalid={!!formik.errors.model}
            ModelOnChangeText={formik.handleChange('model')}
            ModelErrorText={formik?.errors?.model}
            ModelOnBlur={formik.handleBlur('model')}
            ModelValue={currentVehicle.Model}
            ColourIsInvalid={!!formik.errors.colour}
            ColourOnChangeText={formik.handleChange('colour')}
            ColourErrorText={formik?.errors?.colour}
            ColourOnBlur={formik.handleBlur('colour')}
            ColourValue={currentVehicle.Colour}
            ShowModal={showVehicleDetailsModal}
            LicenseDiskImageUrl={currentVehicle.LicenseDiskImageUrl}
            VehicleImageFrontUrl={storageUrl + currentVehicle.FrontImageUrl}
            VehicleImageBackUrl={storageUrl + currentVehicle.RearImageUrl}
            OpenRemoveVehicleAlert={() => {
              setShowRemoveVehicleDialog(true);
            }}
            HandleCloseModal={() => {
              setCurrentDriverId('');
              setShowVehicleDetailsModal(false);
              ClearVehicleState();
            }}
            RemoveVehicleAlertProps={{
              RemoveVehicleAlertIsOpen: showRemoveVehicleDialog,
              VerifyRemoveIsInvalid:
                !!removeVehicleFormik.errors.confirmLicenseNumber,
              VerifyRemoveOnChangeText: removeVehicleFormik.handleChange(
                'confirmLicenseNumber',
              ),
              VerifyRemoveErrorText:
                removeVehicleFormik?.errors?.confirmLicenseNumber,
              VerifyRemoveOnBlur: removeVehicleFormik.handleBlur(
                'confirmLicenseNumber',
              ),
              VerifyRemoveValue:
                removeVehicleFormik.values?.confirmLicenseNumber,
              RemoveVehicleConfirmation: currentVehicle.LicenseNumber,
              HandleRemoveVehicle: removeVehicleFormik.handleSubmit as (
                values:
                  | GestureResponderEvent
                  | React.FormEvent<HTMLFormElement>
                  | undefined,
              ) => void,
              CloseAlertOnPress: () => {
                setShowRemoveVehicleDialog(false);
              },
            }}
          />
        </View>
      </View>
      <CaptureVehicleImageAlert
        ShowAlert={showCaptureImageAlert}
        AlertTitle={captureImageAlertTitle}
        AlertDescription={captureImageAlertDescription}
        ConfirmButtonTitle={confirmButtonTitle}
        CancelAlertOnPress={() => {
          setShowCaptureImageAlert(false);
          ClearVehicleState();
        }}
        HandleTakePicture={() => {
          if (vehicleFrontImage && vehicleRearImage) {
            setShowCaptureImageAlert(false);
            setShowNewVehicleDetailsModal(true);
          } else {
            CaptureVehicle();
          }
        }}
      />
      <NotificationAlert
        AlertTitle={notificationAlert?.AlertTitle!}
        AlertDescription={notificationAlert?.AlertDescription!}
        ShowAlert={notificationAlert?.showNotificationAlert!}
        ConfirmButtonTitle={notificationAlert?.ConfirmButtonTitle!}
        HandleConfirm={notificationAlert?.HandleConfirm!}
        HandleCancel={() => {
          setCurrentDriverId('');
          setNotificationAlert({
            showNotificationAlert: false,
            AlertTitle: '',
            ConfirmButtonTitle: '',
            AlertDescription: '',
            notificationAlertMessage: '',
            HandleConfirm: () => {},
          });

          ClearVehicleState();
        }}
      />
      <FabMenu />
    </SafeAreaView>
  );
};
export default ManageVehiclesScreen;
