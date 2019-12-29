//
// test_runner.ts
//
// Written by: Tyler Akins (2019/11/17 - 2019/12/15)
//


import { TEST_CHANNEL, TEST_USER } from "../constants";
import { CREATE, LOAD, WRITE, DELETE } from "../utils/db";
import { HANDLE_MESSAGE } from "../cmd_handler";
import { UPDATE_LINKS } from "../utils/links";
import { LOAD_CONFIG } from "../utils/Config";
import { tests } from "../utils/tests";
import * as path from "path";
import * as fs from "fs";


const config = LOAD_CONFIG();
var fail_count = 0;


export const run_tests = (silent: boolean): number => {

    // Run through each test
    for (var test of tests) {

        let filepath = path.resolve(config.DATA_DIR) + `/${TEST_CHANNEL}.json`;
        let data: option[];

        // Check to see if the test needs a datafile and if it doesn't exist
        switch (test.datafile_should_exist) {
            case "EXISTS":

                // Reset the file if it exists already so we know EXACTLY
                // what data is inside of it
                if (!fs.existsSync(filepath)) {
                    CREATE(TEST_CHANNEL);
                };
                data = [];
                break;

            case "NOT_EXISTS":
                DELETE(filepath);
                break;
            default:
                break;
        };


        // Populate the data file if needed.
        if (test.datafile_populated && test.datafile_should_exist === "EXISTS") {
            data.push({
                name: "Potato",
                aliases: ["potato", "salad"],
                data_version: "3.0",
                points: {"%anonymous%": 0},
                total: 0
            });
            data.push({
                name: "Foo",
                aliases: ["foo"],
                data_version: "3.0",
                points: {"%anonymous%": 5, "spam": 50},
                total: 55
            });
        } else {
            data = [];
        };


        // Write the datafile only if it should exist, so it doesn't get created
        // when we don't want it to exist.
        if (test.datafile_should_exist == "EXISTS") {
            WRITE(TEST_CHANNEL, data);
        };


        // Update links
        UPDATE_LINKS(test.links);


        let response = HANDLE_MESSAGE({
            message: test.msg_meta.message,
            level: test.msg_meta.level,
            user: TEST_USER,
            cooldown: false,
            source: test.msg_meta.source,
            channel: test.msg_meta.channel,
            test: true
        });


        // If the confirmation message is defined, trigger a confirmation
        if (test.confirm_msg) {
            response = HANDLE_MESSAGE({
                message: test.confirm_msg.message,
                level: test.confirm_msg.level,
                user: TEST_USER,
                cooldown: false,
                source: test.confirm_msg.source,
                channel: test.msg_meta.channel,
                test: true
            });
        };


        // Compare outputs
        if (test.expected_return != response) {
            fail_count++;
            if (!silent) {
                console.log("=====================================================");
                console.log(`Test ${test.id} failed`);
                console.log(`    Expected: "${test.expected_return}"`);
                console.log(`    Received: "${response}"`);
            };
        };

        if (fs.existsSync(filepath)) {
            DELETE(TEST_CHANNEL);
        };
    };

    // Check if we are being silent
    if (!silent && fail_count > 0) {
        console.log("=====================================================");
    };


    // Output summary
    console.log(`Tests: ${fail_count} tests failed out of ${tests.length} tests.`);
    console.log(`       ${Math.round(((tests.length - fail_count) / tests.length) * 100)}% passed`);
    return fail_count;
};