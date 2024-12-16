import {
  Badge,
  BadgeText,
  Button,
  Divider,
  Heading,
  HStack,
  Text,
  View,
} from '@gluestack-ui/themed';
import {
  PaymentCardProps,
  PaymentMethodCardProps,
} from '../../Props/PaymentCardProps';
import {Icon} from 'lucide-react-native';
import {cardCredit} from '@lucide/lab';
import {CustomButton1} from '../Buttons';
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

export const PaymentCard = (props: PaymentCardProps) => {
  return (
    <Button
      size="sm"
      action={props.PaymentsType == 'Expected' ? 'positive' : 'negative'}
      style={{
        borderRadius: 30,
        elevation: 5,
        width: '90%',
        height: '20%',
        marginBottom: 16,
      }}>
      <View style={{width: '100%'}}>
        <Text style={{fontSize: 23, fontWeight: '400', color: 'white'}}>
          {'{0} {1} Payments'.format(
            props.NumberOfPayments,
            props.PaymentsType,
          )}
        </Text>
        <Text style={{fontSize: 23, fontWeight: '700', color: 'white'}}>
          {props.Amount}
        </Text>
        <Text style={{fontSize: 18, fontWeight: '400', color: 'white'}}>
          {props.CurrentPeriod}
        </Text>
      </View>
    </Button>
  );
};
export const PaymentMethodCard = (props: PaymentMethodCardProps) => {
  return (
    <View>
      <View>
        <HStack>
          <Icon
            iconNode={cardCredit}
            size={24}
            color={'black'}
            style={{marginRight: 16, alignSelf: 'center'}}
          />
          <View style={{width: '90%'}}>
            <Divider />
            <HStack>
              <Text style={{paddingVertical: 8, fontSize: 17}}>
                {props.CardType + props.MaskedCardNumber}
              </Text>
              <Badge
                action={props.IsActive ? 'success' : 'muted'}
                variant="outline"
                size="sm"
                style={{
                  borderRadius: 16,
                  marginLeft: 'auto',
                  marginRight: 16,
                  height: '80%',
                  alignSelf: 'center',
                }}>
                <BadgeText>
                  {props.IsActive ? 'Active' : 'Deactivated'}
                </BadgeText>
              </Badge>
            </HStack>
            <Divider />
          </View>
        </HStack>
      </View>
    </View>
  );
};
