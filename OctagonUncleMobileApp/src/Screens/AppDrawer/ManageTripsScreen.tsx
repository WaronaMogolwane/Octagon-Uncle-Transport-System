import {FlatList, RefreshControl, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {VehicleCard} from '../../Components/VehicleCard';
import {GetVehiclesAndDrivers} from '../../Controllers/VehicleController';
import {
  useToast,
  Toast,
  VStack,
  ToastDescription,
  ToastTitle,
} from '@gluestack-ui/themed';
import {useGlobalState} from '../../State';

const ManageTripsScreen = ({navigation}: any) => {
  const businessId = '625d7d9d-bc30-4e33-a775-95d066d6ac7c';
  //const [businessId, x] = useGlobalState('businessId');

  const toast = useToast();

  const [vehicleList, setVehicleList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      //setRefreshing(true);

      GetVehiclesAndDrivers(businessId)
        .then(result => {
          setVehicleList(result);
          setRefreshing(false);
        })
        .catch(() => {
          setRefreshing(false);
        });
    }, 2000);

    setRefreshing(false);
  }, []);

  useEffect(() => {
    ShowToast();
    setRefreshing(true);

    setTimeout(() => {
      GetVehiclesAndDrivers(businessId)
        .then(result => {
          setVehicleList(result);
          setRefreshing(false);
        })
        .then(() => {
          setRefreshing(false);
        });
    }, 2000);
    setRefreshing(false);
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

  const renderItemComponentVehicleInfo = (itemData: any) => (
    <VehicleCard
      registrationNumber={itemData.registrationNumber}
      make={itemData.make}
      model={itemData.model}
      color={itemData.color}
      fullName={itemData.fullName}
      onPress={() => {
        navigation.navigate('Assign Passenger', {
          vehicleId: itemData.vehicleId,
        });
      }}
    />
  );

  return (
    <View>
      <FlatList
        data={vehicleList}
        renderItem={({item}) => renderItemComponentVehicleInfo(item)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ManageTripsScreen;
