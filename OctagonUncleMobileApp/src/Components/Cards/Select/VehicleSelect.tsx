import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

type VehicleSelectProps = {
  data:
    | {
        label: string;
        value: string;
      }[]
    | null;
  currentVehicle: string;
};

const VehicleSelect = (props: VehicleSelectProps) => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'grey'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.data || [{label: 'No Vehicles available.', value: '1'}]}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={
          !isFocus
            ? props.currentVehicle
              ? props.currentVehicle
              : 'No vehicle linked.'
            : 'Select a vehicle...'
        }
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default VehicleSelect;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
