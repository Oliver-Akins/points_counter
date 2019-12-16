import { LOAD_CONFIG } from "./Config"



export const DISCORD_MOD = (roles: string[]): boolean => {
    let config: config = LOAD_CONFIG();

    for (var role in roles) {
        if (config.discord.MOD_ROLES.includes(role)) {
            return true;
        };
    };
    return false;
}