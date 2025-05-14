import admin from "firebase-admin";
import { PushNotificationObj } from "../../Classes/PushNotification";
import { Logger } from "../../server";

/**
 * Validates push notification object.
 * @param pushNotification - The push notification object to validate.
 */
const validatePushNotification = (pushNotification: PushNotificationObj) => {
    if (!pushNotification.token && !pushNotification.channelId) {
        throw new Error("Either token or channelId must be provided.");
    }
    if (!pushNotification.title || !pushNotification.body) {
        throw new Error("Title and body are required for notifications.");
    }
};

/**
 * Handles sending a single notification.
 * @param {PushNotificationObj} pushNotification
 */
export const sendNotif = async (pushNotification: PushNotificationObj) => {
    try {
        validatePushNotification(pushNotification);

        Logger.Log("Preparing to send individual notification: " + pushNotification);

        const message = {
            notification: {
                title: pushNotification.title,
                body: pushNotification.body,
                image:
                    pushNotification.image ||
                    "https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport/Resources/Images/Octagon+Icon+Logo.png",
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
            token: pushNotification.token!,
        };

        const response = await admin.messaging().send(message);
        Logger.Log("Successfully sent individual notification: " + response);
    } catch (error) {
        Logger.Error("Error sending individual notification: " + error);
        throw error;
    }
};

/**
 * Handles sending notifications to a topic.
 * @param {PushNotificationObj} pushNotification
 */
export const sendNotifToAll = async (pushNotification: PushNotificationObj) => {
    try {
        validatePushNotification(pushNotification);

        Logger.Log("Preparing to send topic notification: " + pushNotification);

        const message = {
            data: {
                title: pushNotification.title,
                body: pushNotification.body,
                image: pushNotification.image || "",
                channelId: pushNotification.channelId || "General-Notifications",
            },
        };

        const response = await admin.messaging().sendToTopic("General", message);
        Logger.Log("Successfully sent topic notification: " + response);
    } catch (error) {
        Logger.Error("Error sending topic notification: S" + error);
        throw error;
    }
};
