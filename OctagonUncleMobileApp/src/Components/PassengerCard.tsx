import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../Const/colors';
import {TripCardParentStyles} from '../Stylesheets/GlobalStyles';

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
          <Text style={{padding: 1}}>{props.passengerName}</Text>
          <Text style={{padding: 1}}>({props.age})</Text>
          <Text style={{padding: 2}}>{props.pickUpLocation}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
