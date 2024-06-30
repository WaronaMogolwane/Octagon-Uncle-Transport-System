import {View, Text} from 'react-native';
import React from 'react';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed';

const NotificationToast = (props: {
  IsSuccess: boolean;
  Title: string;
  Message: string;
  ToastId: string;
}) => {
  return props.IsSuccess ? (
    <Toast nativeID={props.ToastId} action="success" variant="solid">
      <VStack space="xs">
        <ToastTitle>{props.Title}</ToastTitle>
        <ToastDescription>{props.Message}</ToastDescription>
      </VStack>
    </Toast>
  ) : (
    <Toast nativeID={props.ToastId} action="error" variant="solid">
      <VStack space="xs">
        <ToastTitle>{props.Title}</ToastTitle>
        <ToastDescription>{props.Message}</ToastDescription>
      </VStack>
    </Toast>
  );
};

export default NotificationToast;
