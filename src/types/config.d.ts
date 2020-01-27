//
// config.d.ts
//
// Written by: Tyler Akins (2019/11/07 - 2020/01/15)
//

interface auth_options {
    OAUTH_TOKEN: string;
    SECRET?: string;
    CLIENT_ID?: string;
    ADMIN: string[];
}

interface discord_options extends auth_options {
    PERMISSIONS_VALUE: string;
    MOD_ROLES: string;
    DEV_TOKEN: string;
}
interface twitch_options extends auth_options {
    REPLY_TO_AUTO_ADD: boolean;
    ALERT_MISSED_BITS: boolean;
    CHANNELS: [string];
    AUTO_ADD: boolean;
    USERNAME: string;
}

interface mixer_options extends auth_options {
    /*
     * This is a list of channel IDs that the bot should watch messages for
     */
    CHANNELS: [number];

    /*
     * This is the User ID that the OAUTH_TOKEN belongs to.
     * The bot should use the chatbot example in Mixer's docs to get
     * the OAUTH_TOKEN if/when needed.
     */
    USER_ID: number;
}


interface bot_options {
    PREFIX: string;
    COOLDOWN_TIME: number;
    INVALID_PERM_ERROR: boolean;
    COOLDOWN_TYPE: "GLOBAL"|"COMMAND"|"SERVICE";
}



interface web_server_options {
    ROOT: string;
    PORT: number;
}



interface config {
    DEV: boolean;
    DATA_DIR: string;
    WEBSITE: string;
    twitch: twitch_options;
    discord: discord_options;
    mixer: mixer_options;
    bot: bot_options;
    webhooks: {
        LOGGING: string;
        ERROR?: string;
        TWITCH_MISSED_BITS?: string;
    };
    web: web_server_options;
}


type WEBHOOK_TYPE = "LOGGING"|"ERROR"|"TWITCH_MISSED_BITS"