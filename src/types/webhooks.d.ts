//
// webhooks.d.ts
//
// Written by: Tyler Akins (2019/11/11)
//


interface log_data {
    msg: string;
    title?: string;
    embed?: boolean;
    fields?: object;
    no_stdout?: boolean;
}