import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../Const/colors';
import {TripCardParentStyles} from '../Stylesheets/GlobalStyles';

type PassengerParentCardCardProps = {
  firstName: string;
  lastName: string;
  isActive: boolean;
  onPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const PassengerParentCard = (props: PassengerParentCardCardProps) => {
  const tripStatus = () => {
    if (props.isActive == false) {
      return (
        <View>
          <Text style={{color: '#FF0000'}}>Not Active</Text>
        </View>
      );
    } else if (props.isActive == true) {
      return (
        <View>
          <Text style={{color: '#008000'}}>Active</Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={TripCardParentStyles.cardBorder}>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={{marginEnd: 10}}>{props.firstName}</Text>
          </View>
          <View>
            <Text style={{marginEnd: 10}}>{props.lastName}</Text>
          </View>
          <View>{tripStatus()}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
