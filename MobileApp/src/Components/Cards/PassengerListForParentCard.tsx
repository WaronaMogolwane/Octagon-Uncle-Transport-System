import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import COLORS from '../../Const/colors';
import {TripCardParentStyles} from '../../Stylesheets/GlobalStyles';
import {Card} from '@gluestack-ui/themed';
import {GraduationCap} from 'lucide-react-native';

type PassengerParentCardCardProps = {
  firstName: string;
  lastName: string;
  isActive: boolean;
  isDeleted: boolean;
  onPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const PassengerParentCard = (props: PassengerParentCardCardProps) => {
  const passengerName = `${props.firstName} ${props.lastName}`;
  const iconSize = 15;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  const universityIcon = (
    <GraduationCap
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={iconColor}
    />
  );

  const deleteStatus = () => {
    if (props.isDeleted == true) {
      return (
        <View
          style={{
            borderRadius: 20, // Half of the width or height
            backgroundColor: '#fadcdc',
          }}>
          <Text style={{color: '#c26b71', fontWeight: '500', padding: 5}}>
            Delete Requested
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card
        size="sm"
        variant="outline"
        style={{
          margin: 12,
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
                <Text style={{fontSize: 16, fontWeight: '600'}}>
                  {universityIcon} {passengerName}
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

          {deleteStatus()}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
