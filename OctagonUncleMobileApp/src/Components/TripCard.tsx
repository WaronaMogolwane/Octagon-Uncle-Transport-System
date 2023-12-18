import {Text, StyleSheet, View, Button} from 'react-native';
import React from 'react';

type tripCardProps = {
  driverName: string;
  pickUpTime: string;
  pickUpDate: string;
  passengerName: string;
  pickUpLocation: string;
};

export const TripCard = (props: tripCardProps) => {
  return (
    <View style={styles.cardBorder}>
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
