import {Text, View} from 'react-native';
import React from 'react';
import COLORS from '../Const/colors';
import {TripCardParentStyles} from '../Stylesheets/GlobalStyles';

type tripCardProps = {
  driverName: string;
  pickUpTime: string;
  pickUpDate: string;
  passengerName: string;
  pickUpLocation: string;
  isSuccess: number;
};

export const TripCardParent = (props: tripCardProps) => {
  const tripCompletion = () => {
    if (props.isSuccess == 0) {
      return null;
    } else if (props.isSuccess == 1) {
      return (
        <Text style={{color: COLORS.red, fontWeight: 'bold'}}>Uncompleted</Text>
      );
    } else if (props.isSuccess == 2) {
      return (
        <Text style={{color: COLORS.green, fontWeight: 'bold'}}>Completed</Text>
      );
    }
  };

  return (
    <View style={TripCardParentStyles.cardBorder}>
      <View style={TripCardParentStyles.cardContainer}>{tripCompletion()}</View>
      <View style={TripCardParentStyles.cardContainer}>
        <View style={{marginEnd: 5}}>
          <Text style={TripCardParentStyles.cardText}>Driver:</Text>
        </View>
        <View>
          <Text>{props.driverName}</Text>
        </View>
      </View>
      <View style={TripCardParentStyles.cardContainer}>
        <Text style={TripCardParentStyles.cardText}>Pickup Time:</Text>
        <Text style={{marginEnd: 20}}>{props.pickUpTime}</Text>
      </View>
      <View style={TripCardParentStyles.cardContainer}>
        <Text style={TripCardParentStyles.cardText}>Pickup Date:</Text>
        <Text>{props.pickUpDate}</Text>
      </View>
      <View style={TripCardParentStyles.cardContainer}>
        <View style={{marginEnd: 5}}>
          <Text style={TripCardParentStyles.cardText}>Passenger:</Text>
        </View>
        <View>
          <Text>{props.passengerName}</Text>
        </View>
      </View>
      <View style={TripCardParentStyles.cardContainer}>
        <Text style={TripCardParentStyles.cardText}>Location:</Text>
      </View>
      <View>
        <Text>{props.pickUpLocation}</Text>
      </View>
    </View>
  );
};
