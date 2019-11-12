//
// config.d.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/07-2019/11/08)
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
}
interface twitch_options extends auth_options {
    CHANNELS: [string];
    USERNAME: string;
    SCOPES: [string];
}


interface bot_options {
    PREFIX: string;
    VERSION: string;
    CMD_COOLDOWN: number;
    COOLDOWN_TYPE: "GLOBAL"|"COMMAND"|"SERVICE";
}


interface config {
    dev: boolean;
    data_dir: string;
    twitch: twitch_options;
    discord: discord_options;
    bot: bot_options;
    webhooks: {
        LOGGING?: string;
        ERROR?: string;
    }
}