import AsyncStorage from '@react-native-async-storage/async-storage';

export const StartTrip = async () => {
  let isStarted: boolean = false;

  try {
    const value = await AsyncStorage.getItem('isTripStarted');
    if (value !== null) {
      //The trip has started
    } else {
      try {
        await AsyncStorage.setItem('isTripStarted', 'true');
        isStarted = true;
      } catch (e) {
        // saving error
        console.error('There was an error saving the trip via async: ' + e);
      }
    }
  } catch (e) {
    // error reading value
    console.error(
      'There was an retrieving the state of the trip via async: ' + e,
    );
  }

  return isStarted;
};

export const EndTrip = async () => {
  let isStarted: boolean = true;

  try {
    const value = await AsyncStorage.getItem('isTripStarted');
    if (value !== null) {
      // value previously stored

      try {
        await AsyncStorage.setItem('isTripStarted', 'false');
        isStarted = false;
      } catch (e) {
        // saving error
        console.error(
          'There was an error saving the state of the trip via async: ' + e,
        );
      }
    }
  } catch (e) {
    // error reading value
    console.error(
      'There was an retrieving the state of the trip via async: ' + e,
    );
  }
  return isStarted;
};

export const CheckTrip = async () => {
  let isStarted: boolean = false;

  try {
    const value = await AsyncStorage.getItem('isTripStarted');
    if (value !== null) {
      //The trip has started
      isStarted = true;
    }
  } catch (e) {
    // error reading value
    console.error('There was an retrieving the trip status via async: ' + e);
  }

  return isStarted;
};
