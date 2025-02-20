import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {PassengerParentCardListCardStyles} from '../../Stylesheets/GlobalStyles';
import {Image} from '@gluestack-ui/themed';

type PassengerParentCardCardProps = {
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

export const PassengerParentCard = (props: PassengerParentCardCardProps) => {
  const passengerName = `${props.firstName} ${props.lastName}`;

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={PassengerParentCardListCardStyles.passengerItem}>
        <Image
          source={require('../../Images/default_avatar_image.jpg')}
          style={PassengerParentCardListCardStyles.passengerImage}
          alt="passenger image avatar"
        />
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
