import {ChevronRight} from 'lucide-react-native';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {SettingCardProps} from '../../Props/SettingsCardProps';
import {SettingCardStyles} from '../../Stylesheets/GlobalStyles';

export const SettingsCard = (props: SettingCardProps) => {
  const iconSize = 40;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  return (
    <Pressable onPress={props.HandleOnPress}>
      <View style={SettingCardStyles.container}>
        <View style={SettingCardStyles.largeCardDivision}>
          <Text style={SettingCardStyles.titleText}>{props.Title}</Text>
          <Text style={SettingCardStyles.descriptionText}>
            {props.Description}
          </Text>
        </View>
        <View style={SettingCardStyles.smallCardDivision}>
          <ChevronRight
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={iconColor}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({});
