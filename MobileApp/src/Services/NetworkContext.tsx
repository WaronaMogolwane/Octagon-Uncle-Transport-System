import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  memo,
} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {Box, Text, SafeAreaView} from '@gluestack-ui/themed';

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

const OfflineBanner: React.FC<{onRetry: () => void}> = ({onRetry}) => {
  return (
    <SafeAreaView
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000000,
      }}>
      <Box
        bg="$red500"
        px="$4"
        py="$2"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        shadowColor="$black"
        shadowOffset={{width: 0, height: 2}}
        shadowOpacity={0.3}
        shadowRadius={4}>
        <Text color="$white" fontWeight="$bold" fontSize="$md">
          No Internet Connection.
        </Text>
        <Text
          color="$white"
          fontWeight="$bold"
          onPress={onRetry}
          px="$2"
          py="$1"
          bg="$red700"
          borderRadius="$sm">
          Retry
        </Text>
      </Box>
    </SafeAreaView>
  );
};

const NetworkProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
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

  const handleRetry = async () => {
    setIsLoading(true);
    const connected = await checkNetwork();
    setIsLoading(false);
    if (!connected) {
      forceShowBannerRef.current = true;
    }
  };

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
      ) : (
        <>
          {(forceShowBannerRef.current ||
            manualRetryRequired ||
            !isConnected) && <OfflineBanner onRetry={handleRetry} />}
          {children}
        </>
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
