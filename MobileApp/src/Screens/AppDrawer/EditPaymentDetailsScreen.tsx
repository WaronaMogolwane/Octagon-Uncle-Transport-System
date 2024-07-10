import {View, Text} from 'react-native';
import React from 'react';
import {ArrowLeft, Icon} from 'lucide-react-native';
import {burger} from '@lucide/lab';

const EditPaymentDetailsScreen = () => {
  return (
    <View>
      <Icon size={24} strokeWidth={2} iconNode={burger} color={'#000000'} />

      <Text>EditPaymentDetailsScreen</Text>
      <Text>
        Favor{' '}
        <Icon size={24} strokeWidth={2} iconNode={burger} color={'#000000'} />
      </Text>
      <ArrowLeft size={24} strokeWidth={2} color={'#000000'} />
    </View>
  );
};

export default EditPaymentDetailsScreen;
