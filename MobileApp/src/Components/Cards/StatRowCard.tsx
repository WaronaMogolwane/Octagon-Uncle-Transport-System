import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  SmallHomeScreenCardStyles,
  StatRowCardStyles,
} from '../../Stylesheets/GlobalStyles';

type statRowCardProps = {
  primaryText: string;
  secondaryText: string;
  tetiaryText: string;
};

const StatRowCard = (props: statRowCardProps) => {
  return (
    <View style={StatRowCardStyles.statRow}>
      <View style={{flexDirection: 'column'}}>
        <Text style={StatRowCardStyles.statLabel}>{props.primaryText}</Text>
        <Text style={StatRowCardStyles.statValue}>{props.secondaryText}</Text>
      </View>
      <View style={StatRowCardStyles.statValues}>
        <Text style={StatRowCardStyles.statTotal}>{props.tetiaryText}</Text>
      </View>
    </View>
  );
};

export default StatRowCard;
