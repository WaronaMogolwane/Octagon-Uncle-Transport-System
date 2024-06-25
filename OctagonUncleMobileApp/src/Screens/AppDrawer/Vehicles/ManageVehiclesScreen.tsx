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
import ImagePicker from 'react-native-image-crop-picker';
import {
  AddNewVehicle,
  GetVehicles,
} from '../../../Controllers/VehicleController';

const ManageVehiclesScreen = ({route, navigation}: any) => {
  const {session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [VehicleList, setVehicleList] = useState([]);
  const [currentDriverIndex, setCurrentDriverIndex] = useState<number>();
  const [refreshingVehicles, setRefreshingVehicles] = useState(false);
  const onRefreshDrivers = React.useCallback(() => {
    setRefreshingVehicles(true);
    setTimeout(() => {
      try {
        GetBusinessVehicles(auth.GetBusinessId());
      } catch (error) {}
    }, 2000);
    setRefreshingVehicles(false);
  }, []);
  const [currentVehicle, setCurrentVehicle] = useState({
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
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [selected, setSelected] = React.useState(new Set([]));

  const [vehicleFrontImage, setVehicleFrontImage] = useState('');
  const [vehicleRearImage, setVehicleRearImage] = useState('');
  const [licensePlateImage, setLicensePlateImage] = useState('');
  const [showCaptureImageAlert, setShowCaptureImageAlert] = useState(false);
  const [captureImageAlertTitle, setCaptureImageAlertTitle] = useState(
    'Successfully scanned',
  );
  const [captureImageAlertDescription, setCaptureImageAlertDescription] =
    useState('Please take a picture of the front and rear of the vehicle.');
  const [confirmButtonTitle, setConfirmButtonTitle] = useState('Capture front');

  const [vehicleIsSaving, setVehicleIsSaving] = useState(true);
  const [driversList, setDriversList] = useState<[]>();

  const toast = useToast();

  const AddVehicleSchema = yup.object().shape({});

  const RegisterAddVehicleValues = {
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
  };
  const [IsLoading, setIsLoading] = useState(false);
  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport';
  const formik = useFormik({
    initialValues: RegisterAddVehicleValues,
    validationSchema: AddVehicleSchema,
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
              console.log(error);
              setIsLoading(false);
              ShowAddVehicleToast(false);
              setShowNewVehicleDetailsModal(true);
            } else {
              console.log(result.data);
              setIsLoading(false);
              setShowNewVehicleDetailsModal(false);
              ShowAddVehicleToast(true);
              ClearNewVehicle();
            }
          },
        );
      }
    },
  });

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
          DeleteUserByUserIdAndRole(
            currentVehicle.LicenseNumber,
            '2',
            (error: any) => {
              if (error) {
                console.error(error);
                ShowRemoveDriverToast(false);
              } else {
                GetBusinessVehicles(auth.GetBusinessId());
                setShowRemoveVehicleDialog(false);
                setShowVehicleDetailsModal(false);
                ShowRemoveDriverToast(true);
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
        console.error(error.response.data);
      } else {
        setVehicleList(result.data);
      }
    });
  };
  const ShowAddVehicleToast = (isSuccess: boolean) => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return isSuccess ? (
          <Toast nativeID={toastId} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>Vehicle successfully added..</ToastDescription>
            </VStack>
          </Toast>
        ) : (
          <Toast nativeID={toastId} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Failed</ToastTitle>
              <ToastDescription>
                An error has occurred. The vehicle was not added.
              </ToastDescription>
            </VStack>
          </Toast>
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

  const FabMenu = () => {
    return (
      <Menu
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={keys => {
          const selectedMenuItem: any = keys;
          if (selectedMenuItem.currentKey === 'AddNewVehicle') {
            navigation.navigate('BarcodeScanner');
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
          ? `(${driver.LicenseNumber})`
          : '';
        let dropDownLabel = driverName + vehicleLicenseNumber;
        driverDropDownList.push({label: dropDownLabel, value: index + 1});
      });
    }
    return driverDropDownList;
  };
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

  const ClearNewVehicle = () => {
    setCurrentVehicle({
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
    setVehicleFrontImage('');
    setVehicleRearImage('');
    setConfirmButtonTitle('Capture front');
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

  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      compressImageQuality: 0.7,
      showCropFrame: true,
      forceJpg: true,
    }).then(image => {
      if (!vehicleFrontImage) {
        GetFileBlob(image.path, async function (imageUrl: string) {
          setVehicleFrontImage(imageUrl);
          setCaptureImageAlertTitle('Successfully captured');
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
        });
      }
    });
  };

  const SetCurrentDriver = (vehicle: any, driverList: []) => {
    driverList.forEach((driver: any, index) => {
      if (vehicle.LicenseNumber === driver.LicenseNumber) {
        setCurrentDriverIndex(index);
      }
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      const CheckRouteParams = () => {
        if (route.params?.NewVehicle) {
        }
      };

      return () => CheckRouteParams();
    }, []),
  );

  useEffect(() => {
    if (route.params?.NewVehicle) {
      setShowCaptureImageAlert(true);
    }
    try {
      GetBusinessVehicles(auth.GetBusinessId());
      GetDrivers(auth.GetBusinessId());
    } catch (error) {
      console.error(error);
    }
    //setVehicleList(data);
  }, [auth, route.params?.NewVehicle]);

  return (
    <SafeAreaView style={{flex: 1}}>
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
              mt="$3"
              data={VehicleList}
              extraData={VehicleList}
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
                      : 'No driver linked.'
                  }
                  handleVehicleCardPress={() => {
                    SetCurrentDriver(item, driversList!);

                    setCurrentVehicle(item);
                    setShowVehicleDetailsModal(true);
                  }}
                />
              )}
              keyExtractor={(item: any) => item.VehicleId}
              refreshControl={
                <RefreshControl
                  refreshing={refreshingVehicles}
                  onRefresh={onRefreshDrivers}
                />
              }
            />
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshingVehicles}
                  onRefresh={onRefreshDrivers}
                />
              }>
              <Text>You currently have no drivers. Invite a driver.</Text>
            </ScrollView>
          )}
          <NewVehicleModal
            CurrentDriverIndex={0}
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
            DriverList={ConvertDriversListToDropDownList(driversList!)}
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
            CloseOtpModalButtonOnPress={() => {
              setShowNewVehicleDetailsModal(false);
              ClearNewVehicle();
              formik!!!.resetForm();
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
            CurrentDriverIndex={currentDriverIndex!}
            DriverList={ConvertDriversListToDropDownList(driversList!)}
            HandleSaveVehicle={() => {}}
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
            CloseOtpModalButtonOnPress={() => {
              setShowVehicleDetailsModal(false);
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
          ClearNewVehicle();
        }}
        HandleTakePicture={() => {
          if (vehicleFrontImage && vehicleRearImage) {
            setShowCaptureImageAlert(false);
            setShowNewVehicleDetailsModal(true);
          } else {
            OpenCamera();
          }
        }}
      />
      <FabMenu />
    </SafeAreaView>
  );
};
export default ManageVehiclesScreen;
