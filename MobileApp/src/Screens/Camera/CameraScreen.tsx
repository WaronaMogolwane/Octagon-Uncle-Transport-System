import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@gluestack-ui/themed';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';

const CameraScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const [cameraPermission, setCameraPermission] = useState<
    string | undefined
  >();
  const [codeIsScanned, setCodeIsScanned] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState<any>();
  const [photo, setPhoto] = useState<any>();
  const cameraDevice = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  const TakePicture = async () => {
    if (camera.current) {
      try {
        const file = await camera.current.takePhoto();
        console.log(file.path);

        // Optional: Fetch and log the blob data, if required
        const result = await fetch(`file://${file.path}`);
        const data = await result.blob();

        // Uncomment the following if photo cropping is needed
        // CropPhoto(file.path);

        OpenCamera(); // Opens camera for additional action
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const CropPhoto = (filePath: string) => {
    ImagePicker.openCropper({
      mediaType: 'photo',
      path: filePath,
      width: 400,
      height: 400,
    })
      .then(image => console.log(image))
      .catch(error => console.error('Error cropping photo:', error));
  };

  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => console.log(image))
      .catch(error => console.error('Error opening camera:', error));
  };

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const cameraPermissionStatus = await Camera.requestCameraPermission();
        setCameraPermission(cameraPermissionStatus);
        console.log('Camera Permission:', cameraPermissionStatus);
      } catch (error) {
        console.error('Error requesting camera permission:', error);
      }
    };

    requestCameraPermission();
  }, []);

  if (!cameraDevice) {
    return <Text style={styles.errorText}>No Camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Camera Screen</Text>
      {/* Add Camera View or UI elements here */}
    </View>
  );
};

export default CameraScreen;

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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    color: 'red',
    fontSize: 16,
  },
});
