import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Heading, Text} from '@gluestack-ui/themed';
import {AuthContext} from '../../Services/AuthenticationService';
import {Auth} from '../../Classes/Auth';
import {Vehicle} from '../../Models/VehicleModel';

const BarcodeScanner = ({navigation, route}: any) => {
  const context = useContext(AuthContext);

  // Provide a fallback object in case context is null
  const session = context?.session || ''; // Default to an empty string if session is null
  const [auth] = useState(new Auth(session));

  const [codeIsScanned, setCodeIsScanned] = useState(false);
  const [cameraIsActive, setCameraIsActive] = useState(true);

  const codeScanner = useCodeScanner({
    codeTypes: ['codabar', 'pdf-417'],
    onCodeScanned: codes => {
      if (!codeIsScanned && codes.length > 0) {
        const vehicleInfo = codes[0].value?.split('%') || [];
        const newVehicle: Vehicle = {
          LicenseNumber: vehicleInfo[6] || '',
          RegistrationNumber: vehicleInfo[7] || '',
          Make: vehicleInfo[9] || '',
          Model: vehicleInfo[10] || '',
          Description: vehicleInfo[8]?.split(' / ')[0] || '',
          Colour: vehicleInfo[11]?.split(' / ')[0] || '',
          Vin: vehicleInfo[12] || '',
          EngineNumber: vehicleInfo[13] || '',
          DateCreated: Date.now().toString(),
          BusinessId: auth.GetBusinessId(),
        };
        setCodeIsScanned(true); // Prevent further scans
        setCameraIsActive(false);
        navigation.navigate('Manage Vehicles', {
          NewVehicle: newVehicle,
          IsReScan: route.params.IsReScan,
        });
      }
    },
  });

  const devices = useCameraDevices();
  const cameraDevice = useCameraDevice('back');

  if (!cameraDevice) return <Text style={styles.errorText}>No Camera</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          device={cameraDevice}
          isActive={cameraIsActive}
          codeScanner={codeScanner}
        />
        <Heading style={styles.heading}>Scan your license disk</Heading>
        <Text style={styles.instructionText}>
          Please ensure the barcode is visible.
        </Text>
      </View>
    </View>
  );
};

export default BarcodeScanner;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    display: 'flex',
    zIndex: 2,
  },
  cameraContainer: {
    marginVertical: 'auto',
    width: '100%',
    position: 'relative',
  },
  camera: {
    zIndex: 3,
    height: '90%',
  },
  heading: {
    zIndex: 4,
    width: '100%',
    textAlign: 'center',
  },
  instructionText: {
    width: '100%',
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    color: 'red',
    fontSize: 16,
  },
});
