
// sendNotif.js
import admin from "firebase-admin";
import { PushNotificationObj } from "../../Classes/PushNotification";
import { channel } from "diagnostics_channel";
import WinstonLogger from "../../Utilities/WinstonLogger";


export const sendNotif = async (pushNotification: PushNotificationObj) => {
    try {
        if (!pushNotification.token || typeof pushNotification.token !== 'string') {
            throw new Error('Invalid FCM token provided');
        }
        WinstonLogger.info(pushNotification)
        const message = {
            notification: {
                title: pushNotification.title,
                body: pushNotification.body,
                image: "https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport/Resources/Images/Octagon+Icon+Logo.png",

            },
            android: {
                notification: {
                    sound: "default",
                },
                data: {
                    title: pushNotification.title,
                    body: pushNotification.body,
                    channelId: "General-Notifications",
                    image: pushNotification.image,

                },
            },
            token: pushNotification.token,
        };
        const response = await admin.messaging().send(message);
        WinstonLogger.info("Successfully sent message:", response);
    } catch (error) {
        console.error("Error sending message:", error.message);
        throw error;
    }
};
export const sendNotifToAll = async (pushNotification: PushNotificationObj) => {
    try {
        // if (pushNotification.token || typeof pushNotification.token == 'string') {
        //     throw new Error('Invalid FCM token provided');
        // }
        WinstonLogger.info(pushNotification)
        const message = {
            data: {
                title: pushNotification.title,
                body: pushNotification.body,
                image: pushNotification.image,
                channelId: pushNotification.channelId

            }
        }

        const response = await admin.messaging().sendToTopic("General", message)
        WinstonLogger.info("Successfully sent message:", response);
    } catch (error) {
        console.error("Error sending message:", error.message);
        throw error;
    }
};