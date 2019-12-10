//
// config.d.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/07-2019/11/11)
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
    CHANNELS: [string];
    USERNAME: string;
}

interface mixer_options extends auth_options {
    /*
     * This is a list of channel IDs that the bot should watch messages for
     */
    CHANNELS: [number];

    /*
     * This is the User ID that the OAUTH_TOKEN belongs to.
     * The bot shoudl use the chatbot example in Mixer's docs to get
     * the OAUTH_TOKEN if/when needed.
     */
    USER_ID: number;
}


interface bot_options {
    PREFIX: string;
    VERSION: string;
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
        LOGGING?: string;
        ERROR?: string;
    };
    web: web_server_options;
}