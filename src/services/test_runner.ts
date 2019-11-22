//
// test_runner.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/17 - 2019/11/20)
//


import { CREATE, LOAD, WRITE, DELETE } from "../utils/db";
import { HANDLE_MESSAGE } from "../cmd_handler";
import { LOAD_CONFIG } from "../utils/Config";
import { tests } from "../utils/tests";
import * as path from "path";
import * as fs from "fs";


const config = LOAD_CONFIG();
var fail_count = 0;


export const run_tests = (silent: boolean) => {

    // Run through each test
    for (var test of tests) {

        let filepath = path.resolve(config.DATA_DIR) + `/${test.msg_meta.channel}.json`;

        // Check to see if the test needs a datafile and if it doesn't exist
        switch (test.datafile_should_exist) {
            case "EXISTS":

                let data: option[];

                // Reset the file if it exists already so we know EXACTLY
                // what data is inside of it
                if (fs.existsSync(filepath)) {
                    data = [];
                } else {
                    CREATE(test.msg_meta.channel);
                    data = [];
                };


                // Add some random data to the file to be able to manipulate
                data.push({
                    "aliases": ["potato"],
                    "name": "Potato",
                    "data_version": "2.0",
                    "points": {},
                    "total": 0
                });
                data.push({
                    "aliases": ["green", "eggs"],
                    "name": "Green",
                    "data_version": "2.0",
                    "points": {},
                    "total": 0
                });

                // Save the file so that the command can load the data
                WRITE(test.msg_meta.channel, data);
                break;

            case "NOT_EXISTS":
                // Delete the file if needed to
                if (fs.existsSync(filepath)) {
                    DELETE(test.msg_meta.channel)
                };
                break;
            default:
                break;
        };


        let response = HANDLE_MESSAGE(test.msg_meta);

        // If the confirmation message is defined, trigger a confirmation
        if (test.confirmation_msg) {
            response = HANDLE_MESSAGE(test.confirmation_msg);
        };

        // Compare outputs
        if (test.expected_return != response) {
            fail_count++;
            if (!silent) {
                console.log("=====================================================");
                console.log(`${test.id}: Test failed`);
                console.log(`${test.id}:    Expected: "${test.expected_return}"`);
                console.log(`${test.id}:    Received: "${response}"`);
            };
        };

        if (fs.existsSync(filepath)) {
            DELETE(test.msg_meta.channel)
        };
    };

    // Check if we are being silent
    if (!silent) { console.log("====================================================="); };

    // Output summary
    console.log(`Tests: ${fail_count} tests failed out of ${tests.length} tests.`);
    console.log(`       ${Math.round(((tests.length - fail_count) / tests.length) * 100)}% passed`);
};