//
// message_metadata.d.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/07 - 2019/11/07)
//

interface msg_data {
    source: "Discord"|"Twitch";
    channel: string;
    message: string;
    test: boolean;
    level: number;
    user: string;
}