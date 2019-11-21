//
// list.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11)
//


import { LOAD } from "../../utils/db";


const LIST_OPTIONS = (ctx: msg_data, args: string[]): string|void => {
    let channel = ctx.channel.replace(/\#/, "").replace(" ", "_");

    let data = LOAD(channel);

    let names: string[] = [];

    for (var option of data) {
        names.push(option.name);
    };

    let response = `Possible options: ${names.join(", ")}`;

    switch (ctx.source) {
        case "Discord":
            break;
        case "Twitch":
            break;
    }
};