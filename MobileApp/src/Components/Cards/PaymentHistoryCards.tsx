import {
  Text,
  Heading,
  Pressable,
  VStack,
  Badge,
  BadgeText,
  HStack,
  Card,
} from '@gluestack-ui/themed';
import {PaymentHistoryCardProps} from '../../Props/PaymentCardProps';
import {CustomButton1} from '../Buttons';

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
      <Pressable onPress={props.HandleCardPress} style={{width: '100%'}}>
        <HStack space="xl">
          <VStack style={{alignSelf: 'center'}}>
            <Heading size="md" style={{marginBottom: 4}}>
              {props.FirstName + ' ' + props.LastName}
            </Heading>
            <Badge
              style={{
                right: 8,
                borderRadius: 16,
                alignSelf: 'flex-start',
                marginBottom: 4,
              }}
              size="lg"
              right={8}
              variant="solid"
              borderRadius="$lg"
              action={
                props.Status == 'success'
                  ? 'success'
                  : props.Status == 'failed'
                  ? 'error'
                  : 'warning'
              }>
              <BadgeText fontWeight="$bold">
                {props.Status == 'success'
                  ? 'Paid'
                  : props.Status == 'failed'
                  ? 'Declined'
                  : 'Refunded'}
              </BadgeText>
            </Badge>
            <Text size="sm">{props.Date}</Text>
          </VStack>
          <VStack style={{alignSelf: 'center', marginLeft: 'auto'}}>
            <Heading size="md" style={{marginBottom: 8}}>
              {props.Amount}
            </Heading>
          </VStack>
        </HStack>
      </Pressable>
    </Card>
  );
};
