import React from 'react';
import {CustomButton1} from '../../Components/Buttons';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

const TripsScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={ThemeStyles.container}>
      <CustomButton1 onPress={() => navigation.goBack()} title="Go back home" />
    </SafeAreaView>
  );
};

export default TripsScreen;
