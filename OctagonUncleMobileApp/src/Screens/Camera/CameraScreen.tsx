import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {Circle} from 'lucide-react-native';
import ImagePicker from 'react-native-image-crop-picker';

const CameraScreen = ({navigation, route}: any) => {
  const [cameraPermission, setCameraPermission] = useState<any>();
  const [codeIsScanned, setCodeIsScanned] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState();
  const [photo, setPhoto] = useState();
  const cameraDevice = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const TakePicture = async () => {
    if (camera.current) {
      const file = await camera.current.takePhoto();
      const result = await fetch(`file://${file.path}`);
      const data = await result.blob();
      console.log(file.path);
      //CropPhoto(file.path);
      OpenCamera();
    }
  };

  const CropPhoto = (filePath: string) => {
    ImagePicker.openCropper({
      mediaType: 'photo',
      path: filePath,
      width: 400,
      height: 400,
    }).then(image => {
      console.log(image);
    });
  };
  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };
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
      }></View>
  );
};

export default CameraScreen;
