import {
  Text,
  Heading,
  Image,
  Pressable,
  VStack,
  Badge,
  BadgeText,
  HStack,
} from '@gluestack-ui/themed';
import {GestureResponderEvent, View} from 'react-native';
import {VehicleListCardStyles} from '../../Stylesheets/GlobalStyles';

export const VehicleListCard = (props: {
  LicenseNumber: string;
  Make: string;
  Model: string;
  Colour: string;
  DriverFullName: string;
  VehicleImageFrontUrl: string;
  handleVehicleCardPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
}) => {
  return (
    <Pressable onPress={props.handleVehicleCardPress}>
      <View style={VehicleListCardStyles.vehicleItem}>
        <Image
          source={{
            uri:
              props.VehicleImageFrontUrl ||
              'https://eu.amcdn.co.za/cars/toyota-quantum-2-5d-4d-ses-fikile-2012-id-64381431-type-main.jpg',
          }}
          alt="Vehicle front picture."
          style={VehicleListCardStyles.vehicleImage}
        />
        <View style={VehicleListCardStyles.vehicleInfo}>
          <Text style={VehicleListCardStyles.vehicleTitle}>
            {props.Make + ': ' + props.Model}
          </Text>
          <Text style={VehicleListCardStyles.licenseNumber}>
            {props.LicenseNumber}
          </Text>
          <Text style={VehicleListCardStyles.driverName}>
            {props.DriverFullName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
