import React, {ChangeEvent, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

type DriverSelectProps = {
  data:
    | {
        label: string;
        value: string;
      }[]
    | null;
  currentDriverId: string | null;
  onDriverChange: (e: string | ChangeEvent<any>) => void;
  setNewLinkedDriver: React.Dispatch<React.SetStateAction<string>>;
};

const DriverSelect = (props: DriverSelectProps) => {
  const [value, setValue] = useState<any>(props.currentDriverId);
  const [isFocus, setIsFocus] = useState(false);
  const SetVal = () => {};
  useEffect(() => {
    //setValue(props.currentDriver);
  }, [value]);
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'grey'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{height: '80%'}}
        data={props.data || [{label: 'No Drivers available.', value: '1'}]}
        search={true}
        labelField="label"
        valueField="value"
        confirmSelectItem={true}
        mode="modal"
        placeholder={
          !isFocus
            ? props.currentDriverId
              ? 'A driver is lnked to this vehicle.'
              : 'No driver linked.'
            : 'Select a driver...'
        }
        searchPlaceholder="Search..."
        value={value}
        onChangeText={props.onDriverChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          props.setNewLinkedDriver(item.value);
        }}
      />
    </View>
  );
};

export default DriverSelect;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  dropdown: {
    height: 45,
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
