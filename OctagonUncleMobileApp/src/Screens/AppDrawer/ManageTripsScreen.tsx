import {FlatList, RefreshControl, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {VehicleCard} from '../../Components/VehicleCard';
import {GetVehiclesAndDrivers} from '../../Controllers/VehicleController';

const ManageTripsScreen = ({navigation}: any) => {
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';

  const [vehicleList, setVehicleList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      //setRefreshing(true);

      GetVehiclesAndDrivers(businessId)
        .then(result => {
          console.log(result);
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

  const renderItemComponentVehicleInfo = (itemData: any) => (
    <VehicleCard
      registrationNumber={itemData.registrationNumber}
      make={itemData.make}
      model={itemData.model}
      color={itemData.color}
      fullName={itemData.fullName}
    />
  );

  return (
    <FlatList
      data={vehicleList}
      renderItem={({item}) => renderItemComponentVehicleInfo(item)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default ManageTripsScreen;
