import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  TripCardStyles,
  TripTransporterCardStyles,
} from '../../Stylesheets/GlobalStyles';
import {ChevronLeft, ChevronRight} from 'lucide-react-native';

type tripCardProps = {
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
};

export const TripTransporterCard = (props: tripCardProps) => {
  const iconSize = 35;
  const iconStrokeWidth = 1.2;

  const tripStatus = () => {
    if (props.tripStatus == 0) {
      return null;
    } else if (props.tripStatus == 1) {
      return (
        <Text
          style={[
            TripTransporterCardStyles.tripStatusText,
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
            TripTransporterCardStyles.tripStatusText,
            {color: '#e89d0e'},
          ]}>
          Picked-up
        </Text>
      );
    } else if (props.tripStatus == 3) {
      return (
        <Text
          style={[
            TripTransporterCardStyles.tripStatusText,
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
      style={{marginEnd: 10}}
    />
  );

  const arrowLeft = (
    <ChevronLeft
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={'#c26b71'}
      style={{marginEnd: 10}}
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
  );
};

export const TripCardTransporterComplete = (props: tripCardProps) => {
  const iconSize = 40;
  const iconStrokeWidth = 1.2;

  const tripStatus = () => {
    if (props.tripStatus == 0) {
      return (
        <Text
          style={[
            TripTransporterCardStyles.tripStatusText,
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
            TripTransporterCardStyles.tripStatusText,
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
            TripTransporterCardStyles.tripStatusText,
            {color: '#e89d0e'},
          ]}>
          Picked-up
        </Text>
      );
    } else if (props.tripStatus == 3) {
      return (
        <Text
          style={[
            TripTransporterCardStyles.tripStatusText,
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
