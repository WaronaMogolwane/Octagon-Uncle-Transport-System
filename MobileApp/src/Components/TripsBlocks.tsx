import {View} from 'react-native';
import React from 'react';
import {CalendarDays, Car, GraduationCap, User} from 'lucide-react-native';
import {Card, Text} from '@gluestack-ui/themed';
import {ScrollView} from 'react-native-gesture-handler';

//  export interface TripType {
//   tripId: string;
//   driverName: string;
//   passengerName: string;
//   pickUpDate: string;
//   pickUpTime: string;
//   dropoffTime: string;
//   pickUpLocation: string;
//   dropoffLocation: string;
//   tripStatus: string;
// }

export const SpendingBlock = ({tripList}: {tripList: any[]}) => {
  const iconSize = 15;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  const icon = (
    <Car size={iconSize} strokeWidth={iconStrokeWidth} color={iconColor} />
  );
  const userIcon = (
    <User size={iconSize} strokeWidth={iconStrokeWidth} color={iconColor} />
  );
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

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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
        marginHorizontal: 12,
        marginTop: 5,
        marginBottom: 50,
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{gap: 5}}>
                    <Text
                      style={{
                        // color: 'white',
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      {userIcon} {item.driverName}
                    </Text>
                    <Text style={{}}>
                      {calenderIcon} {item.pickUpDate}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 16, fontWeight: '600'}}>
                      {universityIcon} {item.passengerName}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Card>
  );
};
