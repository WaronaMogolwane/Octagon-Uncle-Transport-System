import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {TripCardDriverStyles} from '../../Stylesheets/GlobalStyles';
import {Card, Image} from '@gluestack-ui/themed';
import {Car} from 'lucide-react-native';

type tripCardProps = {
  registrationNumber: string;
  make: string;
  model: string;
  color: string;
  fullName: string;
  urlFront: string;
  onPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export const VehicleCard = (props: tripCardProps) => {
  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport';

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
            flexDirection: 'row',
            marginVertical: 10,
            backgroundColor: '#ffffff',
            flex: 1,
            // justifyContent: 'space-evenly',
            borderRadius: 20,
          }}>
          <View style={{alignItems: 'center', width: '50%'}}>
            <Image
              style={{
                width: 120,
                aspectRatio: 1 / 1,
                display: 'flex',
                marginHorizontal: 12,
                height: 120,
                borderRadius: 50, // Half of the width or height
                flexDirection: 'row', // Horizontal arrangement
              }}
              source={{
                uri: storageUrl + props.urlFront,
              }}
              alt="Vehicle front picture."
            />

            <View>
              <Text style={{marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>
                {props.registrationNumber}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              width: '50%',
            }}>
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Driver
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'normal',
                    textAlign: 'center',
                  }}>
                  {' '}
                  {props.fullName}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <View>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Make </Text>
              </View>
              <View>
                <Text style={{fontSize: 16, fontWeight: 'normal'}}>
                  {props.make}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <View>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Model </Text>
              </View>
              <View>
                <Text style={{fontSize: 16, fontWeight: 'normal'}}>
                  {props.model}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Color </Text>
              </View>
              <View>
                <Text style={{fontSize: 16, fontWeight: 'normal'}}>
                  {props.color}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
