export class LINE {
    token: string;
    constructor(token: string) {
        this.token = token;
    }
    send(userid: string, message: string) {
        //apiルート
        const API_URL = "https://api.line.me/v2/bot/message/push";

        UrlFetchApp.fetch(
            API_URL,
            {
                "method": "post",
                "headers": {
                    "Content-Type": "application/json; charset=UTF-8",
                    'Authorization': `Bearer ${this.token}`,
                },
                "payload": JSON.stringify({
                    "to": userid,
                    "messages": [
                        {
                            'type': 'text',
                            'text': message
                        }
                    ]
                })
            }
        );
    }
}