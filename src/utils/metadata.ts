//
// metadata.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/13 - 2019/12/18)
//


import { LOAD_CONFIG } from "./Config";
import { LOAD_LINKS } from "./links";


const config: config = LOAD_CONFIG();



export const RESOLVE_CHANNEL = (ctx: msg_data, link_resolutions=5): string => {

    // Replace octothorpes if not a test message
    if (!ctx.test) { ctx.channel = ctx.channel.replace(/#/g, ""); };

    // Clear all spaces
    ctx.channel = ctx.channel.replace(/ /g, "_");


    const links = LOAD_LINKS();


    let resolves = 0;

    while (resolves < link_resolutions && links[ctx.channel]) {
        ctx.channel = links[ctx.channel];
        resolves++;
    };

    return ctx.channel;
};



export const RESOLVE_CHANNEL_STRING = (channel: string, link_resolutions=5): string => {

    channel = channel.replace(/#/g, "").replace(/ /g, "_");

    const links = LOAD_LINKS();


    let resolves = 0;

    while (resolves < link_resolutions && links[channel]) {
        channel = links[channel];
        resolves++;
    };

    return channel;
};