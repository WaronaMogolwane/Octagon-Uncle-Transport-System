import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../../Const/colors';
import {TripCardParentStyles} from '../../Stylesheets/GlobalStyles';
import {GraduationCap, MapPin} from 'lucide-react-native';
import {Card} from '@gluestack-ui/themed';

type passengerCardProps = {
  passengerName: string;
  age: string;
  pickUpLocation: string;
  dropOffLocation: string;
  onPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const PassengerCardTwo = (props: passengerCardProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={TripCardParentStyles.cardBorder}>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>Passenger Name: </Text>
          </View>
          <View>
            <Text style={{padding: 1}}>{props.passengerName}</Text>
          </View>
        </View>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>Passenger Age: </Text>
          </View>
          <View>
            <Text style={{padding: 1}}>{props.age}</Text>
          </View>
        </View>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>Location: </Text>
          </View>
          <View>
            <Text style={{padding: 2}}>{props.pickUpLocation}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const PassengerCard = (props: passengerCardProps) => {
  const iconSize = 15;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  const universityIcon = (
    <GraduationCap
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={iconColor}
    />
  );

  const locationIcon = (
    <MapPin size={iconSize} strokeWidth={iconStrokeWidth} color={iconColor} />
  );

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card
        size="sm"
        variant="outline"
        style={{
          margin: 12,
          backgroundColor: '#ffffff',
          borderRadius: 30,
          elevation: 3,
        }}>
        <View
          style={{
            flex: 1,
            borderRadius: 20,
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', marginVertical: 5}}>
            {universityIcon} {props.passengerName}
          </Text>
          <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 5}}>
            {locationIcon} {props.pickUpLocation}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
