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

type activePassengerListCardProps = {
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
const PassengerListAllCard = (props: activePassengerListCardProps) => {
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
            <Text style={TripCardParentStyles.cardText}>
              Pick-up Location:{' '}
            </Text>
          </View>
          <View>
            <Text style={{padding: 1}}>{props.pickUpLocation}</Text>
          </View>
        </View>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>Active Status:</Text>
          </View>
          <View>
            {props.isActive ? (
              <Text style={PassengerListActiveCardStyles.activeText}>
                Active
              </Text>
            ) : (
              <Text style={PassengerListActiveCardStyles.inactiveText}>
                Inactive
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PassengerListAllCard;
