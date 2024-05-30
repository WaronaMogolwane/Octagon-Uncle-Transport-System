import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import React, {useState} from 'react';

import {TripCardDriverStyles} from '../../Stylesheets/GlobalStyles';

type tripCardProps = {
  passengerName: string;
  dropOffTime: string;
  pickUpTime: string;
  pickUpDate: string;
  pickUpLocation: string;
  tripStatus: number;
};

export const TripCardDriver = (props: tripCardProps) => {
  const tripStatus = () => {
    if (props.tripStatus == 0) {
      return (
        <Text style={TripCardDriverStyles.unCompletedTrip}>Uncompleted</Text>
      );
    } else if (props.tripStatus == 1) {
      return (
        <Text style={TripCardDriverStyles.unCompletedTrip}>Uncompleted</Text>
      );
    } else if (props.tripStatus == 2) {
      return <Text style={TripCardDriverStyles.pickedUp}>Picked Up</Text>;
    } else if (props.tripStatus == 3) {
      return <Text style={TripCardDriverStyles.completedTrip}>Completed</Text>;
    }
  };

  return (
    <View style={TripCardDriverStyles.cardBorder}>
      <View style={TripCardDriverStyles.cardContainer}>{tripStatus()}</View>
      <View style={TripCardDriverStyles.cardContainer}>
        <View style={{marginEnd: 5}}>
          <Text style={TripCardDriverStyles.cardText}>Passenger:</Text>
        </View>
        <View>
          <Text>{props.passengerName}</Text>
        </View>
      </View>
      {props.pickUpTime == '' ||
      props.pickUpTime == undefined ||
      props.pickUpTime == null ? null : (
        <View style={TripCardDriverStyles.cardContainer}>
          <Text style={TripCardDriverStyles.cardText}>Pickup Time: </Text>
          <Text style={{marginEnd: 20}}>{props.pickUpTime}</Text>
        </View>
      )}
      {props.pickUpTime == '' ||
      props.pickUpTime == undefined ||
      props.pickUpTime == null ? null : (
        <View style={TripCardDriverStyles.cardContainer}>
          <Text style={TripCardDriverStyles.cardText}>Dropoff Time: </Text>
          <Text style={{marginEnd: 20}}>{props.dropOffTime}</Text>
        </View>
      )}
      <View style={TripCardDriverStyles.cardContainer}>
        <Text style={TripCardDriverStyles.cardText}>Pickup Date: </Text>
        <Text>{props.pickUpDate}</Text>
      </View>
      <View style={TripCardDriverStyles.cardContainer}>
        <Text style={TripCardDriverStyles.cardText}>Location:</Text>
      </View>
      <View>
        <Text>{props.pickUpLocation}</Text>
      </View>
    </View>
  );
};
