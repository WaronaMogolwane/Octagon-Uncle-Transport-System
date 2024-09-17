import {Card} from '@gluestack-ui/themed';
import {Car, User, CalendarDays, GraduationCap} from 'lucide-react-native';
import {ScrollView, View, Text} from 'react-native';
export const PassengerBlock = ({tripList}: {tripList: any[]}) => {
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

  const colorPicker = (isActive: boolean) => {
    let color: string;
    isActive ? (color = '#d6f3f1') : (color = '#fadcdc');

    return color;
  };

  return (
    <Card
      size="sm"
      variant="outline"
      style={{
        margin: 12,
        marginBottom: -90,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        elevation: 10,
      }}>
      <ScrollView>
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
          Active Passengers
        </Text>
        <View
          style={{
            marginVertical: 20,
            marginBottom: 5,
            alignItems: 'flex-start',
            marginHorizontal: 15,
          }}>
          {tripList.map(item => {
            return (
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  backgroundColor: '#ffffff',
                }}
                key={item.tripId}>
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
                      {universityIcon} {item.passengerName}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 16, fontWeight: '600'}}>
                      {item.isActive ? (
                        <View
                          style={{
                            flex: 1,
                            display: 'flex',
                            padding: -100,
                            borderRadius: 20, // Half of the width or height
                            backgroundColor: '#d6f3f1',
                          }}>
                          <Text
                            style={{
                              padding: -100,
                              color: '#3ba2a9',
                              fontWeight: '500',
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
                          <Text style={{color: '#c26b71', fontWeight: '500'}}>
                            Not Active
                          </Text>
                        </View>
                      )}
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
