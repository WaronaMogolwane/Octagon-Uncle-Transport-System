import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  GestureResponderEvent,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';

import {TripCardDriverStyles} from '../../Stylesheets/GlobalStyles';
// import {Image} from '@gluestack-ui/themed';

type profileCardProps = {
  imageUri: string;
  label: string;
  handleOnPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const ProfileCard = (props: profileCardProps) => {
  return (
    <TouchableOpacity onPress={props.handleOnPress}>
      <View style={styles.box}>
        <Image
          alt="Information Cards"
          style={styles.image}
          source={{uri: props.imageUri}}
        />
        <Text style={styles.username}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
  },
  image: {
    width: 60,
    height: 60,
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
});
