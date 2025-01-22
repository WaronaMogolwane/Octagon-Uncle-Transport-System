import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {PassengerParentCardListCardStyles} from '../../Stylesheets/GlobalStyles';
import {Image} from '@gluestack-ui/themed';
import {UserRound} from 'lucide-react-native';
import COLORS from '../../Const/colors';

type PassengerListHomeScreenCardProps = {
  firstName: string;
  lastName: string;
  isActive: boolean;
  isDeleted: boolean;
  onPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const PassengerListHomeScreenCard = (
  props: PassengerListHomeScreenCardProps,
) => {
  const passengerName = `${props.firstName} ${props.lastName}`;

  const iconSize = 15;
  const iconStrokeWidth = 2;
  const iconColor = COLORS.customBlack;

  const userIcon = (
    <UserRound
      style={PassengerParentCardListCardStyles.passengerImage}
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={iconColor}
    />
  );

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={PassengerParentCardListCardStyles.passengerItem}>
        {/* <Image
          source={require('../../Images/default_avatar_image.jpg')}
          style={PassengerParentCardListCardStyles.passengerImage}
          alt="passenger image avatar"
        /> */}
        {userIcon}
        <View style={PassengerParentCardListCardStyles.parentInfo}>
          <Text style={PassengerParentCardListCardStyles.passengerName}>
            {passengerName}
          </Text>
          {props.isDeleted ? (
            <Text style={PassengerParentCardListCardStyles.deleteReason}>
              Delete Requested
            </Text>
          ) : null}
        </View>

        {props.isActive ? (
          <View
            style={PassengerParentCardListCardStyles.statusIndicatorActive}
          />
        ) : (
          <View
            style={PassengerParentCardListCardStyles.statusIndicatorNotActive}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
