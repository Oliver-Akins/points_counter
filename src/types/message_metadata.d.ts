//
// message_metadata.d.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/07 - 2019/12/12)
//

interface msg_data {
    source: "Discord"|"Twitch";
    cooldown: boolean;
    channel: string;
    message: string;
    level: number;
    test: boolean;
    user: string;
}