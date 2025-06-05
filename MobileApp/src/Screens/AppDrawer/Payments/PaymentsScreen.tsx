import React, {useContext, useEffect, useState} from 'react';
import {Auth} from '../../../Classes/Auth';
import {AuthContext} from '../../../Services/AuthenticationService';
import ClinetsPaymentsScreen from './ClientPaymentsScreen';
import TransporterPaymentsScreen from './TransporterPaymentsScreen';

String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

const PaymentsScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {trxref, reference} = route.params || {};
  const {session}: any = useContext(AuthContext);

  const [auth] = useState(() => new Auth(session)); // Avoid unnecessary state updates
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    setUserRole(auth.GetUserRole());
  }, [reference]);

  if (userRole == '1') {
    return (
      <TransporterPaymentsScreen
        navigation={navigation}
        route={route}
        setUserRole={setUserRole}
        userRole={userRole}
      />
    );
  }
  if (userRole == '2') {
    return (
      <ClinetsPaymentsScreen
        navigation={navigation}
        route={route}
        setUserRole={setUserRole}
        userRole={userRole}
      />
    );
  }
};
export default PaymentsScreen;
