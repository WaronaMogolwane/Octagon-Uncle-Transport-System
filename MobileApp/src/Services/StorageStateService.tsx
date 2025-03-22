import * as React from 'react';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null,
    ): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        await AsyncStorage.removeItem(key);
      } else {
        AsyncStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();
  // Get

  const UseStorage = async (stateKey: any) => {
    await AsyncStorage.getItem(stateKey)
      .then(value => {
        setState(value);
      })
      .catch(error => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    UseStorage(key);
  }, [key]);

  // Set
  const setValue = React.useCallback(
    async (value: string | null) => {
      await setStorageItemAsync(key, value).then(() => {
        setState(value);
      });
    },
    [key],
  );

  return [state, setValue];
}

export const SaveTokens = async (accessToken: string, refreshToken: string) => {
  try {
    await EncryptedStorage.setItem('accessToken', accessToken);
    await EncryptedStorage.setItem('refreshToken', refreshToken);
    console.log('Tokens saved securely!');
  } catch (error) {
    console.error('Error saving tokens:', error);
  }
};
export const FetchAccessToken = async () => {
  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    if (accessToken) {
      return accessToken;
    }
    console.log('Access token not found.');
    return null;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};
