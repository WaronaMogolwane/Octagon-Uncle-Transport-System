import {View} from 'react-native';
import React from 'react';
import {Card, Text} from '@gluestack-ui/themed';

type TripSummaryProps = {
  allTripsCount: number;
  missedTripsCount: number;
  activeTripsCount: number;
  completedTripsCount: number;
};

export const TripSummaryBlock = ({
  allTripsCount,
  missedTripsCount,
  activeTripsCount,
  completedTripsCount,
}: TripSummaryProps) => {
  const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const d = new Date();
  let dayName = day[d.getDay()];

  return (
    <View>
      <Card
        size="sm"
        variant="outline"
        style={{
          marginBottom: 10,
          backgroundColor: '#ffffff',
          borderRadius: 5,
          elevation: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            marginBottom: 10,
            alignItems: 'flex-start',
            marginHorizontal: 15,
          }}>
          {dayName} <Text style={{fontWeight: '700'}}>Trips</Text>
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            alignItems: 'flex-start',
          }}>
          <View style={{flexDirection: 'column', width: '25%'}}>
            <Text
              style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>
              All Trips
            </Text>
            <Text
              style={{fontSize: 17, fontWeight: '500', textAlign: 'center'}}>
              {allTripsCount}
            </Text>
          </View>
          <View style={{flexDirection: 'column', width: '25%'}}>
            <Text
              style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>
              Missed
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '500',
                textAlign: 'center',
                color: '#c26b71',
              }}>
              {missedTripsCount}
            </Text>
          </View>
          <View style={{flexDirection: 'column', width: '25%'}}>
            <Text
              style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>
              Active
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '500',
                textAlign: 'center',
                color: '#c26b71',
              }}>
              {activeTripsCount}
            </Text>
          </View>
          <View style={{flexDirection: 'column', width: '25%'}}>
            <Text
              style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>
              Completed
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '500',
                textAlign: 'center',
                color: '#3ba2a9',
              }}>
              {completedTripsCount}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};
