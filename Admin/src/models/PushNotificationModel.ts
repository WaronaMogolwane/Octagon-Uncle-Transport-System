//import { SERVER_HOST, SERVER_PORT } from '@env';
//require('dotenv').config()
import axios from 'axios';
import { PushNotificationObj } from '../classes/PushNotification';
const SERVER_HOST = "http://server.majorxp.co.za";
const SERVER_PORT = '9999';

export const SendPushNotification = async (pushNotification: PushNotificationObj, callback: (error: any, result: any) => void) => {
    let result: any;

    await axios
        .post(
            `${SERVER_HOST}:${SERVER_PORT}/push-notifications/send-to-all`,
            {

                token: pushNotification.token,
                body: pushNotification.body,
                title: pushNotification.title,
                image: pushNotification.image,
                userInfo: null,
                channelId: pushNotification.channelId

            },
        )
        .then((response: any) => {
            result = response.status;
            callback(null, result);
        })
        .catch((error: any) => {
            result = error;
            callback(result, null);
        });

    return result;
};