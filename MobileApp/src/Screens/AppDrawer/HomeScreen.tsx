import React, {useContext, useEffect, useState} from 'react';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {CustomButton1} from '../../Components/Buttons';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Auth} from '../../Classes/Auth';
import {View} from 'react-native';
import {Text} from '@gluestack-ui/themed';

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const role: number = Number(auth.GetUserRole());
  const userId = auth.GetUserId();
  const businessId = auth.GetBusinessId();

  if (role == 1) {
    return (
      <SafeAreaView style={ThemeStyles.container}>
        <View>
          <Text>This is the transporter Screen</Text>
        </View>
        <CustomButton1
          title={'Sign Out'}
          onPress={async () => {
            await signOut();
          }}
        />
      </SafeAreaView>
    );
  } else if (role == 2) {
    return (
      <SafeAreaView style={ThemeStyles.container}>
        <View>
          <Text>This is the parent Screen</Text>
        </View>
        <CustomButton1
          title={'Sign Out'}
          onPress={async () => {
            await signOut();
          }}
        />
      </SafeAreaView>
    );
  } else if (role == 3) {
    return (
      <SafeAreaView style={ThemeStyles.container}>
        <View>
          <Text>This is the driver Screen</Text>
        </View>

        <CustomButton1
          title={'Start Trip'}
          onPress={async () => {
            // await signOut();
          }}
        />

        <CustomButton1
          title={'Sign Out'}
          onPress={async () => {
            await signOut();
          }}
        />

        <CustomButton1
          title={'Sign Out'}
          onPress={async () => {
            await signOut();
          }}
        />
      </SafeAreaView>
    );
  }
};

export default HomeScreen;
