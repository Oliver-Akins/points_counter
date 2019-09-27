interface chat_options {
    OAUTH_TOKEN: string;
    USERNAME: string;
    CHANNELS: [string];
}


interface bot_options {
    PREFIX: string;
    VERSION: string;
    CMD_COOLDOWN: number;
    GLOBAL_CMD_COOLDOWN: boolean;
}


interface api_options {
    SECRET: string;
    REDIRECT_URL: string;
    CLIENT_ID: string;
}


declare module "config.json" {
    const chat: chat_options;
    const bot: bot_options;
    const api: api_options;
}