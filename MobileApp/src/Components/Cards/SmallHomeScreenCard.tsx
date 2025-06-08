import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SmallHomeScreenCardStyles} from '../../Stylesheets/GlobalStyles';

type smallCardProps = {
  primaryText: string;
  secondaryText: string;
};

const SmallHomeScreenCard = (props: smallCardProps) => {
  return (
    <View style={SmallHomeScreenCardStyles.cardContainer}>
      <Text style={SmallHomeScreenCardStyles.primaryText}>
        {props.primaryText}
      </Text>
      <Text style={SmallHomeScreenCardStyles.secondaryText}>
        {props.secondaryText}
      </Text>
    </View>
  );
};

export default SmallHomeScreenCard;
