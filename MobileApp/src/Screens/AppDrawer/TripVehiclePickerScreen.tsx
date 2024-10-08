import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {VehicleCard} from '../../Components/Cards/LinkedVehicleListCard';
import {GetVehiclesAndDrivers} from '../../Controllers/VehicleController';
import {Auth} from '../../Classes/Auth';
import {AuthContext} from '../../Services/AuthenticationService';
import {
  useToast,
  Toast,
  VStack,
  ToastTitle,
  ToastDescription,
  Fab,
  FabIcon,
  FabLabel,
  Input,
} from '@gluestack-ui/themed';
import {ArrowLeftIcon} from 'lucide-react-native';
import {FlatlistStyles} from '../../Stylesheets/GlobalStyles';
import {SearchBar} from 'react-native-screens';
import filter from 'lodash.filter';

const TripTransporter = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const businessId = auth.GetBusinessId();
  const toast = useToast();

  const [vehicleList, setVehicleList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [noLinkedVehicle, setNoLinkedVehicle] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setNoLinkedVehicle(false);

    setTimeout(() => {
      //setRefreshing(true);
      GetLinkedVehicle();
    }, 2000);

    setRefreshing(false);
  }, []);

  useEffect(() => {
    setRefreshing(true);
    GetLinkedVehicle();
  }, []);

  const ShowToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="attention" variant="solid">
            <VStack space="xs">
              <ToastTitle>Select Vehicle</ToastTitle>
              <ToastDescription>
                Please a select a vehicle to contine.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const GetLinkedVehicle = async () => {
    await GetVehiclesAndDrivers(businessId)
      .then(result => {
        if (result.length == 0) {
          setNoLinkedVehicle(true);
          setRefreshing(false);
        } else {
          ShowToast();
          setVehicleList(result);
          setFullData(result);
          setRefreshing(false);
          setNoLinkedVehicle(false);
        }
      })
      .catch(() => {
        setRefreshing(false);
      });
  };

  const renderItemComponentVehicleInfo = (itemData: any) => (
    <VehicleCard
      registrationNumber={itemData.licenseNumber}
      make={itemData.make}
      model={itemData.model}
      color={itemData.color}
      fullName={itemData.fullName}
      onPress={() => {
        navigation.navigate('Transport Trip', {
          vehicleId: itemData.vehicleId,
        });
      }}
    />
  );

  const EmtpyFlatListText = () => {
    return (
      <View style={{backgroundColor: '#e8f0f3'}}>
        <Text style={{textAlign: 'center'}}>
          You currently have no linked vehicles. Please add vehicles and try
          again.
        </Text>
      </View>
    );
  };

  const GoBackFab = () => {
    return (
      <Fab
        onPress={() => {
          navigation.goBack();
        }}
        size="sm"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}>
        <FabIcon as={ArrowLeftIcon} mr="$1" />
        <FabLabel>Back</FabLabel>
      </Fab>
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filterData: any = filter(fullData, (user: any) => {
      return contains(user, formattedQuery);
    });

    setVehicleList(filterData);
  };

  const contains = (
    {color, fullName, licenseNumber, make, model}: any,
    query: any,
  ) => {
    if (
      color.toLowerCase().includes(query) ||
      fullName.toLowerCase().includes(query) ||
      licenseNumber.toLowerCase().includes(query) ||
      make.toLowerCase().includes(query) ||
      model.toLowerCase().includes(query)
    ) {
      return true;
    }

    return false;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        autoCapitalize="none"
        style={styles.searchBox}
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query: string) => handleSearch(query)}
      />

      {noLinkedVehicle ? EmtpyFlatListText() : null}
      <FlatList
        style={{backgroundColor: '#e8f0f3'}}
        data={vehicleList}
        renderItem={({item}) => renderItemComponentVehicleInfo(item)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <View>{GoBackFab()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    marginHorizontal: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default TripTransporter;
