import {View} from 'react-native';
import React, {useState} from 'react';
import {CalendarDays, Car, GraduationCap, User} from 'lucide-react-native';
import {Card, Text} from '@gluestack-ui/themed';
import {ScrollView} from 'react-native-gesture-handler';

export const TripsBlockDiver = ({tripList}: {tripList: any[]}) => {
  const iconSize = 15;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';
  let marginTopNumber: number = 0;
  let heightNumber: number = 0;
  let isEmpty: boolean;

  if (tripList.length == 0 || tripList[0] == '') {
    isEmpty = true;
    marginTopNumber = 5;
    heightNumber = 100;
  } else {
    heightNumber = 200;
    marginTopNumber = -20;
    isEmpty = false;
  }

  const calenderIcon = (
    <CalendarDays
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={iconColor}
    />
  );
  const universityIcon = (
    <GraduationCap
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={iconColor}
    />
  );

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
    <Card
      size="sm"
      variant="outline"
      style={{
        height: heightNumber,
        marginHorizontal: 12,
        marginTop: marginTopNumber,
        marginBottom: 100,
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
      <ScrollView>
        <View>
          {isEmpty ? (
            <View
              style={{
                marginBottom: 10,
                alignItems: 'flex-start',
                marginHorizontal: 15,
              }}>
              <Text style={{fontSize: 14, fontWeight: '600'}}>
                You have no trip today
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginBottom: 10,
                alignItems: 'flex-start',
                marginHorizontal: 15,
              }}>
              {tripList.map(item => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}
                    key={item.tripId}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        // justifyContent: 'space-evenly',
                      }}>
                      <View style={{gap: 5}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                          }}>
                          {calenderIcon} {item.pickUpDate}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginStart: 10,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                          }}>
                          {universityIcon} {item.passengerName}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </Card>
  );
};
