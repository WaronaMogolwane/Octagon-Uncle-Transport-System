import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  memo,
} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {Text, SafeAreaView} from '@gluestack-ui/themed';

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

const DEBOUNCE_TIME = 1000; // 1 second debounce period

const NetworkProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [networkType, setNetworkType] = useState<NetInfoState['type'] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [manualRetryRequired, setManualRetryRequired] =
    useState<boolean>(false);
  const [isRetryLoading, setIsRetryLoading] = useState<boolean>(false);
  const [lastChecked, setLastChecked] = useState<number>(0);
  const forceShowBannerRef = useRef<boolean>(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    // Initial network state fetch
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

    // Network state listener with debouncing
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const newConnectedState = state.isConnected ?? false;

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        if (newConnectedState !== isConnected) {
          Logger.log('Network state updated after debounce:', {
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
      }, DEBOUNCE_TIME);
    });

    return () => {
      Logger.log('Unsubscribing from NetInfo listener');
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      unsubscribe();
    };
  }, [isConnected]);

  const handleRetry = async () => {
    setIsRetryLoading(true);
    const connected = await checkNetwork();
    setIsRetryLoading(false);
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
          <Text color="$black">No internet connection.</Text>
          <Text color="$black">
            Please check your connection and try again.
          </Text>
          {/* <Pressable
            onPress={handleRetry}
            disabled={isRetryLoading}
            px="$2"
            py="$1"
            bg={isRetryLoading ? '$gray300' : '$red700'}
            borderRadius="$sm"
            flexDirection="row"
            alignItems="center">
            {isRetryLoading ? (
              <Spinner size="small" color="$white" mr="$2" />
            ) : null}
            <Text color="$white" fontWeight="$bold">
              {isRetryLoading ? 'Retrying...' : 'Retry'}
            </Text>
          </Pressable> */}
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
