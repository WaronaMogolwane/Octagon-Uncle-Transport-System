import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {
  ArrowLeft,
  ArrowLeftIcon,
  CarFront,
  FilePen,
  Icon,
  WalletMinimal,
} from 'lucide-react-native';
import {burger} from '@lucide/lab';
import {
  Button,
  ButtonIcon,
  ButtonText,
  Card,
  ClockIcon,
} from '@gluestack-ui/themed';

const EditPaymentDetailsScreen = ({navigation}: any) => {
  const [cardNumber, setCardNumber] = useState('Card Number');
  return (
    <View style={{backgroundColor: '#e8f0f3', flex: 1}}>
      <View
        style={{
          marginBottom: '10%',
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginEnd: 15,
            width: '41.7%',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>
            Next Payment Date
          </Text>
          <Text style={{fontSize: 18}}>08/05/2024</Text>
        </View>

        <View
          style={{
            marginStart: 15,
            width: '41.7%',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>Amount</Text>
          <Text style={{fontSize: 18}}>R 230.00</Text>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 30,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>Card Number</Text>
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Email"
          value={cardNumber}
          onChangeText={(text: any) => {
            setCardNumber(text);
          }}
        />
        <Text
          onPress={() => {
            // setShowEmailModal(true);
          }}
          style={styles.changeAvatarButtonText}>
          add new card
        </Text>
      </View>

      <View style={{flexDirection: 'column', marginVertical: 30}}>
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{padding: 5}}>
                  <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={() => {
                      // navigation.navigate('Profile');
                    }}>
                    <ButtonIcon as={ClockIcon} style={{marginEnd: 5}} />
                    <ButtonText>Payment History</ButtonText>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'column', marginVertical: 70}}>
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{padding: 5}}>
                  <Button
                    size="md"
                    variant="solid"
                    action="secondary"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <ButtonIcon as={ArrowLeftIcon} style={{marginEnd: 5}} />
                    <ButtonText>Back</ButtonText>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    marginTop: 10,
    color: '#1E90FF',
    fontSize: 16,
  },
});

export default EditPaymentDetailsScreen;
