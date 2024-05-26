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
      <HStack space="md">
        <Avatar size="lg">
          <AvatarFallbackText>Vehicle Front Picture</AvatarFallbackText>
          <AvatarImage
            source={{
              uri:
                props.VehicleImageFrontUrl ||
                'https://eu.amcdn.co.za/cars/toyota-quantum-2-5d-4d-ses-fikile-2012-id-64381431-type-main.jpg',
            }}
            alt="Vehicle front picture."
          />
        </Avatar>
        <VStack>
          <Heading size="sm"> {props.LicenseNumber}</Heading>
          <Text size="sm">{props.Make + ': ' + props.Model}</Text>
          <Text size="sm">{'Driver: ' + props.DriverFullName}</Text>
        </VStack>
      </HStack>
      <Divider my="$3" />
    </Pressable>
  );
};
