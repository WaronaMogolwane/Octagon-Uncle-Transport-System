import {
  Animated,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {TripCardDriverSwipableCardStyles} from '../../Stylesheets/GlobalStyles';
import {Swipeable} from 'react-native-gesture-handler';
import {ArrowRight, ArrowLeft} from 'lucide-react-native';

type tripCardProps = {
  passengerName: string;
  dropOffTime: string;
  pickUpTime: string;
  pickUpDate: string;
  pickUpLocation: string;
  tripStatus: number;
  leg: number;
  handleUndo: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const TripCardDriver = (props: tripCardProps) => {
  const iconSize = 40;
  const iconStrokeWidth = 2;

  const leftSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={props.handleUndo} activeOpacity={0.6}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            borderRadius: 20, // Half of the width or height
            backgroundColor: '#fadcdc',
            width: 100,
            marginVertical: 10,
          }}>
          <Animated.Text
            style={{
              transform: [{scale: scale}],
              textAlign: 'center',
              color: '#c26b71',
              fontWeight: '500',
              padding: 5,
            }}>
            Undo
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const tripStatus = () => {
    if (props.tripStatus == 0) {
      return (
        <Text
          style={[
            TripCardDriverSwipableCardStyles.tripStatusText,
            {
              color: '#c26b71',
            },
          ]}>
          Uncompleted
        </Text>
      );
    } else if (props.tripStatus == 1) {
      return (
        <Text
          style={[
            TripCardDriverSwipableCardStyles.tripStatusText,
            {
              color: '#c26b71',
            },
          ]}>
          Uncompleted
        </Text>
      );
    } else if (props.tripStatus == 2) {
      return (
        <Text
          style={[
            TripCardDriverSwipableCardStyles.tripStatusText,
            {color: '#e89d0e'},
          ]}>
          Picked-up
        </Text>
      );
    } else if (props.tripStatus == 3) {
      return (
        <Text
          style={[
            TripCardDriverSwipableCardStyles.tripStatusText,
            {color: '#3ba2a9'},
          ]}>
          Completed
        </Text>
      );
    }
  };

  const arrowRight = (
    <ArrowRight
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={'#3ba2a9'}
    />
  );

  const arrowLeft = (
    <ArrowLeft
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={'#c26b71'}
    />
  );

  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <View style={TripCardDriverSwipableCardStyles.container}>
        <View style={TripCardDriverSwipableCardStyles.iconContainer}>
          {props.leg == 0 ? arrowRight : arrowLeft}
        </View>
        <View style={TripCardDriverSwipableCardStyles.textContainer}>
          <View style={{marginEnd: 10}}>
            <Text style={TripCardDriverSwipableCardStyles.passengerName}>
              {props.passengerName}
            </Text>
            <Text style={TripCardDriverSwipableCardStyles.pickupDate}>
              Date: {props.pickUpDate}
            </Text>
            {tripStatus()}
          </View>
          <View style={TripCardDriverSwipableCardStyles.timeContainer}>
            {props.pickUpTime == '' ||
            props.pickUpTime == undefined ||
            props.pickUpTime == null ? null : (
              <Text style={TripCardDriverSwipableCardStyles.pickupDate}>
                Pickup time: {props.pickUpTime}
              </Text>
            )}
            {props.dropOffTime == '' ||
            props.dropOffTime == undefined ||
            props.dropOffTime == null ? null : (
              <Text style={TripCardDriverSwipableCardStyles.pickupDate}>
                Dropoff time: {props.dropOffTime}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
