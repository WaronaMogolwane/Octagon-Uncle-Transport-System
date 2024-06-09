import React, {useContext, useEffect, useState} from 'react';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {CustomButton1} from '../../Components/Buttons';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Auth} from '../../Classes/Auth';
import {setGlobalState} from '../../State';
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {StyleSheet, View} from 'react-native';
import {Box, Heading, Text} from '@gluestack-ui/themed';
import {BarcodeScannerProps} from '../../Props/CameraProps';
import {Vehicle} from '../../Models/VehicleModel';
import {NavigationProp} from '@react-navigation/native';

const BarcodeScanner = ({navigation, route}: any) => {
  const [cameraPermission, setCameraPermission] = useState<any>();
  const [codeIsScanned, setCodeIsScanned] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState();

  const codeScanner = useCodeScanner({
    codeTypes: ['codabar', 'pdf-417'],
    onCodeScanned: codes => {
      if (!codeIsScanned) {
        let vehicleInfo: any = codes[0].value?.split('%');
        const newVehicle: Vehicle = {
          LicenseNumber: vehicleInfo[6],
          RegistratonNumber: vehicleInfo[7],
          Make: vehicleInfo[9],
          Model: vehicleInfo[10],
          Description: vehicleInfo[8].split(' / ')[0],
          Colour: vehicleInfo[11].split(' / ')[0],
          Vin: vehicleInfo[12],
          EngineNumber: vehicleInfo[13],
          DateCreated: Date.now().toString(),
        };
        navigation.navigate({
          name: 'Manage Vehicles',
          params: {NewVehicle: newVehicle},
          merge: true,
        });
      }
    },
  });

  const devices = useCameraDevices();
  const cameraDevice = useCameraDevice('back');

  useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus);
    })();
  });
  if (cameraDevice == null) return <Text>No Camera</Text>;
  return (
    <View
      style={
        (StyleSheet.absoluteFill,
        {
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          zIndex: 2,
          height: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          width: '100%',
          display: 'flex',
        })
      }>
      <View
        style={{marginVertical: 'auto', width: '100%', position: 'relative'}}>
        <Camera
          style={{zIndex: 3, height: '90%'}}
          device={cameraDevice}
          isActive={true}
          codeScanner={codeScanner}
        />
        <Heading style={{zIndex: 4, width: '100%', textAlign: 'center'}}>
          Scan your license disk
        </Heading>
        <Text style={{width: '100%', textAlign: 'center'}}>
          Please ensure the barcode is visible.
        </Text>
      </View>
    </View>
  );
};

export default BarcodeScanner;
