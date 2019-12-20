//
// webhook.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11)
//


import * as requests from "request-promise-native";
import { LOAD_CONFIG } from "./Config";


const config: config = LOAD_CONFIG();



export const log = (context: log_data) => {


    // Should we output the data to the console, ensure the data is console-outputable
    if (config.DEV && !context.no_stdout) {
        console.log(context.msg);
        return;
    };


    let options: object;

    // Are we embedding the response or not?
    if (context.embed) {
        let payload = {
            "content": "Log Entry:",
            "embeds": [
                {
                    color: 43520,
                    title: context.title,
                    description: context.msg,
                    fields: []
                }
            ]
        };

        // Add fields
        for (var field in context.fields) {
            payload.embeds[0].fields.push({
                name: field,
                value: context.fields[field],
                inline: true
            });
        };

        push(payload, "LOGGING")
    } else {
        push({
            "content": context.msg
        }, "LOGGING");
    };
};



export const log_error = (payload: any) => {
    push(payload, "ERROR");
};



export const push = (payload: any, webhook: WEBHOOK_TYPE) => {
    requests.post({
        uri: config.webhooks[webhook],
        body: payload,
        json: true
    }).catch((_: any) => {
        console.error("OHNO, Shit Went DOWWWNNNNNN");
    });
};