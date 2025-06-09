import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  memo,
} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {Box, Text, SafeAreaView, View, Button} from '@gluestack-ui/themed';
import {ActivityIndicator} from 'react-native';
import {CustomButton1} from '../Components/Buttons';

const Logger = {
  log: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.error(...args),
};

interface NetworkContextType {
  isConnected: boolean;
  networkType: NetInfoState['type'] | null;
  isLoading: boolean;
  checkNetwork: () => Promise<boolean>;
}

const NetworkContext = createContext<NetworkContextType>({
  isConnected: true,
  networkType: null,
  isLoading: true,
  checkNetwork: async () => true,
});

const NetworkProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isCheckingNetwork, setIsCheckingNetwork] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [networkType, setNetworkType] = useState<NetInfoState['type'] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [manualRetryRequired, setManualRetryRequired] =
    useState<boolean>(false);
  const [lastChecked, setLastChecked] = useState<number>(0);
  const forceShowBannerRef = useRef<boolean>(false);

  const checkNetwork = async (): Promise<boolean> => {
    const now = Date.now();
    if (now - lastChecked < 1000) {
      Logger.log('Network check debounced:', {isConnected, type: networkType});
      return isConnected;
    }
    try {
      const state = await NetInfo.fetch();
      const connected = state.isConnected ?? false;
      if (connected !== isConnected) {
        Logger.log('Network check:', {
          isConnected: connected,
          type: state.type,
        });
      }
      setIsConnected(connected);
      setNetworkType(state.type);
      setLastChecked(now);
      if (connected) {
        setManualRetryRequired(false);
        forceShowBannerRef.current = false;
      } else {
        setManualRetryRequired(true);
        forceShowBannerRef.current = true;
      }
      return connected;
    } catch (error) {
      Logger.error('Error checking network:', error);
      setIsConnected(false);
      setManualRetryRequired(true);
      forceShowBannerRef.current = true;
      setLastChecked(now);
      return false;
    }
  };

  useEffect(() => {
    NetInfo.fetch()
      .then(state => {
        const newConnectedState = state.isConnected ?? false;
        Logger.log('Initial network state:', {
          isConnected: newConnectedState,
          type: state.type,
        });
        setIsConnected(newConnectedState);
        setNetworkType(state.type);
        setManualRetryRequired(!newConnectedState);
        forceShowBannerRef.current = !newConnectedState;
        setLastChecked(Date.now());
        setIsLoading(false);
      })
      .catch(error => {
        Logger.error('Error fetching initial network state:', error);
        setIsConnected(false);
        setManualRetryRequired(true);
        forceShowBannerRef.current = true;
        setLastChecked(Date.now());
        setIsLoading(false);
      });

    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const newConnectedState = state.isConnected ?? false;
      if (newConnectedState !== isConnected) {
        Logger.log('Network state updated:', {
          isConnected: newConnectedState,
          type: state.type,
        });
        setIsConnected(newConnectedState);
        setNetworkType(state.type);
        setLastChecked(Date.now());
        if (newConnectedState) {
          setManualRetryRequired(false);
          forceShowBannerRef.current = false;
        } else {
          forceShowBannerRef.current = true;
        }
      }
    });

    return () => {
      Logger.log('Unsubscribing from NetInfo listener');
      unsubscribe();
    };
  }, [isConnected]);

  // const handleRetry = async () => {
  //   setIsCheckingNetwork(true);
  //   const connected = await checkNetwork();
  //   setIsCheckingNetwork(false);
  //   if (!connected) {
  //     forceShowBannerRef.current = true;
  //   }
  // };

  return (
    <NetworkContext.Provider
      value={{isConnected, networkType, isLoading, checkNetwork}}>
      {isLoading ? (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '$white',
          }}>
          <Text color="$black">Checking network...</Text>
        </SafeAreaView>
      ) : isConnected ? (
        children
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '$white',
          }}>
          {isCheckingNetwork ? (
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff75',
                zIndex: 100,
              }}>
              <ActivityIndicator size="large" />
              <Text>Working</Text>
            </View>
          ) : null}
          <Text color="$black">No internet connection.</Text>
          <Text color="$black">
            Please check your connection and try again.
          </Text>
        </SafeAreaView>
      )}
    </NetworkContext.Provider>
  );
};

export const useNetwork = (): NetworkContextType => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};

export default memo(NetworkProvider);
