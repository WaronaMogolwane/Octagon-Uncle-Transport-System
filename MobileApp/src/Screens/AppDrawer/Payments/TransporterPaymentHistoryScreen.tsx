import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  useToast,
} from '@gluestack-ui/themed';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {AuthContext} from '../../../Services/AuthenticationService';
import {Auth} from '../../../Classes/Auth';
import {Vehicle} from '../../../Models/VehicleModel';
import {PaymentHistoryCard} from '../../../Components/Cards/PaymentHistoryCards';
import filter from 'lodash.filter';
import {ThemeStyles} from '../../../Stylesheets/GlobalStyles';
import {
  GetBusinessPayments,
  PayAmount,
} from '../../../Controllers/PaymentsController';
import {FormatBalance} from '../../../Utilities/CurrencyFormat';
import {AuthorizationCharge} from '../../../Models/PaymentsModel';
const {v4: uuidv4} = require('uuid');
import uuid from 'react-native-uuid';
const TransporterPaymentHistoryScreen = () => {
  const {session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [paymentsList, setPaymentsList] = useState([]);
  const [refreshingPayments, setRefreshingPayments] = useState(false);
  const [userRole, setUserRole] = useState(0);

  const onRefreshPayments = React.useCallback(() => {
    setRefreshingPayments(true);
    setTimeout(() => {
      try {
        GetAllBusinessPayments(auth.GetBusinessId());
      } catch (error) {}
    }, 2000);
    setRefreshingPayments(false);
  }, []);
  const [IsLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const GetAllBusinessPayments = async (businessId: string) => {
    return await GetBusinessPayments(businessId, (error: any, result: any) => {
      if (error) {
        console.error(error.response.data);
      } else {
        setPaymentsList(result);
      }
    });
  };

  const RefreshData = () => {
    try {
      onRefreshPayments();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query;
    const filterData: any = filter(paymentsList, (user: any) => {
      return contains(user, formattedQuery);
    });
    setPaymentsList(filterData);
  };
  const contains = (vehicle: Vehicle, formattedQuery?: string) => {
    if (vehicle.Model || vehicle.Make || vehicle.LicenseNumber) {
      return true;
    }
    return false;
  };

  const PayNow = async (amount: string) => {
    const authorizationCharge: AuthorizationCharge = {
      email: 'mogolwanew@gmail.com',
      amount: amount,
      authorization_code: 'AUTH_efz5240h2i',
      reference: 'CA-{0}'.format(uuid.v4()),
      metadata: {
        user_id: 'f0628b1a-23e5-4f34-b3ff-d036cd7feadb',
        transporter_user_id: '856f9966-968c-478a-92ed-d95a52ac0225',
      },
    };
    await PayAmount(authorizationCharge, (error: any, result: any) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    });
  };
  useEffect(() => {
    RefreshData();
    //setUserRole(Number(auth.GetUserRole()));
    setUserRole(2);
  }, []);
  return (
    <SafeAreaView style={ThemeStyles.container}>
      {IsLoading ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff75',
            zIndex: 100,
          }}>
          <ActivityIndicator size="large" />
          <Text>Saving</Text>
        </View>
      ) : null}

      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <View>
          <TextInput
            placeholder="Search"
            clearButtonMode="always"
            autoCapitalize="none"
            style={styles.searchBox}
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(query: string) => handleSearch(query)}
          />

          {paymentsList ? (
            <FlatList
              height={'$full'}
              data={paymentsList}
              extraData
              renderItem={({item}: any) => (
                <PaymentHistoryCard
                  Amount={FormatBalance(item.Amount.toString() || '0')}
                  FirstName={item.FirstName}
                  LastName={item.LastName}
                  Status={item.Status}
                  Date={item.DatePaid}
                  UserRole={userRole}
                  HandleCardPress={() => {}}
                />
              )}
              keyExtractor={(item: any) => item.TransactionId}
              refreshControl={
                <RefreshControl
                  refreshing={refreshingPayments}
                  onRefresh={onRefreshPayments}
                />
              }
            />
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshingPayments}
                  onRefresh={onRefreshPayments}
                />
              }>
              <Text>You currently have no payments.</Text>
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  searchBox: {
    width: '100%',
    marginVertical: 4,
    paddingHorizontal: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default TransporterPaymentHistoryScreen;
