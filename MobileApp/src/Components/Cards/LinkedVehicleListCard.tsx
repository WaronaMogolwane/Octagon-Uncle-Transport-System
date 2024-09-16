import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {TripCardDriverStyles} from '../../Stylesheets/GlobalStyles';
import {Card} from '@gluestack-ui/themed';
import {
  GraduationCap,
  MoveDown,
  MapPin,
  Car,
  ShipWheelIcon,
} from 'lucide-react-native';

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
  const iconSize = 15;
  const iconStrokeWidth = 1.5;
  const iconColor = '#000000';

  const universityIcon = (
    <GraduationCap
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={iconColor}
    />
  );

  const carIcon = (
    <Car size={30} strokeWidth={iconStrokeWidth} color={'#c26b71'} />
  );

  const wheelIcon = (
    <ShipWheelIcon size={25} strokeWidth={iconStrokeWidth} color={iconColor} />
  );
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card
        size="sm"
        variant="outline"
        style={{
          marginHorizontal: 12,
          marginVertical: 7,
          backgroundColor: '#ffffff',
          borderRadius: 30,
          elevation: 5,
        }}>
        <View
          style={{
            marginBottom: 5,
            alignItems: 'flex-start',
            marginHorizontal: 15,
            flexDirection: 'row',
            marginVertical: 10,
            backgroundColor: '#ffffff',
            flex: 1,
            justifyContent: 'space-between',
            borderRadius: 20,
          }}>
          <View style={{alignItems: 'center', width: '29%'}}>
            <View
              style={{
                display: 'flex',
                marginHorizontal: 12,
                width: 100,
                height: 100,
                borderRadius: 50, // Half of the width or height
                backgroundColor: '#fadcdc',
                flexDirection: 'row', // Horizontal arrangement
                alignItems: 'center', // Align items vertically
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 25}}>{carIcon}</Text>
            </View>

            <View>
              <Text style={{marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>
                {props.registrationNumber}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center', width: '35%'}}>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Make</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 12, fontWeight: '600'}}>
                {props.make}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Model</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 12, fontWeight: '600'}}>
                {props.model}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Color</Text>
            </View>
            <View>
              <Text style={{fontSize: 12, fontWeight: '600'}}>
                {props.color}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '35%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
                Driver
              </Text>
            </View>
            <View>
              <Text
                style={{fontSize: 12, fontWeight: '600', textAlign: 'center'}}>
                {props.fullName}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
