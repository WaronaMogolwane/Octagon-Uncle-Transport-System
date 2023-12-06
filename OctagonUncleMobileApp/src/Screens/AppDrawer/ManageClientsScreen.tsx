import {View, Text} from 'react-native';
import React from 'react';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton1} from '../../Components/Buttons';

const ManageClientsScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={ThemeStyles.container}>
      <CustomButton1 onPress={() => navigation.goBack()} title="Go back home" />
    </SafeAreaView>
  );
};

export default ManageClientsScreen;
