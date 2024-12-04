import AsyncStorage from '@react-native-async-storage/async-storage';

export const RestoreImageViaAsyncStorage = async () => {
  let image: string = '';
  try {
    const value = await AsyncStorage.getItem('profileImage');
    if (value !== null) {
      // value previously stored
      image = value;
    }
  } catch (e) {
    // error reading value
    console.error(
      'There was an error retrieving the image path via async: ' + e,
    );
  }
  return image;
};

export const SaveImageViaAsyncStorage = async (imageUri: string) => {
  try {
    await AsyncStorage.setItem('profileImage', imageUri);
  } catch (e) {
    // saving error
    console.error('There was an error saving the image path via async: ' + e);
  }
};

export const ClearImageViaAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem('profileImage');
  } catch (e) {
    // remove error
    console.error('There was an error clearing the image path via async: ' + e);
  }
};
