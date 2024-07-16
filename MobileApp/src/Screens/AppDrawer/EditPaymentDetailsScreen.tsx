import {View, Text} from 'react-native';
import React from 'react';
import {ArrowLeft, ArrowLeftIcon, FilePen, Icon} from 'lucide-react-native';
import {burger} from '@lucide/lab';
import {Button, ButtonIcon, ButtonText} from '@gluestack-ui/themed';

const EditPaymentDetailsScreen = ({navigation}: any) => {
  return (
    <View>
      <View>
        <Text>Horizontal View Box</Text>
        <View>
          <Text>Side by Side view Box</Text>
          <Text>Next Payment Date</Text>
          <Text>08/05/2024</Text>
        </View>
        <View>
          <Text>Side by Side view Box</Text>
          <Text>Amount</Text>
          <Text>R 230.00</Text>
        </View>
      </View>

      <View>
        <Text>Generic Card Details</Text>
        <Text>Card number</Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View style={{padding: 5}}>
            <Button
              size="md"
              variant="solid"
              action="secondary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <ButtonIcon as={ArrowLeftIcon} />
              <ButtonText>Back</ButtonText>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditPaymentDetailsScreen;
