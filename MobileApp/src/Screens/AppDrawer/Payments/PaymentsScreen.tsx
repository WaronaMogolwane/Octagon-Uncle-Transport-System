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
import {
  GetBalanceByBusinessId,
  GetDeclinedPaymentsSummary,
  GetPaymentsSummaryForThisMonth,
  GetUpcomingPaymentsSummary,
} from '../../../Controllers/PaymentsController';
import {Auth} from '../../../Classes/Auth';
import {AuthContext} from '../../../Services/AuthenticationService';
import {PaymentCard} from '../../../Components/Cards/PaymentCard';
import {RefreshControl, ScrollView} from '@gluestack-ui/themed';
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
  const [expectedPaymentsSummary, setExpectedPaymentsSummary] = useState({
    Amount: '',
    CurrentPeriod: '',
    NumberOfPayments: '',
  });
  const [declinedPaymentsSummary, setDeclinedPaymentsSummary] = useState({
    Amount: '',
    CurrentPeriod: '',
    NumberOfPayments: '',
  });
  const [refreshingPayments, setRefreshingPayments] = useState(false);
  const onRefreshPayments = React.useCallback(() => {
    setRefreshingPayments(true);
    setTimeout(() => {
      try {
        GetPaymentValues();
      } catch (error) {}
    }, 2000);
    setRefreshingPayments(false);
  }, []);
  const GetPaymentValues = () => {
    GetAvailableBalance(auth.GetBusinessId());
    GetPaymentsForThisMonth(auth.GetBusinessId());
    GetDeclinedPaymentSummary(auth.GetBusinessId());
  };
  const NavigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };
  const FormatBalance = (balance: string) => {
    const formatter = new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    });
    let newBalance = Number(
      balance.substring(0, balance.length - 2) +
        '.' +
        balance.substring(balance.length - 2),
    );
    return formatter.format(newBalance);
  };
  const GetAvailableBalance = async (businessId: string) => {
    return await GetBalanceByBusinessId(
      businessId,
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          setAvailableBalance(FormatBalance(result.Balance || '0'));
        }
      },
    );
  };
  const GetPaymentsForThisMonth = async (businessId: string) => {
    return await GetPaymentsSummaryForThisMonth(
      businessId,
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          const expectedPayments: any = result;
          expectedPayments.Amount = FormatBalance(
            expectedPayments.Amount || '0',
          );
          setExpectedPaymentsSummary(expectedPayments);
        }
      },
    );
  };
  const GetDeclinedPaymentSummary = async (businessId: string) => {
    return await GetDeclinedPaymentsSummary(
      businessId,
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          const declinedPayments: any = result;
          declinedPayments.Amount = FormatBalance(
            declinedPayments.Amount || '0',
          );
          setDeclinedPaymentsSummary(declinedPayments);
        }
      },
    );
  };
  useEffect(() => {
    GetPaymentValues();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView
        style={{}}
        contentContainerStyle={ThemeStyles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshingPayments}
            onRefresh={onRefreshPayments}
          />
        }>
        <View
          style={{
            height: '10%',
            width: '90%',
            marginTop: 8,
            marginBottom: 32,
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
        <PaymentCard
          PaymentsType="Expected"
          NumberOfPayments={expectedPaymentsSummary.NumberOfPayments || '0'}
          Amount={expectedPaymentsSummary.Amount}
          CurrentPeriod={expectedPaymentsSummary.CurrentPeriod}
        />
        <PaymentCard
          PaymentsType="Declined"
          NumberOfPayments={declinedPaymentsSummary.NumberOfPayments || '0'}
          Amount={declinedPaymentsSummary.Amount}
          CurrentPeriod={declinedPaymentsSummary.CurrentPeriod}
          HandlePress={() => NavigateToScreen('TransporterPaymentHistory')}
        />
        <View style={{width: '90%'}}>
          <CustomButton3
            title="Payment History"
            size="md"
            action="primary"
            styles={{marginTop: 16, alignSelf: 'flex-start'}}
            onPress={() => NavigateToScreen('TransporterPaymentHistory')}
          />
          <CustomButton3
            title="Banking Details"
            size="md"
            action="primary"
            styles={{marginTop: 8, alignSelf: 'flex-start'}}
          />
        </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default PaymentsScreen;
