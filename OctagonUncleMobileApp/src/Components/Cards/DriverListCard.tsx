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
    <Box
      minWidth={230}
      minHeight={140}
      flex={1}
      borderWidth={1}
      sx={{
        borderColor: '$trueGray300',
        backgroundColor: '#ffffffbd',

        _dark: {
          bg: '#071117',
          borderColor: '$borderDark800',
        },
      }}>
      <Box
        flex={4}
        px="$3"
        w="$full"
        justifyContent="center"
        sx={{
          borderBottomColor: '$trueGray300',
          backgroundColor: '#ffffff40',
          _dark: {
            borderBottomColor: '$borderDark800',
            bg: '#0C0E12',
          },
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '75%'}}>
            <Heading mb="$1" size="sm">
              {props.firstName + ' ' + props.lastName}
            </Heading>
            <Text size="xs">{props.email}</Text>
            <Text size="xs">
              {'Expiry date: ' + new Date(props.expiryDate).toDateString()}
            </Text>
          </View>
          <View>
            <CustomButton3
              title="Remove"
              onPress={props.removeButtonOnPress}
              action="negative"
            />
          </View>
        </View>
      </Box>
    </Box>
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
