import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

export const RestoreImageViaAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('profileImage');
    return value ?? '';
  } catch (e) {
    // error reading value
    console.error(
      'There was an error retrieving the image path via async: ' + e,
    );
    return '';
  }
};

export const SaveImageViaAsyncStorage = async (imageUri: string) => {
  if (imageUri) {
    try {
      await AsyncStorage.setItem('profileImage', imageUri);
    } catch (e) {
      // saving error
      console.error('There was an error saving the image path via async: ' + e);
    }
  } else {
    console.log('Image path is empty');
  }
};

export const ClearImageViaAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem('profileImage');
    console.log('Image path cleared successfully');
  } catch (e) {
    // remove error
    console.error('There was an error clearing the image path via async: ' + e);
  }
};

export const SaveImage = async (imageUrl: string) => {
  // const imageUrl = 'https://example.com/your-image.jpg'; // Replace with your image URL
  const downloadDest = `${RNFS.DocumentDirectoryPath}/profile_image.jpg`;

  try {
    // Check if file already exists
    const fileExists = await RNFS.exists(downloadDest);

    // If file exists, delete it
    if (fileExists) {
      await RNFS.unlink(downloadDest);
      console.log('Old image deleted:', downloadDest);
    }

    // Download and save the new image
    const downloadResponse = await RNFS.downloadFile({
      fromUrl: imageUrl,
      toFile: downloadDest,
    }).promise;

    if (downloadResponse.statusCode === 200) {
      console.log('Image saved successfully:', downloadDest);
    } else {
      console.log('Failed to save image:', downloadResponse.statusCode);
    }
  } catch (err) {
    console.log('Error saving image:', err);
  }
};

export const DeleteImage = async () => {
  const downloadDest = `${RNFS.DocumentDirectoryPath}/profile_image.jpg`;

  try {
    // Check if file already exists
    const fileExists = await RNFS.exists(downloadDest);

    // If file exists, delete it
    if (fileExists) {
      await RNFS.unlink(downloadDest);
      console.log('Image deleted:', downloadDest);
    }
  } catch (err) {
    console.log('Error saving image:', err);
  }
};
