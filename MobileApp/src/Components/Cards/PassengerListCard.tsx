import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  PassengerListCardStyles,
  TripCardParentStyles,
} from '../../Stylesheets/GlobalStyles';
import {UserRound} from 'lucide-react-native';
import {CheckPassengerSchedule} from '../../Controllers/PassengerScheduleController';

type passengerCardProps = {
  passengerId: string;
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
  const [isScheduled, setIsScheduled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  CheckPassengerSchedule(props.passengerId).then((response: any) => {
    if (response[0].status == 1) {
      setIsScheduled(true);
      setIsVisible(true);
    } else if (response[0].status == 0) {
      setIsScheduled(false);
      setIsVisible(true);
    }
  });

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

        {isVisible ? (
          <View>
            {isScheduled ? (
              <Text style={PassengerListCardStyles.scheduledText}>
                scheduled
              </Text>
            ) : (
              <Text style={PassengerListCardStyles.notScheduledText}>
                not scheduled
              </Text>
            )}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
