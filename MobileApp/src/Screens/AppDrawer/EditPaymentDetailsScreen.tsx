import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {ArrowLeft, ArrowLeftIcon, FilePen, Icon} from 'lucide-react-native';
import {burger} from '@lucide/lab';
import {Button, ButtonIcon, ButtonText, ClockIcon} from '@gluestack-ui/themed';

const EditPaymentDetailsScreen = ({navigation}: any) => {
  const [cardNumber, setCardNumber] = useState('Card Number');
  return (
    <View>
      <View>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View
            style={{
              flexDirection: 'column',
              width: '50%',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              Next Payment Date
            </Text>
            <Text style={{fontSize: 18}}>08/05/2024</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: '50%',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Amount</Text>
            <Text style={{fontSize: 18}}>R 230.00</Text>
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'column', marginHorizontal: 20}}>
        <Text style={styles.label}>Email</Text>
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
          Change Card
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
                      navigation.navigate('Profile');
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
  label: {
    marginTop: 20,
  },
  input: {
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
    color: '#1E90FF',
    fontSize: 18,
  },
});

export default EditPaymentDetailsScreen;
