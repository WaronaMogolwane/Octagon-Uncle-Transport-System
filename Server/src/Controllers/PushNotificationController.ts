import { NextFunction, Request, Response } from "express";
import { PushNotificationObj } from "../Classes/PushNotification";
import { sendNotif } from "../Services/Firebase/PushNotificationsService";

export const SendPushNotificationToDevice = async (req: Request, res: Response, next: NextFunction) => {
    // notifications.js
    const requestBody: any = req.body;
    try {
        let token = requestBody.token // Replace with the actual FCM token
        if (!token || typeof token !== 'string') {
            throw new Error('Invalid FCM token provided');
        }
        const pushNotification: PushNotificationObj = ({
            title: requestBody.title,
            body: requestBody.body,
            image: requestBody.image,
            channelId: requestBody.channelId,
            token: requestBody.token
        })
        await sendNotif(pushNotification);
        res.json({
            status: "success",
        });
    } catch (error) {
        console.error("Notification API error:", error.message);
        res.status(500).json({
            status: "fail",
            error: error.message,
        });
    }

}