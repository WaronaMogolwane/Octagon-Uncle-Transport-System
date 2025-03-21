import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from '../../../Components/Buttons';
import {cardCredit} from '@lucide/lab';
import {ThemeStyles} from '../../../Stylesheets/GlobalStyles';
import {
  HandCoins,
  Baby,
  KeySquare,
  Bus,
  ArrowLeftIcon,
  ClockIcon,
  Icon,
} from 'lucide-react-native';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  StyleSheet,
} from 'react-native';
import {
  GetBalanceByBusinessId,
  GetDeclinedPaymentsSummary,
  GetMonthlyPaymentDetails,
  GetPaymentsSummaryForThisMonth,
  GetUpcomingPaymentsSummary,
  GetUserCardAuthorizations,
  PayAmount,
  TokenizePaymentMethod,
} from '../../../Controllers/PaymentsController';
import {Auth} from '../../../Classes/Auth';
import {AuthContext} from '../../../Services/AuthenticationService';
import {
  Badge,
  BadgeText,
  Button,
  ButtonIcon,
  ButtonText,
  Card,
  Divider,
  FlatList,
  Heading,
  HStack,
  RefreshControl,
  ScrollView,
  Text,
  Toast,
  ToastTitle,
  useToast,
  View,
  VStack,
} from '@gluestack-ui/themed';
import {
  MonthlyPaymentDetailsCard,
  PaymentCard,
  PaymentMethodCard,
} from '../../../Components/Cards/PaymentCards';
import {useFormik} from 'formik';
import {
  GetBankingDetail,
  GetBanksList,
  UpdateBankingDetail,
} from '../../../Controllers/BankingDetailController';
import {BankingDetail} from '../../../Models/BankingDetail';
import * as yup from 'yup';
import BankingDetailModal from '../../../Components/Modals/BankingDetailModal';
import uuid from 'react-native-uuid';
import {useRoute} from '@react-navigation/native';
import {AuthorizationCharge} from '../../../Models/PaymentsModel';
import {MonthlyPaymentDetailsCardProps} from '../../../Props/PaymentCardProps';
import NotificationToast from '../../../Components/Toasts/NotificationToast';
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
  const [userRole, setUserRole] = useState<string>('');
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
