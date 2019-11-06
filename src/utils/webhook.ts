//
// webhook.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/10/31)
//


import * as requests from "request-promise-native";
import * as config from "../config.json";


export const PUSH = (payload: any) => {
    if (config.dev) { return; };

    let options = {
        uri: config.LOGGING_WEBHOOK,
        body: payload,
        json: true
    };

    requests.post(options)
    .catch((error: any) => {
        console.error("OHNO, Shit Went DOWWWNNNNNN");
    });
}