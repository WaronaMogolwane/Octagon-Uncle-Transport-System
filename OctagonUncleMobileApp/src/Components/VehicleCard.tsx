import {Text, View} from 'react-native';
import React from 'react';

import {TripCardDriverStyles} from '../Stylesheets/GlobalStyles';

type tripCardProps = {
  registrationNumber: string;
  make: string;
  model: string;
  color: string;
  fullName: string;
};

export const VehicleCard = (props: tripCardProps) => {
  return (
    <View style={TripCardDriverStyles.cardBorder}>
      <View style={TripCardDriverStyles.cardContainer}>
        <View style={{marginEnd: 5}}>
          <Text style={TripCardDriverStyles.cardText}>
            Registration Number:
          </Text>
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
  );
};
