//
// test_object.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/17 - 2019/12/14)
//


interface test_msg_data {
    source: platform;
    channel: string;
    message: string;
    level: number;
    user: string;
}


interface test {
    datafile_should_exist: "EXISTS"|"NOT_EXISTS"|"IGNORES";
    datafile_populated: boolean;
    confirmation_msg?: test_msg_data;
    expected_return: string;
    msg_meta: test_msg_data;
    links: {[key: string]: string}
    id: string;
}