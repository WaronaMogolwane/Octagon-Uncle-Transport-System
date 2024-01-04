import {Text, StyleSheet, View, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../Const/colors';

type tripCardProps = {
  driverName: string;
  pickUpTime: string;
  pickUpDate: string;
  passengerName: string;
  pickUpLocation: string;
  isSuccess: number;
};

export const TripCard = (props: tripCardProps) => {
  const tripCompletion = () => {
    if (props.isSuccess == 0) {
      return null;
    } else if (props.isSuccess == 1) {
      return (
        <Text style={{color: COLORS.red, fontWeight: 'bold'}}>Uncompleted</Text>
      );
    } else if (props.isSuccess == 2) {
      return (
        <Text style={{color: COLORS.green, fontWeight: 'bold'}}>Completed</Text>
      );
    }
  };

  return (
    <View style={styles.cardBorder}>
      <View style={styles.cardContainer}>{tripCompletion()}</View>
      <View style={styles.cardContainer}>
        <View style={{marginEnd: 5}}>
          <Text style={styles.cardText}>Driver:</Text>
        </View>
        <View>
          <Text>{props.driverName}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>Pickup Time:</Text>
          <Text style={{marginEnd: 20}}>{props.pickUpTime}</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>Pickup Date:</Text>
          <Text>{props.pickUpDate}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={{marginEnd: 5}}>
          <Text style={styles.cardText}>Passenger:</Text>
        </View>
        <View>
          <Text>{props.passengerName}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>Location:</Text>
      </View>
      <View>
        <Text>{props.pickUpLocation}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 2,
    textAlign: 'center',
  },
  cardText: {
    fontWeight: 'bold',
  },
  cardBorder: {
    padding: 2,
    borderRadius: 10,
    borderWidth: 2,
    margin: 8,
    backgroundColor: '#E5E4E2',
  },
  Text: {
    color: '#000000',
  },
  cardElement: {},
});
