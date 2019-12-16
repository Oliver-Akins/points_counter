//
// message_metadata.d.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/07 - 2019/12/15)
//


type platform = "Discord"|"Twitch"


interface msg_data {
    cooldown: boolean;
    source: platform;
    channel: string;
    message: string;
    level: number;
    test: boolean;
    user: string;
}