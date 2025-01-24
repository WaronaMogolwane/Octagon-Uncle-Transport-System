import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  TripCardDriverStyles,
  TripCardDriverSwipableCardStyles,
} from '../../Stylesheets/GlobalStyles';
import {Card, Center, Image} from '@gluestack-ui/themed';
import {
  ArrowLeft,
  ArrowRight,
  MoveLeft,
  MoveRight,
  WalletMinimal,
} from 'lucide-react-native';
import COLORS from '../../Const/colors';
import TripDestinationCard from './TripDestinationCard';

type tripCardSwipableProps = {
  passengerName: string;
  dropOffTime: string;
  pickUpTime: string;
  pickUpDate: string;
  pickUpLocation: string;
  tripStatus: number;
  leg: number;
  handleIconPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
  handlePickup: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
  handleDropoff: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
  handleAbsentPassenger: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const TripCardDriverSwipable = (props: tripCardSwipableProps) => {
  const iconSize = 40;
  const iconStrokeWidth = 2;

  const leftSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={props.handleAbsentPassenger}
        activeOpacity={0.6}>
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
            {props.tripStatus == 0 ? 'Absent' : 'Undo'}
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const rightSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    if (props.tripStatus == 0) {
      return (
        <TouchableOpacity onPress={props.handlePickup} activeOpacity={0.6}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              borderRadius: 20, // Half of the width or height
              backgroundColor: '#f5eede',
              width: 100,
              marginVertical: 10,
            }}>
            <Animated.Text
              style={{
                transform: [{scale: scale}],
                textAlign: 'center',
                color: '#e89d0e',
                fontWeight: '500',
                padding: 5,
              }}>
              Pick-up
            </Animated.Text>
          </View>
        </TouchableOpacity>
      );
    } else if (props.tripStatus == 2) {
      return (
        <TouchableOpacity onPress={props.handleDropoff} activeOpacity={0.6}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              borderRadius: 20, // Half of the width or height
              backgroundColor: '#d6f3f1',
              width: 100,
              marginVertical: 10,
            }}>
            <Animated.Text
              style={{
                transform: [{scale: scale}],
                textAlign: 'center',
                color: '#3ba2a9',
                fontWeight: '500',
                padding: 5,
              }}>
              Drop-off
            </Animated.Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const tripStatus = () => {
    if (props.tripStatus == 0) {
      return null;
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
    <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
      <View style={TripCardDriverSwipableCardStyles.container}>
        <TouchableOpacity onPress={props.handleIconPress}>
          <View style={TripCardDriverSwipableCardStyles.iconContainer}>
            {props.leg == 0 ? arrowRight : arrowLeft}
          </View>
        </TouchableOpacity>

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
              <Text>Pickup time: {props.pickUpTime}</Text>
            )}
            {props.dropOffTime == '' ||
            props.dropOffTime == undefined ||
            props.dropOffTime == null ? null : (
              <Text>Dropoff time: {props.dropOffTime}</Text>
            )}
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
