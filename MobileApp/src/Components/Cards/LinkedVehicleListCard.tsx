import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {TripCardDriverStyles} from '../../Stylesheets/GlobalStyles';

type tripCardProps = {
  registrationNumber: string;
  make: string;
  model: string;
  color: string;
  fullName: string;
  onPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const VehicleCard = (props: tripCardProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={TripCardDriverStyles.cardBorder}>
        <View style={TripCardDriverStyles.cardContainer}>
          <View style={{marginEnd: 5}}>
            <Text style={TripCardDriverStyles.cardText}>License Plate:</Text>
          </View>
          <View>
            <Text>{props.registrationNumber}</Text>
          </View>
        </View>
        <View style={TripCardDriverStyles.cardContainer}>
          <Text style={TripCardDriverStyles.cardText}>Model: </Text>
          <Text style={{marginEnd: 20}}>{props.model}</Text>
        </View>
        <View style={TripCardDriverStyles.cardContainer}>
          <Text style={TripCardDriverStyles.cardText}>Make: </Text>
          <Text style={{marginEnd: 20}}>{props.make}</Text>
        </View>
        <View style={TripCardDriverStyles.cardContainer}>
          <Text style={TripCardDriverStyles.cardText}>Color: </Text>
          <Text>{props.color}</Text>
        </View>
        <View style={TripCardDriverStyles.cardContainer}>
          <Text style={TripCardDriverStyles.cardText}>Driver: </Text>
          <Text>{props.fullName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
