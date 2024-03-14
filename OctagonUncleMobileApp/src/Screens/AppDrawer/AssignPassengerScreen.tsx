import {Text, View} from 'react-native';
import React from 'react';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

const AssignPassengerScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={ThemeStyles.container}>
      <View>
        <Text>AssignPassengerScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default AssignPassengerScreen;
