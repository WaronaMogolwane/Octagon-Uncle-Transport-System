import {
  Box,
  Text,
  HStack,
  Heading,
  View,
  Divider,
  Pressable,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  VStack,
  Image,
} from '@gluestack-ui/themed';
import {CustomButton3} from '../Buttons';
import {GestureResponderEvent} from 'react-native';
import {ClientListCardStyles} from '../../Stylesheets/GlobalStyles';
import {useState} from 'react';
import {GetUserActiveStatus} from '../../Controllers/UserController';

export const PendingClientListCard = (props: {
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
export const ClientListCard = (props: {
  firstName: string;
  lastName: string;
  email: string;
  numberOfPassengers: string;
  userId: string;
  handleDriverCardPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  GetUserActiveStatus(props.userId).then((result: any) => {
    if (result[0].ActiveStatus == 1) {
      setIsActive(true);
    }
  });

  return (
    <View style={ClientListCardStyles.passengerItem}>
      <Image
        source={{
          uri: 'https://media.licdn.com/dms/image/C4D03AQFotIRK58pRNA/profile-displayphoto-shrink_200_200/0/1525163555622?e=2147483647&v=beta&t=lvummEevyaevcll0SjNg8UvthCNqz05ate3HonR4zfc',
        }}
        alt="Driver profile picture."
        style={ClientListCardStyles.passengerImage}
      />
      <View style={ClientListCardStyles.parentInfo}>
        <Text style={ClientListCardStyles.clientName}>
          {props.firstName} {props.lastName}
        </Text>
        <Text style={ClientListCardStyles.clientEmail}>{props.email}</Text>
        <Text style={ClientListCardStyles.passengerCount}>
          {props.numberOfPassengers}
        </Text>
      </View>
      {isActive ? (
        <View style={ClientListCardStyles.statusIndicatorActive} />
      ) : (
        <View style={ClientListCardStyles.statusIndicatorNotActive} />
      )}
    </View>
  );
};
