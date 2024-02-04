export class PushNotificationObj {
    title: string;
    message: string;
    picture: string;
    userInfo?: any;
    channelId?: string;
    subText?: string;
    bigText?: string;


    constructor(
        title: string,
        message: string,
        picture: string,
        userInfo?: any,
        channelId?: string,
        subText?: string,
        bigText?: string,

    ) {
        this.title = title;
        this.message = message;
        this.picture = picture;
        this.userInfo = userInfo;
        this.channelId = channelId;
        this.subText = subText;
        this.bigText = bigText;
    }
}