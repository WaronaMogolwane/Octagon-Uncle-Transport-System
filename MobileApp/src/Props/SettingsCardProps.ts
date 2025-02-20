import {GestureResponderEvent} from 'react-native';

export type SettingCardProps = {
  Title: string;
  Description: string;
  HandleOnPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};
