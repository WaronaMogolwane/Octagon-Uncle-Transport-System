import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  TripCardDriverStyles,
  TripTransporterCardStyles,
} from '../../Stylesheets/GlobalStyles';
import {Card} from '@gluestack-ui/themed';
import {ArrowLeft, ArrowRight} from 'lucide-react-native';
import TripDestinationCard from './TripDestinationCard';

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
  const iconSize = 40;
  const iconStrokeWidth = 2;

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
    <View style={TripTransporterCardStyles.container}>
      <TouchableOpacity onPress={props.handleIconPress}>
        <View style={TripTransporterCardStyles.iconContainer}>
          {props.leg == 0 ? arrowRight : arrowLeft}
        </View>
      </TouchableOpacity>

      <View style={TripTransporterCardStyles.textContainer}>
        <View style={{marginEnd: 10}}>
          <Text style={TripTransporterCardStyles.passengerName}>
            {props.passengerName}
          </Text>
          <Text style={TripTransporterCardStyles.pickupDate}>
            Date: {props.pickUpDate}
          </Text>
          {tripStatus()}
        </View>
        <View style={TripTransporterCardStyles.timeContainer}>
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
  );
};

export const TripCardTransporterComplete = (props: tripCardProps) => {
  const iconSize = 40;
  const iconStrokeWidth = 2;

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
    <View style={TripTransporterCardStyles.container}>
      <TouchableOpacity onPress={props.handleIconPress}>
        <View style={TripTransporterCardStyles.iconContainer}>
          {props.leg == 0 ? arrowRight : arrowLeft}
        </View>
      </TouchableOpacity>

      <View style={TripTransporterCardStyles.textContainer}>
        <View style={{marginEnd: 10}}>
          <Text style={TripTransporterCardStyles.passengerName}>
            {props.passengerName}
          </Text>
          <Text style={TripTransporterCardStyles.pickupDate}>
            Date: {props.pickUpDate}
          </Text>
          {tripStatus()}
        </View>
        <View style={TripTransporterCardStyles.timeContainer}>
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
  );
};
