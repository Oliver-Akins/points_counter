interface twitch_options {
    OAUTH_TOKEN: string;
    USERNAME: string;
    CHANNELS: string[];
    SECRET: string;
    CLIENT_ID: string;
}


interface bot_options {
    PREFIX: string;
    VERSION: string;
    CMD_COOLDOWN: number;
    GLOBAL_CMD_COOLDOWN: boolean;
}


interface api_options {
    REDIRECT_URL: string;
}


interface discord_options {
    OAUTH_TOKEN: string;
    SECRET: string;
    PERMISSIONS_VALUE: number;
    CLIENT_ID: string;
    MOD_ROLES: string[];
}


declare module "config.json" {
    const dev: boolean;
    const chat: twitch_options;
    const discord: discord_options;
    const bot: bot_options;
    const api: api_options;
}


interface character {
    names: [string];
    full_name: string;
    points: {
        "%anonymous%": number;
        "[key: string]": number;
    };
}