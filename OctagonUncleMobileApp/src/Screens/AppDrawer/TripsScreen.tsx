import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TripCard} from '../../Components/TripCard';
import {CustomButton1} from '../../Components/Buttons';
import {GetAllTripsForClient} from '../../Controllers/TripController';

const TripsScreen = ({navigation}: any) => {
  const [tripList, setTripList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const payerId = 'c7728615-394f-466b-833e-ea9dd60ba836';
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    pressedButton();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    pressedButton();
  }, []);

  const pressedButton = async () => {
    await GetAllTripsForClient(payerId, businessId).then(trip => {
      setTripList(trip);
    });
  };

  const Tab = createMaterialTopTabNavigator();

  function FirstRoute() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={tripList}
          renderItem={({item}) => renderItemComponent(item)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    );
  }

  function SecondRoute() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#673ab7',
        }}>
        <CustomButton1
          onPress={() => navigation.goBack()}
          title="Go back home"
        />
        <CustomButton1
          onPress={pressedButton}
          title="Get all trips for parent"
        />
      </View>
    );
  }

  const renderItemComponent = (itemData: any) => (
    <TripCard
      driverName={itemData.driverName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      passengerName={itemData.passengerName}
      pickUpLocation={itemData.pickUpLocation}
    />
  );

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Upcoming Trps" component={FirstRoute} />
        <Tab.Screen name="Past Trips" component={SecondRoute} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TripsScreen;
