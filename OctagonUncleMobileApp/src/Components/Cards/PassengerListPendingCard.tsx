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
  pickUpLocation: string;
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
          <Text style={{padding: 1}}>{props.passengerName}</Text>
          <Text style={{padding: 1}}>({props.pickUpLocation})</Text>
          {props.isActive ? (
            <Text style={PassengerListActiveCardStyles.activeText}>Active</Text>
          ) : (
            <Text style={PassengerListActiveCardStyles.activeText}>
              Inactive
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PassengerListPendingCard;
