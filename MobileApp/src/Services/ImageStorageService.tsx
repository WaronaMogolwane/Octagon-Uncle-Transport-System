import AsyncStorage from '@react-native-async-storage/async-storage';

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
