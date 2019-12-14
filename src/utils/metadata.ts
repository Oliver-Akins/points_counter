//
// metadata.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/13)
//


import { LOAD_CONFIG } from "./Config";
import { readFileSync } from "fs";
import { resolve } from "path";


const config: config = LOAD_CONFIG();



export const RESOLVE_CHANNEL = (ctx: msg_data, link_resolutions=5): string => {

    // Replace octothorpes if not a test message
    if (!ctx.test) { ctx.channel = ctx.channel.replace(/#/g, ""); };

    // Clear all spaces
    ctx.channel = ctx.channel.replace(/ /g, "_");


    const links = JSON.parse(
        // @ts-ignore
        readFileSync(resolve(`${config.DATA_DIR}/#links#.json`))
    );


    let resolves = 0;

    while (resolves < link_resolutions && links[ctx.channel]) {
        ctx.channel = links[ctx.channel];
        resolves++;
    };

    return ctx.channel;
};