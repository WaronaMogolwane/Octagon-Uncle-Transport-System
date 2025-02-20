import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Image} from '@gluestack-ui/themed';
import {GraduationCap, MapPin, MoveDown} from 'lucide-react-native';
import {PassengerListAllCardStyles} from '../../Stylesheets/GlobalStyles';

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
      <View style={PassengerListAllCardStyles.passengerItem}>
        <Image
          source={require('../../Images/default_avatar_image.jpg')}
          style={PassengerListAllCardStyles.passengerImage}
          alt="passenger image avatar"
        />
        <View style={PassengerListAllCardStyles.parentInfo}>
          <Text style={PassengerListAllCardStyles.passengerName}>
            {props.passengerName}
          </Text>
          <Text style={PassengerListAllCardStyles.passengerAddress}>
            {props.pickUpLocation}
          </Text>
        </View>
        {props.isActive ? (
          <View style={PassengerListAllCardStyles.statusIndicatorActive} />
        ) : (
          <View style={PassengerListAllCardStyles.statusIndicatorNotActive} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PassengerListAllCard;
