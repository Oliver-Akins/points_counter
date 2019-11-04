interface base_service {
    OAUTH_TOKEN: string;
    SECRET: string;
    CLIENT_ID: string;
    ADMIN: string[];
}

interface twitch_options extends base_service {
    USERNAME: string;
    CHANNELS: string[];
}

interface discord_options extends base_service {
    PERMISSIONS_VALUE: number;
    MOD_ROLES: string[];
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


interface config {
    dev: boolean;
    data_file: string;
    chat: twitch_options;
    discord: discord_options;
    bot: bot_options;
    api: api_options;
}

declare module "config.json" {
    const dev: boolean;
    const data_file: string;
    const chat: twitch_options;
    const discord: discord_options;
    const bot: bot_options;
    const api: api_options;
}


interface select {
    aliases: [string];
    proper_alias: string;
    total: number;
    points: {
        "%anonymous%": number;
        "[key: string]": number;
    };
}


interface cmd_meta {
    is_mod: boolean;
    is_admin: boolean;
    channel: string;
    username: string;
    platform: string;
}