import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Card} from '@gluestack-ui/themed';
import {GraduationCap, MapPin, User, User2} from 'lucide-react-native';

type pendingPassengerListCardProps = {
  passengerName: string;
  parentName: string;
  reason: string;
  isActive: boolean;
  onPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};
const PassengerListPendingCard = (props: pendingPassengerListCardProps) => {
  const iconSize = 18;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  const universityIcon = (
    <GraduationCap
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={iconColor}
    />
  );
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card
        size="sm"
        variant="outline"
        style={{
          marginHorizontal: 12,
          marginVertical: 7,
          backgroundColor: '#ffffff',
          borderRadius: 30,
          elevation: 5,
        }}>
        <View
          style={{
            marginBottom: 5,
            alignItems: 'flex-start',
            marginHorizontal: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              backgroundColor: '#ffffff',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>
                  {universityIcon} {props.passengerName}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 16, fontWeight: '600'}}>
                  {props.isActive ? (
                    <View
                      style={{
                        borderRadius: 20, // Half of the width or height
                        backgroundColor: '#d6f3f1',
                      }}>
                      <Text
                        style={{
                          color: '#3ba2a9',
                          fontWeight: '500',
                          padding: 5,
                        }}>
                        Active
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        borderRadius: 20, // Half of the width or height
                        backgroundColor: '#fadcdc',
                      }}>
                      <Text
                        style={{
                          color: '#c26b71',
                          fontWeight: '500',
                          padding: 5,
                        }}>
                        Not Active
                      </Text>
                    </View>
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginBottom: 5,
            alignItems: 'flex-start',
            marginHorizontal: 15,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Client name</Text>
          <Text style={{fontSize: 14, fontWeight: '600'}}>
            {props.parentName}
          </Text>
        </View>
        <View
          style={{
            marginTop: 5,
            marginBottom: 5,
            alignItems: 'flex-start',
            marginHorizontal: 15,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Reason</Text>
          <Text style={{fontSize: 14, fontWeight: '600'}}>{props.reason}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default PassengerListPendingCard;
