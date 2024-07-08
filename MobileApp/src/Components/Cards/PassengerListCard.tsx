import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../../Const/colors';
import {TripCardParentStyles} from '../../Stylesheets/GlobalStyles';

type passengerCardProps = {
  passengerName: string;
  age: string;
  pickUpLocation: string;
  dropOffLocation: string;
  onPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const PassengerCard = (props: passengerCardProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={TripCardParentStyles.cardBorder}>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>Passenger Name: </Text>
          </View>
          <View>
            <Text style={{padding: 1}}>{props.passengerName}</Text>
          </View>
        </View>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>Passenger Age: </Text>
          </View>
          <View>
            <Text style={{padding: 1}}>{props.age}</Text>
          </View>
        </View>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>Location: </Text>
          </View>
          <View>
            <Text style={{padding: 2}}>{props.pickUpLocation}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
