import {
  Text,
  Heading,
  Image,
  Pressable,
  VStack,
  Badge,
  BadgeText,
  HStack,
  Card,
} from '@gluestack-ui/themed';
import {GestureResponderEvent} from 'react-native';
import {PaymentHistoryCardProps} from '../../Props/PaymentCardProps';

export const PaymentHistoryCard = (props: PaymentHistoryCardProps) => {
  return (
    <Card
      style={{
        marginBottom: 8,
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
        elevation: 4,
      }}>
      <Pressable onPress={props.HandlePress} style={{width: '100%'}}>
        <HStack space="xl">
          <VStack>
            <Text size="md">{props.FirstName + ' ' + props.LastName}</Text>
            <Badge
              style={{right: 8, borderRadius: 16, alignSelf: 'flex-start'}}
              size="lg"
              right={8}
              variant="solid"
              borderRadius="$lg"
              action={props.Status == 'success' ? 'success' : 'error'}>
              <BadgeText fontWeight="$bold">{props.Status}</BadgeText>
            </Badge>
            <Text size="xs">{props.Date}</Text>
          </VStack>

          <Heading size="md" style={{alignSelf: 'center', marginLeft: 'auto'}}>
            {props.Amount}
          </Heading>
        </HStack>
      </Pressable>
    </Card>
  );
};
