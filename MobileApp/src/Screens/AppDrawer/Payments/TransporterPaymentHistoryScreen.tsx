import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  useToast,
} from '@gluestack-ui/themed';
import React, {useContext, useEffect, useState} from 'react';
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
import {GetVehicles} from '../../../Controllers/VehicleController';
import NotificationToast from '../../../Components/Toasts/NotificationToast';
import {PaymentHistoryCard} from '../../../Components/Cards/PaymentHistoryCards';
import filter from 'lodash.filter';
import {ThemeStyles} from '../../../Stylesheets/GlobalStyles';
import {GetBusinessPayments} from '../../../Controllers/PaymentsController';
import {FormatBalance} from '../../../Utilities/CurrencyFormat';

const TransporterPaymentHistoryScreen = ({route, navigation}: any) => {
  const {session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [VehicleList, setVehicleList] = useState([]);
  const [refreshingVehicles, setRefreshingVehicles] = useState(false);
  const onRefreshVehicles = React.useCallback(() => {
    setRefreshingVehicles(true);
    setTimeout(() => {
      try {
        GetBusinessVehicles(auth.GetBusinessId());
      } catch (error) {}
    }, 2000);
    setRefreshingVehicles(false);
  }, []);
  const [IsLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toast = useToast();

  const GetBusinessVehicles = async (businessId: string) => {
    return await GetBusinessPayments(businessId, (error: any, result: any) => {
      if (error) {
        console.error(error.response.data);
      } else {
        setVehicleList(result);
      }
    });
  };

  const RefreshData = () => {
    try {
      onRefreshVehicles();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query;
    const filterData: any = filter(VehicleList, (user: any) => {
      return contains(user, formattedQuery);
    });
    setVehicleList(filterData);
  };
  const contains = (vehicle: Vehicle, query: any) => {
    if (vehicle.Model || vehicle.Make || vehicle.LicenseNumber) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    RefreshData();
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

          {VehicleList ? (
            <FlatList
              height={'$full'}
              data={VehicleList}
              extraData
              renderItem={({item}: any) => (
                <PaymentHistoryCard
                  Amount={FormatBalance(item.Amount.toString() || '0')}
                  FirstName={item.FirstName}
                  LastName={item.LastName}
                  Status={item.Status}
                  Date={item.DatePaid}
                  HandlePress={() => {}}
                />
              )}
              keyExtractor={(item: any) => item.TransactionId}
              refreshControl={
                <RefreshControl
                  refreshing={refreshingVehicles}
                  onRefresh={onRefreshVehicles}
                />
              }
            />
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshingVehicles}
                  onRefresh={onRefreshVehicles}
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
