import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TripCardDriverStyles} from '../../Stylesheets/GlobalStyles';
import {Card, Center} from '@gluestack-ui/themed';
import {MoveLeft, MoveRight, WalletMinimal} from 'lucide-react-native';
import COLORS from '../../Const/colors';
import TripDestinationCard from './TripDestinationCard';

type tripCardSwipableProps = {
  passengerName: string;
  dropOffTime: string;
  pickUpTime: string;
  pickUpDate: string;
  pickUpLocation: string;
  tripStatus: number;
  leg: number;
  handlePickup: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
  handleDropoff: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
  handleAbsentPassenger: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const TripCardDriverSwipable = (props: tripCardSwipableProps) => {
  const [IsLoading, setIsLoading] = useState(false);
  const leftSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={props.handleAbsentPassenger}
        activeOpacity={0.6}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            borderRadius: 20, // Half of the width or height
            backgroundColor: '#fadcdc',
            width: 100,
            marginVertical: 10,
          }}>
          <Animated.Text
            style={{
              transform: [{scale: scale}],
              textAlign: 'center',
              color: '#c26b71',
              fontWeight: '500',
              padding: 5,
            }}>
            {props.tripStatus == 0 ? 'Absent' : 'Undo'}
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const rightSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    if (props.tripStatus == 0) {
      return (
        <TouchableOpacity onPress={props.handlePickup} activeOpacity={0.6}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              borderRadius: 20, // Half of the width or height
              backgroundColor: '#f5eede',
              width: 100,
              marginVertical: 10,
            }}>
            <Animated.Text
              style={{
                transform: [{scale: scale}],
                textAlign: 'center',
                color: '#e89d0e',
                fontWeight: '500',
                padding: 5,
              }}>
              Pick-up
            </Animated.Text>
          </View>
        </TouchableOpacity>
      );
    } else if (props.tripStatus == 2) {
      return (
        <TouchableOpacity onPress={props.handleDropoff} activeOpacity={0.6}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              borderRadius: 20, // Half of the width or height
              backgroundColor: '#d6f3f1',
              width: 100,
              marginVertical: 10,
            }}>
            <Animated.Text
              style={{
                transform: [{scale: scale}],
                textAlign: 'center',
                color: '#3ba2a9',
                fontWeight: '500',
                padding: 5,
              }}>
              Drop-off
            </Animated.Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const tripStatus = () => {
    if (props.tripStatus == 0) {
      return null;
    } else if (props.tripStatus == 1) {
      return (
        <View
          style={{
            borderRadius: 20, // Half of the width or height
            backgroundColor: '#fadcdc',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#c26b71',
              fontWeight: '500',
              padding: 5,
            }}>
            Uncompleted
          </Text>
        </View>
      );
    } else if (props.tripStatus == 2) {
      return (
        <View
          style={{
            borderRadius: 20, // Half of the width or height
            backgroundColor: '#f5eede',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#e89d0e',
              fontWeight: '500',
              padding: 5,
            }}>
            Picked-up
          </Text>
        </View>
      );
    } else if (props.tripStatus == 3) {
      return (
        <View
          style={{
            borderRadius: 20, // Half of the width or height
            backgroundColor: '#d6f3f1',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#3ba2a9',
              fontWeight: '500',
              padding: 5,
            }}>
            Completed
          </Text>
        </View>
      );
    }
  };

  return (
    <View>
      {IsLoading ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff75',
            zIndex: 100,
          }}>
          <ActivityIndicator size="large" />
          <Text>Working</Text>
        </View>
      ) : (
        <Swipeable
          renderLeftActions={leftSwipe}
          renderRightActions={rightSwipe}>
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
                marginVertical: 10,
                backgroundColor: '#ffffff',
                flex: 1,
                justifyContent: 'space-between',
                borderRadius: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  alignItems: 'center',
                }}>
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      textAlign: 'justify',
                    }}>
                    {props.passengerName}
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <View style={{marginStart: 10}}>{tripStatus()}</View>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <View style={{width: '50%'}}>
                  <Text style={TripCardDriverStyles.cardText}>Pickup Date</Text>
                  <Text>{props.pickUpDate}</Text>
                </View>
                <View style={{width: '50%'}}>
                  {props.pickUpTime == '' ||
                  props.pickUpTime == undefined ||
                  props.pickUpTime == null ? null : (
                    <View style={TripCardDriverStyles.cardContainer}>
                      <Text style={TripCardDriverStyles.cardText}>
                        Pickup Time
                      </Text>
                      <Text style={{marginEnd: 20}}> {props.pickUpTime}</Text>
                    </View>
                  )}
                </View>
              </View>

              {props.dropOffTime == '' ||
              props.dropOffTime == undefined ||
              props.dropOffTime == null ? null : (
                <View style={TripCardDriverStyles.cardContainer}>
                  <Text style={TripCardDriverStyles.cardText}>
                    Dropoff Time
                  </Text>
                  <Text style={{marginEnd: 20}}>{props.dropOffTime}</Text>
                </View>
              )}
              <View style={TripCardDriverStyles.cardContainer}>
                <View style={TripCardDriverStyles.cardContainer}>
                  <Text style={TripCardDriverStyles.cardText}>
                    Home Address
                  </Text>
                </View>
                <View>
                  <Text>{props.pickUpLocation}</Text>
                </View>
              </View>
              {TripDestinationCard(props.leg)}
            </View>
          </Card>
        </Swipeable>
      )}
    </View>
  );
};
