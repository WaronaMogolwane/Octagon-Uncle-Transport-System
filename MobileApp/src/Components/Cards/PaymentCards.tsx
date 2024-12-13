import {Button, Text, View} from '@gluestack-ui/themed';
import {PaymentCardProps} from '../../Props/PaymentCardProps';
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
