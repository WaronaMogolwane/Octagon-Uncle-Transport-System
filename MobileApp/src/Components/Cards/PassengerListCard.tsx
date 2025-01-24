import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  PassengerListCardStyles,
  TripCardParentStyles,
} from '../../Stylesheets/GlobalStyles';
import {UserRound} from 'lucide-react-native';

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

export const PassengerCardTwo = (props: passengerCardProps) => {
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

export const PassengerCard = (props: passengerCardProps) => {
  const iconSize = 60;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  const userIcon = (
    <UserRound
      style={PassengerListCardStyles.passengerImage}
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={iconColor}
    />
  );

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={PassengerListCardStyles.passengerItem}>
        {userIcon}
        <View style={PassengerListCardStyles.parentInfo}>
          <Text style={PassengerListCardStyles.passengerName}>
            {props.passengerName}
          </Text>

          <Text style={PassengerListCardStyles.age}>
            {props.age} years old.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
