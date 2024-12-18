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
import {GestureResponderEvent} from 'react-native';

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
      <HStack
        space="xl"
        style={{
          alignItems: 'center',
          borderEndEndRadius: 0,
          backgroundColor: 'white',
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
        }}>
        <Image
          style={{width: 100, aspectRatio: 1 / 1}}
          source={{
            uri:
              props.VehicleImageFrontUrl ||
              'https://eu.amcdn.co.za/cars/toyota-quantum-2-5d-4d-ses-fikile-2012-id-64381431-type-main.jpg',
          }}
          alt="Vehicle front picture."
        />
        <VStack>
          <HStack>
            <Text size="xs">{props.Make + ': ' + props.Model}</Text>
          </HStack>
          <HStack>
            <Heading size="md">{props.LicenseNumber}</Heading>
          </HStack>
          <HStack>
            <Badge
              marginVertical={2}
              size="md"
              right={8}
              maxWidth={200}
              variant="solid"
              borderRadius="$lg"
              action="muted">
              <BadgeText>{props.DriverFullName}</BadgeText>
              {/* <Car
                style={{marginLeft: 2}}
                size={16}
                stroke={'#000000'}
                strokeWidth={1}
                strokeOpacity={'1'}
              /> */}
            </Badge>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};
