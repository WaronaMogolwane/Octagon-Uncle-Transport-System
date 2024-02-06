import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import React, {useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TripCardDriverStyles} from '../Stylesheets/GlobalStyles';

type tripCardSwipableProps = {
  passengerName: string;
  pickUpTime: string;
  pickUpDate: string;
  pickUpLocation: string;
  tripStatus: number;
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
  //const [isPickedUp, setIsPickedUp] = useState(false);

  const changeBool = () => {
    //setIsPickedUp(true);
  };

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
        <View style={TripCardDriverStyles.absentBox}>
          <Animated.Text style={{transform: [{scale: scale}]}}>
            Absent
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
          <View style={TripCardDriverStyles.pickUpBox}>
            <Animated.Text style={{transform: [{scale: scale}]}}>
              Pick-up
            </Animated.Text>
          </View>
        </TouchableOpacity>
      );
    } else if (props.tripStatus == 2) {
      return (
        <TouchableOpacity onPress={props.handleDropoff} activeOpacity={0.6}>
          <View style={TripCardDriverStyles.pickUpBox}>
            <Animated.Text style={{transform: [{scale: scale}]}}>
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
        <Text style={TripCardDriverStyles.unCompletedTrip}>Uncompleted</Text>
      );
    } else if (props.tripStatus == 2) {
      return <Text style={TripCardDriverStyles.completedTrip}>Completed</Text>;
    }
  };

  return (
    <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
      <View style={TripCardDriverStyles.cardBorder}>
        <View style={TripCardDriverStyles.cardContainer}>{tripStatus()}</View>
        <View style={TripCardDriverStyles.cardContainer}>
          <View style={{marginEnd: 5}}>
            <Text style={TripCardDriverStyles.cardText}>Passenger:</Text>
          </View>
          <View>
            <Text>{props.passengerName}</Text>
          </View>
        </View>
        <View style={TripCardDriverStyles.cardContainer}>
          <Text style={TripCardDriverStyles.cardText}>Pickup Time:</Text>
          <Text style={{marginEnd: 20}}>{props.pickUpTime}</Text>
        </View>
        <View style={TripCardDriverStyles.cardContainer}>
          <Text style={TripCardDriverStyles.cardText}>Pickup Date:</Text>
          <Text>{props.pickUpDate}</Text>
        </View>
        <View style={TripCardDriverStyles.cardContainer}>
          <Text style={TripCardDriverStyles.cardText}>Location:</Text>
        </View>
        <View>
          <Text>{props.pickUpLocation}</Text>
        </View>
      </View>
    </Swipeable>
  );
};
