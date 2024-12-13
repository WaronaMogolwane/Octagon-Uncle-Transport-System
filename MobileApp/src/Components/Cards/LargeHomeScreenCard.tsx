import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from '@gluestack-ui/themed';
import {CarFront, GraduationCap, WalletMinimal} from 'lucide-react-native';

type largeCardProps = {
  primaryText: string;
  secondaryText: string;
  iconSelector: number;
};

const LargeHomeScreenCard = (props: largeCardProps) => {
  let colorString: string = '';

  if (props.iconSelector == 1) {
    colorString = '#d6f3f1';
  } else if (props.iconSelector == 2) {
    colorString = '#fadcdc';
  } else if (props.iconSelector == 3) {
    colorString = '#f5eede';
  }
  const smallIcon = () => {
    if (props.iconSelector == 1) {
      return <WalletMinimal size={25} strokeWidth={2} color={'#3ba2a9'} />;
    } else if (props.iconSelector == 2) {
      return <CarFront size={25} strokeWidth={2} color={'#c26b71'} />;
    } else if (props.iconSelector == 3) {
      return <GraduationCap size={25} strokeWidth={2} color={'#c26b71'} />;
    }
  };

  return (
    <Card
      size="sm"
      variant="outline"
      style={{
        marginTop: 5,
        marginHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        elevation: 10,
        justifyContent: 'center',
      }}>
      <View
        style={{
          alignItems: 'center', // Align items vertically
          justifyContent: 'center',
          display: 'flex', // Flexbox layout
        }}>
        <View
          style={{
            marginHorizontal: 12,
            width: 100,
            height: 100,
            borderRadius: 50, // Half of the width or height
            backgroundColor: colorString,
            flexDirection: 'row', // Horizontal arrangement
            alignItems: 'center', // Align items vertically
            justifyContent: 'center',
          }}>
          <Text>{smallIcon()}</Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 0,
              fontWeight: 'bold',
              color: '#4b4842',
            }}>
            {props.primaryText}
          </Text>
          <Text style={{fontSize: 10, textAlign: 'center'}}>
            {props.secondaryText}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default LargeHomeScreenCard;
