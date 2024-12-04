import {Text, View} from 'react-native';
import React from 'react';
import {TripCardDriverStyles} from '../../Stylesheets/GlobalStyles';
import {Card} from '@gluestack-ui/themed';

type tripCardProps = {
  passengerName: string;
  dropOffTime: string;
  pickUpTime: string;
  pickUpDate: string;
  pickUpLocation: string;
  tripStatus: number;
};

export const TripCardTransporter = (props: tripCardProps) => {
  const tripStatus = () => {
    if (props.tripStatus == 1) {
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
        <View>
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
              <View style={{flexDirection: 'row'}}>
                <Text style={TripCardDriverStyles.cardText}>Pickup Time</Text>
                <Text style={{marginEnd: 20}}> {props.pickUpTime}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={TripCardDriverStyles.cardText}>Dropoff Time</Text>
                <Text style={{marginEnd: 20}}> {props.dropOffTime}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={TripCardDriverStyles.cardContainer}>
          <Text style={TripCardDriverStyles.cardText}>Location </Text>
          <Text>{props.pickUpLocation}</Text>
        </View>
      </View>
    </Card>
  );
};

export const TripCardTransporterComplete = (props: tripCardProps) => {
  const tripStatus = () => {
    if (props.tripStatus == 0) {
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
        <View>
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
              <View style={{flexDirection: 'row'}}>
                <Text style={TripCardDriverStyles.cardText}>Pickup Time</Text>
                <Text style={{marginEnd: 20}}> {props.pickUpTime}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={TripCardDriverStyles.cardText}>Dropoff Time</Text>
                <Text style={{marginEnd: 20}}> {props.dropOffTime}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={TripCardDriverStyles.cardContainer}>
          <Text style={TripCardDriverStyles.cardText}>Location </Text>
          <Text>{props.pickUpLocation}</Text>
        </View>
      </View>
    </Card>
  );
};
