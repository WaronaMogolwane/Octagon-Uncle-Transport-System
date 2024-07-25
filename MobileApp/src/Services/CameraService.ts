import ImagePicker from 'react-native-image-crop-picker';

export const OpenCamera = (
  useFrontCamera: boolean,
  callback: (result: any, error: any) => void,
) => {
  ImagePicker.openCamera({
    width: 500,
    height: 500,
    cropping: true,
    compressImageQuality: 0.7,
    showCropFrame: true,
    forceJpg: true,
    useFrontCamera: useFrontCamera,
  })
    .then(image => {
      callback(image, null);
    })
    .catch(error => {
      callback(null, error);
    });
};

export const OpenFilePicker = (callback: (result: any, error: any) => void) => {
  ImagePicker.openPicker({
    width: 500,
    height: 500,
    cropping: true,
    compressImageQuality: 0.7,
    showCropFrame: true,
    forceJpg: true,
  })
    .then(image => {
      callback(image, null);
    })
    .catch(error => {
      callback(null, error);
    });
};
