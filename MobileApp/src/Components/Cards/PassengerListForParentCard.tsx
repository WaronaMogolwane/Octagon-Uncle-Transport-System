import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../../Const/colors';
import {TripCardParentStyles} from '../../Stylesheets/GlobalStyles';

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
  const activeStatus = () => {
    if (props.isActive == false) {
      return (
        <View>
          <Text style={{color: '#FF0000'}}>Not Active</Text>
        </View>
      );
    } else if (props.isActive == true) {
      return (
        <View>
          <Text style={{color: '#008000'}}>Active</Text>
        </View>
      );
    }
  };

  const deleteStatus = () => {
    if (props.isDeleted == true) {
      return (
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>
              Deletion Request:{' '}
            </Text>
          </View>
          <View>
            <Text style={{color: '#A020F0'}}>Delete requested</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={TripCardParentStyles.cardBorder}>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>
              Passenger Firstname:{' '}
            </Text>
          </View>
          <View>
            <Text>{props.firstName}</Text>
          </View>
        </View>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>
              Passenger Lastname:{' '}
            </Text>
          </View>
          <View>
            <Text style={{marginEnd: 10}}>{props.lastName}</Text>
          </View>
        </View>
        <View style={TripCardParentStyles.cardContainer}>
          <View>
            <Text style={TripCardParentStyles.cardText}>Active Status: </Text>
          </View>
          <View>{activeStatus()}</View>
        </View>
        {deleteStatus()}
      </View>
    </TouchableOpacity>
  );
};
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
