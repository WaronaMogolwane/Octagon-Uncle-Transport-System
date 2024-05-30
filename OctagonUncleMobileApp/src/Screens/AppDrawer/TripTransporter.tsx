import {FlatList, RefreshControl} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {VehicleCard} from '../../Components/Cards/LinkedVehicleListCard';
import {GetVehiclesAndDrivers} from '../../Controllers/VehicleController';
import {Auth} from '../../Classes/Auth';
import {AuthContext} from '../../Services/AuthenticationService';

const TripTransporter = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const businessId = auth.GetBusinessId();

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
      onPress={() => {
        navigation.navigate('Assign Passenger', {
          vehicleId: itemData.vehicleId,
        });
      }}
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

export default TripTransporter;
