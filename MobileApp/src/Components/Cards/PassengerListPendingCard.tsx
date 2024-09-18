import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../../Const/colors';
import {
  PassengerListActiveCardStyles,
  TripCardParentStyles,
} from '../../Stylesheets/GlobalStyles';

type pendingPassengerListCardProps = {
  passengerName: string;
  parentName: string;
  reason: string;
  isActive: boolean;
  onPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};
const PassengerListPendingCard = (props: pendingPassengerListCardProps) => {
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
            <Text style={TripCardParentStyles.cardText}>Parent Name: </Text>
          </View>
          <View>
            <Text style={{padding: 1}}>{props.parentName}</Text>
          </View>
        </View>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>Reason: </Text>
          </View>
          <View>
            <Text style={{padding: 1}}>{props.reason}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PassengerListPendingCard;
