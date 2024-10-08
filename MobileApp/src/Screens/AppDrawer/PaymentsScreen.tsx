import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton1} from '../../Components/Buttons';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';

const PaymentsScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={ThemeStyles.container}>
      <CustomButton1 onPress={() => navigation.goBack()} title="Go back home" />
    </SafeAreaView>
  );
};

export default PaymentsScreen;
