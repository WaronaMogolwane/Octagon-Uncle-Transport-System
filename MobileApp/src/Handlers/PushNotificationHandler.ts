import { PushNotificationObj } from './../Models/PushNotificationModel';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import { useEffect } from "react";
import { PermissionsAndroid } from 'react-native';
const RegisterGeneralChannel = () => {
    PushNotification.createChannel(
        {
            channelId: "General-Notifications", // (required)
            channelName: "All Devices", // (required)
            channelDescription: "A channel to for global push notifications", // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => {
            //console.log(`createChannel returned '${created}'`) 
        } // (optional) callback returns whether the channel was created, false means it already existed.
    );
}
const SubscribeToNotificationsTopic = (topic: string) => {
    messaging().subscribeToTopic(topic);
}
const RegisterBackgroundMessageHandler = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
    });
}
export const SendLocalPushNotification = (notification: PushNotificationObj) => {
    PushNotification.localNotification({
        /* Android Only Properties */

        channelId: notification.channelId, // (required) channelId, if the channel doesn't exist, notification will not trigger.
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        largeIconUrl: notification.picture, // (optional) default: undefined
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        bigText: notification.message, // (optional) default: "message" prop
        subText: notification.message, // (optional) default: none
        bigPictureUrl: notification.picture, // (optional) default: undefined
        bigLargeIcon: "ic_launcher", // (optional) default: undefined
        bigLargeIconUrl: notification.picture, // (optional) default: undefined
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting

        //actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
        invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
        /* iOS and Android properties */
        //id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        title: notification.title, // (optional)
        message: notification.message, // (required)
        picture: notification.picture, // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
        userInfo: notification.userInfo, // (optional) default: {} (using null throws a JSON value '<null>' error)
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
};
export const ConfigurePushNotifications = () => {
    RegisterBackgroundMessageHandler();
    RegisterGeneralChannel();
    SubscribeToNotificationsTopic("General");
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.info("PUSH NOTIFICATION TOKEN:", token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            //console.log("NOTIFICATION:", notification);
            // process the notification
            let pushNotification = new PushNotificationObj(
                notification.data.title,
                notification.data.body,
                notification.data.image,
                notification.data.userInfo,
                notification.data.channelId
            )
            if (!notification.userInteraction) {
                SendLocalPushNotification(pushNotification);
            }
            // (required) Called when a remote is received or opened, or local notification is opened
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            // console.log("ACTION:", notification.action);
            // console.log("NOTIFICATION:", notification);

            // process the action
        },
        onRemoteFetch(notificationData) {
            //console.log("remore fetch" + notificationData);
        },


        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            throw new Error(err.message + err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,

    });
    PushNotification.popInitialNotification(notification => {
        //console.log(notification);
    })
}