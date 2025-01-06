import {Text, View} from 'react-native';
import React from 'react';
import COLORS from '../../Const/colors';
import {TripCardParentStyles} from '../../Stylesheets/GlobalStyles';
import {MoveRight, MoveLeft} from 'lucide-react-native';
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
  const tripStatus = () => {
    if (props.tripStatus == 0) {
      return (
        <View
          style={{
            borderRadius: 20, // Half of the width or height
            backgroundColor: '#fadcdc',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#c26b71',
              fontWeight: '500',
              padding: 5,
            }}>
            Uncompleted
          </Text>
        </View>
      );
    } else if (props.tripStatus == 1) {
      return (
        <View
          style={{
            borderRadius: 20, // Half of the width or height
            backgroundColor: '#fadcdc',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#c26b71',
              fontWeight: '500',
              padding: 5,
            }}>
            Uncompleted
          </Text>
        </View>
      );
    } else if (props.tripStatus == 2) {
      return (
        <View
          style={{
            borderRadius: 20, // Half of the width or height
            backgroundColor: '#f5eede',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#e89d0e',
              fontWeight: '500',
              padding: 5,
            }}>
            Picked-up
          </Text>
        </View>
      );
    } else if (props.tripStatus == 3) {
      return (
        <View
          style={{
            borderRadius: 20, // Half of the width or height
            backgroundColor: '#d6f3f1',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#3ba2a9',
              fontWeight: '500',
              padding: 5,
            }}>
            Completed
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={TripCardParentStyles.cardBorder}>
      <View style={TripCardParentStyles.cardContainer}>{tripStatus()}</View>
      <View style={TripCardParentStyles.cardContainer}>
        <View style={{marginEnd: 5}}>
          <Text style={TripCardParentStyles.cardText}>Driver:</Text>
        </View>
        <View>
          <Text>{props.driverName}</Text>
        </View>
      </View>
      {props.pickUpTime == '' ||
      props.pickUpTime == undefined ||
      props.pickUpTime == null ? null : (
        <View style={TripCardParentStyles.cardContainer}>
          <Text style={TripCardParentStyles.cardText}>Pickup Time:</Text>
          <Text style={{marginEnd: 20}}>{props.pickUpTime}</Text>
        </View>
      )}
      {props.dropOffTime == '' ||
      props.dropOffTime == undefined ||
      props.dropOffTime == null ? null : (
        <View style={TripCardParentStyles.cardContainer}>
          <Text style={TripCardParentStyles.cardText}>Dropoff Time:</Text>
          <Text style={{marginEnd: 20}}>{props.dropOffTime}</Text>
        </View>
      )}
      <View style={TripCardParentStyles.cardContainer}>
        <Text style={TripCardParentStyles.cardText}>Pickup Date:</Text>
        <Text>{props.pickUpDate}</Text>
      </View>
      <View style={TripCardParentStyles.cardContainer}>
        <View style={{marginEnd: 5}}>
          <Text style={TripCardParentStyles.cardText}>Passenger:</Text>
        </View>
        <View>
          <Text>{props.passengerName}</Text>
        </View>
      </View>
      <View style={TripCardParentStyles.cardContainer}>
        <Text style={TripCardParentStyles.cardText}>Location:</Text>
      </View>
      {/* <View>
        <Text>{props.pickUpLocation}</Text>
      </View> */}
      {TripDestinationCard(props.leg)}
    </View>
  );
};
