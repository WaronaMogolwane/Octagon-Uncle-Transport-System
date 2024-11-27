import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from '../../../Components/Buttons';
import {ThemeStyles} from '../../../Stylesheets/GlobalStyles';
import {HandCoins, Baby, KeySquare, Bus} from 'lucide-react-native';
import {Pressable, View, Text} from 'react-native';
import {GetBalanceByBusinessId} from '../../../Controllers/PaymentsController';
import {Auth} from '../../../Classes/Auth';
import {AuthContext} from '../../../Services/AuthenticationService';
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

const PaymentsScreen = ({navigation}: any) => {
  const {session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [availableBalance, setAvailableBalance] = useState('0');

  const NavigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };
  const FormatBalance = (balance: string) => {
    const formatter = new Intl.NumberFormat('en-GP', {
      style: 'currency',
      currency: 'ZAR',
    });
    var x = Number(
      balance.substring(0, balance.length - 2) +
        '.' +
        balance.substring(balance.length - 2),
    );
    return formatter.format(x);
  };
  const GetAvailableBalance = async (businessId: string) => {
    return await GetBalanceByBusinessId(
      businessId,
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          setAvailableBalance(FormatBalance(result.Balance));
        }
      },
    );
  };

  useEffect(() => {
    GetAvailableBalance(auth.GetBusinessId());
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff75',
        width: '100%',
      }}>
      <View
        style={{
          alignSelf: 'center',
          height: '10%',
          width: '90%',
          // backgroundColor: '#59d863',
          marginTop: 10,
          marginBottom: 32,
          borderRadius: 5,
          justifyContent: 'center',
        }}>
        <View
          style={
            {
              // alignItems: 'center',
            }
          }>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginVertical: 'auto',
              }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  // color: 'white',
                  marginBottom: 4,
                }}>
                Available Balance
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 22,
                // color: 'white',
                fontWeight: '500',
                // alignSelf: 'center',
                marginBottom: 4,
              }}>
              {availableBalance}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          alignSelf: 'center',
          height: '20%',
          width: '90%',
          backgroundColor: '#59d863',
          marginTop: 10,
          marginBottom: 5,
          borderRadius: 5,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginVertical: 'auto',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  color: 'white',
                  marginBottom: 4,
                }}>
                Expected Amount
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 22,
                color: 'white',
                fontWeight: 'bold',
                alignSelf: 'center',
                marginBottom: 4,
              }}>
              R1000.00
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                fontWeight: '300',
                alignSelf: 'center',
              }}>
              (May - June)
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          alignSelf: 'center',
          height: '20%',
          width: '90%',
          backgroundColor: 'red',
          marginTop: 10,
          marginBottom: 5,
          borderRadius: 5,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginVertical: 'auto',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  color: 'white',
                  marginBottom: 4,
                }}>
                6 Missed Payments
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 22,
                color: 'white',
                fontWeight: 'bold',
                alignSelf: 'center',
                marginBottom: 4,
              }}>
              R1000.00
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                fontWeight: '300',
                alignSelf: 'center',
              }}>
              (May - June)
            </Text>
          </View>
        </View>
      </View>
      <CustomButton3
        title="Payment History"
        size="md"
        action="primary"
        styles={{marginTop: 16}}
        onPress={() => NavigateToScreen('TransporterPaymentHistory')}
      />
      <CustomButton3
        title="Banking Details"
        size="md"
        action="primary"
        styles={{marginTop: 16, width: '50%', alignSelf: 'center'}}
      />

      <CustomButton1
        title="WITHDRAW FUNDS"
        action="positive"
        size="lg"
        styles={{
          width: '50%',
          alignSelf: 'center',
          marginTop: 'auto',
          height: 48,
        }}
      />
    </SafeAreaView>
  );
};
export default PaymentsScreen;
