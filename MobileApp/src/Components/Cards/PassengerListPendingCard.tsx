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
  PendingPassengerListCardStyles,
  TripCardParentStyles,
} from '../../Stylesheets/GlobalStyles';
import {Image} from '@gluestack-ui/themed';

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
      <View style={PendingPassengerListCardStyles.passengerItem}>
        <Image
          source={require('../../Images/default_avatar_image.jpg')}
          style={PendingPassengerListCardStyles.passengerImage}
          alt="passenger image avatar"
        />
        <View style={PendingPassengerListCardStyles.parentInfo}>
          <Text style={PendingPassengerListCardStyles.passengerName}>
            {props.passengerName}
          </Text>
          <Text style={PendingPassengerListCardStyles.parentName}>
            {props.parentName}
          </Text>
          <Text style={PendingPassengerListCardStyles.deleteReason}>
            {props.reason}
          </Text>
        </View>
        {props.isActive ? (
          <View style={PendingPassengerListCardStyles.statusIndicatorActive} />
        ) : (
          <View
            style={PendingPassengerListCardStyles.statusIndicatorNotActive}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PassengerListPendingCard;
