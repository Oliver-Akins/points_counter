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
        options = {
            uri: config.webhooks.LOGGING,
            body: {
                "content": "Log Entry:",
                "embeds": [
                    {
                        color: 43520,
                        title: context.title,
                        description: context.msg,
                        fields: []
                    }
                ]
            },
            json: true
        };

        // Add fields
        for (var field in context.fields) {
            options["body"]["embeds"][0]["fields"].push({
                name: field,
                value: context.fields[field],
                inline: true
            });
        };
    } else {
        options = {
            uri: config.webhooks.LOGGING,
            body: {
                "content": context.msg
            },
            json: true
        };
    };

    // Push to webhook
    requests.post(options)
    .catch((error: any) => {
        console.error("OHNO, Shit Went DOWWWNNNNNN");
    })
}


export const log_error = (payload: any) => {
    let config: config = LOAD_CONFIG();

    let options = {
        uri: config.webhooks.ERROR,
        body: payload,
        json: true
    };

    requests.post(options)
    .catch((error: any) => {
        console.error("OHNO, Shit Went DOWWWNNNNNN");
    });
}