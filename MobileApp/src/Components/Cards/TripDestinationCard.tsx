import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MoveRight, MoveLeft} from 'lucide-react-native';
import COLORS from '../../Const/colors';

const TripDestinationCard = (leg: number) => {
  const iconStrokeWidth = 0.8;
  const iconSize = 35;

  if (leg == 0) {
    return (
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View style={{width: '33%'}}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '400'}}>
            Home
          </Text>
        </View>
        <View style={{width: '33%'}}>
          <MoveRight
            style={{alignSelf: 'center'}}
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={COLORS.green}
          />
        </View>
        <View style={{width: '33%'}}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '400'}}>
            Destination
          </Text>
        </View>
      </View>
    );
  } else if (leg == 1) {
    return (
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View style={{width: '33%'}}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '400'}}>
            Home
          </Text>
        </View>
        <View style={{width: '33%'}}>
          <MoveLeft
            style={{alignSelf: 'center'}}
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={COLORS.red}
          />
        </View>
        <View style={{width: '33%'}}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '400'}}>
            Destination
          </Text>
        </View>
      </View>
    );
  }
};

export default TripDestinationCard;
