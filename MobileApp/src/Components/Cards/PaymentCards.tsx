import {
  Badge,
  BadgeText,
  Button,
  Card,
  Divider,
  Heading,
  HStack,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import {
  MonthlyPaymentDetailsCardProps,
  PaymentCardProps,
  PaymentMethodCardProps,
} from '../../Props/PaymentCardProps';
import {Icon} from 'lucide-react-native';
import {cardCredit} from '@lucide/lab';
import {PaymentIcon} from 'react-native-payment-icons';
import {CustomButton1} from '../Buttons';
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

export const PaymentCard = (props: PaymentCardProps) => {
  return (
    <View
      style={
        (props.styles,
        {
          height: '20%',
        })
      }>
      <HStack style={{justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{width: '50%'}}>
          <Text style={{fontSize: 23, fontWeight: '700'}}>{props.Amount}</Text>
          <Text style={{fontSize: 17, color: 'gray'}}>
            {'{0} {1} payments in {2}'.format(
              props.NumberOfPayments,
              props.PaymentsType,
              props.CurrentPeriod,
            )}
          </Text>
        </View>
        <View style={{width: '50%'}}>
          <CustomButton1
            styles={{
              backgroundColor: '#e8eef2',
              width: '70%',
              marginLeft: 'auto',
            }}
            textColor="#000000"
            size="md"
            title="View details"
          />
        </View>
      </HStack>
    </View>
  );
};
export const PaymentMethodCard = (props: PaymentMethodCardProps) => {
  return (
    <View>
      <View>
        <HStack style={{alignItems: 'center'}}>
          <View style={{width: '100%'}}>
            <HStack
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 4,
              }}>
              <PaymentIcon
                type={props.CardType}
                style={{
                  width: 32,
                  marginRight: 16,
                  alignSelf: 'center',
                }}
              />

              <VStack style={{marginRight: 'auto'}}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>
                  {props.CardType.charAt(0).toUpperCase() +
                    props.CardType.slice(1)}{' '}
                  {props.MaskedCardNumber}
                </Text>

                <Text style={{fontSize: 14, color: 'gray'}}>
                  {props.IsExpiringSoon ? 'Expiring soon' : 'Verified'}
                </Text>
              </VStack>
              {props.IsActive ? (
                <Badge
                  action={props.IsActive ? 'success' : 'muted'}
                  variant="outline"
                  size="sm"
                  style={{
                    borderRadius: 16,
                    marginLeft: 'auto',
                    height: '80%',
                    alignSelf: 'center',
                  }}>
                  <BadgeText>
                    {props.IsActive ? 'Active' : 'Deactivated'}
                  </BadgeText>
                </Badge>
              ) : null}
            </HStack>
          </View>
        </HStack>
      </View>
    </View>
  );
};
export const MonthlyPaymentDetailsCard = (
  props: MonthlyPaymentDetailsCardProps,
) => {
  return (
    <View style={props.styles}>
      <HStack>
        <VStack>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {props.NextPaymentDate}
          </Text>
          <Text style={{fontSize: 14, color: 'gray'}}>Next payment</Text>
        </VStack>
        <VStack style={{marginLeft: 'auto', alignSelf: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{props.Amount}</Text>
        </VStack>
      </HStack>
    </View>
  );
};
