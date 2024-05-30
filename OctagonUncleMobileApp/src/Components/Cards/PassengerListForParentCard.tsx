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
