//
// message_metadata.d.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/07 - 2019/12/14)
//


type platform = "Discord"|"Twitch"|"Tests"


interface msg_data {
    source: platform;
    cooldown: boolean;
    channel: string;
    message: string;
    level: number;
    test: boolean;
    user: string;
}