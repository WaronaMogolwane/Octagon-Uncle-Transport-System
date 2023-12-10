import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {randomData} from '../../randomData/SampleData';
import {TripCard} from '../../Components/TripCard';
import {CustomButton1} from '../../Components/Buttons';
import {GetAllTripsForClient} from '../../Controllers/TripController';

const TripsScreen = ({navigation}: any) => {
  const payerId = 'c7728615-394f-466b-833e-ea9dd60ba836';
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';
  let data: any[] = [];

  const [tripList, setTripList] = useState([]);

  const getTrips = async () => {
    await GetAllTripsForClient(payerId, businessId).then((...response: any) => {
      data = response;
      //console.log(data);
    });
  };

  useEffect(() => {
    getTrips();
    //setTripList(data);
  }, []);

  const pressedButton = async () => {
    let r = await GetAllTripsForClient(payerId, businessId);
    //console.log(r);
    //result = r;
  };

  const Tab = createMaterialTopTabNavigator();

  function FirstRoute() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={tripList}
          renderItem={({item}) => renderItemComponent(item)}
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
