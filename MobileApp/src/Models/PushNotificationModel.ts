export class PushNotificationObj {
    title: string;
    body: string;
    image: string;
    icon?: string;
    userInfo?: any;
    channelId?: string;
    token?: string;
    subText?: string;
    bigText?: string;


    constructor(
        title: string,
        body: string,
        image: string,
        icon?: string,
        userInfo?: any,
        channelId?: string,
        token?: string,
        subText?: string,
        bigText?: string,

    ) {
        this.title = title;
        this.body = body;
        this.image = image;
        this.icon = icon;
        this.userInfo = userInfo;
        this.channelId = channelId;
        this.token = token;
        this.subText = subText;
        this.bigText = bigText;
    }
}