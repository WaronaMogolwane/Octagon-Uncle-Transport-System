import {
  Animated,
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  TripCardDriverSwipableCardStyles,
  TripCardStyles,
  TripTransporterCardStyles,
} from '../../Stylesheets/GlobalStyles';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';
import {Swipeable} from 'react-native-gesture-handler';

type tripCardProps = {
  driverName: string;
  pickUpTime: string;
  dropOffTime: string;
  pickUpDate: string;
  passengerName: string;
  pickUpLocation: string;
  tripStatus: number;
  leg: number;
  handleAbsentPassenger: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const TripCardParent = (props: tripCardProps) => {
  const iconSize = 40;
  const iconStrokeWidth = 1.2;

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
            Cancel
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
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

  function getMeridiem(): string {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 12 ? 'PM' : 'AM';
  }
  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <View style={TripCardStyles.passengerItem}>
        <Image
          source={require('../../Images/default_avatar_image.jpg')}
          style={TripCardStyles.profileImage}
        />

        <View style={TripCardStyles.passengerInfo}>
          <Text style={TripCardStyles.passengerName}>
            {props.passengerName}, {props.pickUpDate.replace(/-/g, '/')}
          </Text>
          <View style={TripTransporterCardStyles.timeContainer}>
            <Text style={TripCardStyles.driverName}>
              Driver: {props.driverName}
            </Text>
            {props.pickUpTime == '' ||
            props.pickUpTime == undefined ||
            props.pickUpTime == null ? null : (
              <Text style={TripCardStyles.pickupTime}>
                Pickup: {props.pickUpTime + ' ' + getMeridiem()}
              </Text>
            )}
          </View>
          {tripStatus()}
        </View>
        {props.leg == 0 ? arrowRight : arrowLeft}
      </View>
    </Swipeable>
  );
};

export const TripCardParentComplete = (props: tripCardProps) => {
  const iconSize = 40;
  const iconStrokeWidth = 1.2;

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
    <ChevronRight
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={'#3ba2a9'}
    />
  );

  const arrowLeft = (
    <ChevronLeft
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={'#c26b71'}
    />
  );

  function getMeridiem(): string {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 12 ? 'PM' : 'AM';
  }
  return (
    <View style={TripCardStyles.passengerItem}>
      <Image
        source={require('../../Images/default_avatar_image.jpg')}
        style={TripCardStyles.profileImage}
      />

      <View style={TripCardStyles.passengerInfo}>
        <Text style={TripCardStyles.passengerName}>
          {props.passengerName}, {props.pickUpDate.replace(/-/g, '/')}
        </Text>
        <View style={TripTransporterCardStyles.timeContainer}>
          <Text style={TripCardStyles.driverName}>
            Driver: {props.driverName}
          </Text>
          {props.pickUpTime == '' ||
          props.pickUpTime == undefined ||
          props.pickUpTime == null ? null : (
            <Text style={TripCardStyles.pickupTime}>
              Pickup: {props.pickUpTime + ' ' + getMeridiem()}
            </Text>
          )}

          {props.dropOffTime == '' ||
          props.dropOffTime == undefined ||
          props.dropOffTime == null ? null : (
            <Text style={TripCardStyles.dropOffTime}>
              Dropoff: {props.dropOffTime + ' ' + getMeridiem()}
            </Text>
          )}
        </View>
        {tripStatus()}
      </View>
      {props.leg == 0 ? arrowRight : arrowLeft}
    </View>
  );
};
