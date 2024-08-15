export class PushNotificationObj {
    title: string;
    body: string;
    image: string;
    userInfo?: any;
    channelId?: string;
    token?: string;
    subText?: string;
    bigText?: string;


    constructor(
        title: string,
        body: string,
        image: string,
        userInfo?: any,
        channelId?: string,
        token?: string,
        subText?: string,
        bigText?: string,

    ) {
        this.title = title;
        this.body = body;
        this.image = image;
        this.userInfo = userInfo;
        this.channelId = channelId;
        this.token = token;
        this.subText = subText;
        this.bigText = bigText;
    }
}