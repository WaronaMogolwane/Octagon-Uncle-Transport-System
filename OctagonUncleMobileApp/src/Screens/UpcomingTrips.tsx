import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {randomData} from '../randomData/SampleData';
import {TripCard} from '../Components/TripCard';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

export const UpcomingTrips = ({navigation}: any) => {
  const Tab = createMaterialTopTabNavigator();

  function FirstRoute() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={randomData}
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
        <Text>Settings!</Text>
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
