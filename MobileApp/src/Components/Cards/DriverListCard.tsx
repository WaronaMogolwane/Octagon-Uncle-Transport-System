import {
  Box,
  FlatList,
  Button,
  Text,
  Fab,
  FabIcon,
  AddIcon,
  FabLabel,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  ButtonText,
  CheckCircleIcon,
  HStack,
  Heading,
  Icon,
  View,
  Image,
  Divider,
  Pressable,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  VStack,
} from '@gluestack-ui/themed';
import {CustomButton1, CustomButton3} from '../Buttons';
import {GestureResponderEvent} from 'react-native';
import {Vehicle} from '../../Models/VehicleModel';
import {ClientListCardStyles} from '../../Stylesheets/GlobalStyles';

export const PendingDriverListCard = (props: {
  firstName: string;
  lastName: string;
  email: string;
  expiryDate: Date;
  removeButtonOnPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
}) => {
  return (
    <View style={ClientListCardStyles.passengerItem}>
      <View style={ClientListCardStyles.parentInfo}>
        <Text style={ClientListCardStyles.clientName}>
          {props.firstName} {props.lastName}
        </Text>
        <Text style={ClientListCardStyles.clientEmail}>{props.email}</Text>
        <Text style={ClientListCardStyles.passengerCount}>
          {'Expiry date: ' + new Date(props.expiryDate).toDateString()}
        </Text>
      </View>
      <CustomButton3
        title="Remove"
        onPress={props.removeButtonOnPress}
        action="negative"
      />
    </View>
  );
};

export const DriverListCard = (props: {
  firstName: string;
  lastName: string;
  email: string;
  vehicleLicenseNumber: string;
  handleDriverCardPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
}) => {
  return (
    <Pressable onPress={props.handleDriverCardPress}>
      <HStack space="md">
        <Avatar>
          <AvatarFallbackText>Profile Picture</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: 'https://media.licdn.com/dms/image/C4D03AQFotIRK58pRNA/profile-displayphoto-shrink_200_200/0/1525163555622?e=2147483647&v=beta&t=lvummEevyaevcll0SjNg8UvthCNqz05ate3HonR4zfc',
            }}
            alt="Driver profile picture."
          />
        </Avatar>
        <VStack>
          <Heading size="sm"> {props.firstName + ' ' + props.lastName}</Heading>
          <Text size="sm">{props.email}</Text>
          <Text size="sm">{'Vehicle: ' + props.vehicleLicenseNumber}</Text>
        </VStack>
      </HStack>
      <Divider my="$3" />
    </Pressable>
  );
};
