//
// list.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11)
//


import { LOAD } from "../../utils/db";


const LIST_OPTIONS = (ctx: msg_data, args: string[]) => {
    let channel = ctx.channel.replace(/\#/, "").replace(" ", "_");
};