//
// message_metadata.d.ts
//
// Written by: Tyler Akins (2019/11/07 - 2020/01/04)
//


type platform = "Discord"|"Twitch"


interface msg_data {
    cooldown: boolean;
    source: platform;
    channel: string;
    message: string;
    flags?: string[];
    level: number;
    test: boolean;
    user: string;
}