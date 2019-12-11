//
// web_server.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/08)
//


/*
Templater For ExpressJS: https://github.com/Drulac/express-tl
Templater in general (for cmd bit): https://github.com/Drulac/template-literal
*/


import * as templater from "template-literal";
import { LOAD_CONFIG } from "../utils/Config";
import { commands } from "../cmd_handler";
import { PERM } from "../constants";
import * as express from "express";
import * as tl from "express-tl"
import * as path from "path";
import * as fs from "fs";



export const run_web_server = () => {

    const config = LOAD_CONFIG();
    const DOCS = path.resolve(config.web.ROOT)
    const VIEWS = DOCS + "/views";


    // Init server object
    const server = express();


    // Telling express to use the template literal renderer
    server.engine("tl", tl);
    server.set("views", VIEWS);
    server.set("view engine", "tl");

    // Changing default config values
    server.set("x-powered-by", false);



    // Index page
    server.get("/", (_, res) => {
        // Prevent caching when developing
        if (config.DEV) {res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");};
        res.render("index", {
            c: config
        });
    });



    // All commands
    server.get("/commands", (_, res) => {
        // Prevent caching when developing
        if (config.DEV) {res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");};

        let cmdTemplate = templater(fs.readFileSync(VIEWS + "/partials/cmd.tl"));

        let usr_cmds: string[] = [];
        let mod_cmds: string[] = [];
        let admin_cmds: string[] = [];

        // Iterate through each command parsing it:
        for (var cmd of commands) {
            switch (cmd.level) {
                case PERM.MOD:
                    mod_cmds.push(cmdTemplate({ "cmd": cmd }));
                    break;
                case PERM.ADMIN:
                    admin_cmds.push(cmdTemplate({ "cmd": cmd }));
                    break;
                case PERM.ALL:
                default:
                    usr_cmds.push(cmdTemplate({ "cmd": cmd }));
                    break;
            }
        };

        res.render("all_commands", {
            "c": config,
            "u_cmds": usr_cmds,
            "m_cmds": mod_cmds,
            "a_cmds": admin_cmds
        });
    });



    // Specific command page
    server.get("/command/:cmd", (req, res) => {
        let command = req.params.cmd;

        for (var cmd of commands) {
            if (cmd.group) {
                if (`${cmd.group}_${cmd.name}` === command) {
                    res.render("single_command", {
                        "c": config,
                        "cmd": cmd
                    });
                    return;
                };
            } else {
                if (cmd.name === command) {
                    res.render("single_command", {
                        "c": config,
                        "cmd": cmd
                    });
                    return;
                }
            }
        };
        res.render("errors/404", {
            "c": config,
            "command": command
        })
    });



    // Technical details
    server.get("/tech-specs", (_, res) => {
        res.render("tech-specs", {
            "c": config
        });
    });



    // CLI arguments
    server.get("/cli-args", (_, res) => {
        res.render("cli-args", {
            "c": config
        })
    });



    // Copyright
    server.get("/copyright", (_, res) => {
        res.render("copyright", {
            "c": config
        });
    });



    // Get the styles
    server.get("/style.css", (_, res) => {
        // Prevent caching when developing
        if (config.DEV) {res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");};
        res.sendFile(DOCS + "/style.css");
    });


    // Start the server so that we can actually server shit
    server.listen(config.web.PORT, () => {
        console.log(`[Web] Server listening on port ${config.web.PORT}`);
    });
};