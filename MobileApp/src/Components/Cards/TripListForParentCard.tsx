import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../../Const/colors';
import {
  TripCardDriverSwipableCardStyles,
  TripCardParentStyles,
} from '../../Stylesheets/GlobalStyles';
import {MoveRight, MoveLeft, ArrowLeft, ArrowRight} from 'lucide-react-native';
import TripDestinationCard from './TripDestinationCard';

type tripCardProps = {
  driverName: string;
  pickUpTime: string;
  dropOffTime: string;
  pickUpDate: string;
  passengerName: string;
  pickUpLocation: string;
  tripStatus: number;
  leg: number;
};

export const TripCardParent = (props: tripCardProps) => {
  const iconSize = 40;
  const iconStrokeWidth = 2;

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
    // <View style={TripCardParentStyles.cardBorder}>
    //   <View style={TripCardParentStyles.cardContainer}>{tripStatus()}</View>
    //   <View style={TripCardParentStyles.cardContainer}>
    //     <View style={{marginEnd: 5}}>
    //       <Text style={TripCardParentStyles.cardText}>Driver:</Text>
    //     </View>
    //     <View>
    //       <Text>{props.driverName}</Text>
    //     </View>
    //   </View>
    //   {props.pickUpTime == '' ||
    //   props.pickUpTime == undefined ||
    //   props.pickUpTime == null ? null : (
    //     <View style={TripCardParentStyles.cardContainer}>
    //       <Text style={TripCardParentStyles.cardText}>Pickup Time:</Text>
    //       <Text style={{marginEnd: 20}}>{props.pickUpTime}</Text>
    //     </View>
    //   )}
    //   {props.dropOffTime == '' ||
    //   props.dropOffTime == undefined ||
    //   props.dropOffTime == null ? null : (
    //     <View style={TripCardParentStyles.cardContainer}>
    //       <Text style={TripCardParentStyles.cardText}>Dropoff Time:</Text>
    //       <Text style={{marginEnd: 20}}>{props.dropOffTime}</Text>
    //     </View>
    //   )}
    //   <View style={TripCardParentStyles.cardContainer}>
    //     <Text style={TripCardParentStyles.cardText}>Pickup Date:</Text>
    //     <Text>{props.pickUpDate}</Text>
    //   </View>
    //   <View style={TripCardParentStyles.cardContainer}>
    //     <View style={{marginEnd: 5}}>
    //       <Text style={TripCardParentStyles.cardText}>Passenger:</Text>
    //     </View>
    //     <View>
    //       <Text>{props.passengerName}</Text>
    //     </View>
    //   </View>
    //   <View style={TripCardParentStyles.cardContainer}>
    //     <Text style={TripCardParentStyles.cardText}>Location:</Text>
    //   </View>
    //   {/* <View>
    //     <Text>{props.pickUpLocation}</Text>
    //   </View> */}
    //   {TripDestinationCard(props.leg)}
    // </View>
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
          <Text style={TripCardDriverSwipableCardStyles.pickupDate}>
            Driver: {props.driverName}
          </Text>
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
          {tripStatus()}
        </View>
      </View>
    </View>
  );
};
