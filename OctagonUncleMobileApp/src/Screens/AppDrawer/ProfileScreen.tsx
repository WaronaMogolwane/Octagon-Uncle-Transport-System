import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton1} from '../../Components/Buttons';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {View} from 'react-native-reanimated/lib/typescript/Animated';
import {Image} from '@gluestack-ui/themed';
import Input from '../../Components/CustomInput';
import {ScrollView} from 'react-native';

const ProfileScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={ThemeStyles.container}>
      <ScrollView>
        <CustomButton1
          onPress={() => navigation.goBack()}
          title="Go back home"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
