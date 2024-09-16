import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../../Const/colors';
import {
  PassengerListActiveCardStyles,
  TripCardParentStyles,
} from '../../Stylesheets/GlobalStyles';
import {Card} from '@gluestack-ui/themed';
import {GraduationCap, MapPin, MoveDown} from 'lucide-react-native';

type activePassengerListCardProps = {
  passengerName: string;
  pickUpLocation: string;
  isActive: boolean;
  onPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};
const PassengerListAllCard = (props: activePassengerListCardProps) => {
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
  const arrowDownIcon = (
    <MoveDown size={50} strokeWidth={0.4} color={iconColor} />
  );

  const homeLocationIcon = (
    <MapPin size={iconSize} strokeWidth={iconStrokeWidth} color={iconColor} />
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
                <Text style={{fontSize: 16, fontWeight: '600'}}>
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
            marginTop: -10,
            marginBottom: 5,
            alignItems: 'flex-start',
            marginHorizontal: 15,
          }}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>
            {homeLocationIcon} {props.pickUpLocation}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default PassengerListAllCard;
