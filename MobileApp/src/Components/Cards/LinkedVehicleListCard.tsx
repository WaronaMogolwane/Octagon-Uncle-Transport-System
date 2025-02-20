import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Image} from '@gluestack-ui/themed';
import {LinkedVehicleListCardListCardStyles} from '../../Stylesheets/GlobalStyles';

type tripCardProps = {
  registrationNumber: string;
  make: string;
  model: string;
  color: string;
  fullName: string;
  urlFront: string;
  onPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const VehicleCard = (props: tripCardProps) => {
  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport';

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={LinkedVehicleListCardListCardStyles.vehicleItem}>
        <Image
          source={{
            uri: storageUrl + props.urlFront,
          }}
          alt="Vehicle front picture."
          style={LinkedVehicleListCardListCardStyles.vehicleImage}
        />
        <View style={LinkedVehicleListCardListCardStyles.vehicleInfo}>
          <Text style={LinkedVehicleListCardListCardStyles.vehicleTitle}>
            {props.make} {props.model} ({props.color})
          </Text>
          <Text style={LinkedVehicleListCardListCardStyles.driverText}>
            Driver: {props.fullName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
