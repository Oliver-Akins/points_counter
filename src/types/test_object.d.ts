//
// test_object.ts
//
// Written by: Tyler Akins (2019/11/17 - 2020/01/10)
//


interface test_msg_data {
    source: platform;
    channel?: string;
    message: string;
    level: number;
}


interface test {
    datafile_should_exist: "EXISTS"|"NOT_EXISTS"|"IGNORES";
    datafile_populated?: boolean;
    confirm_msg?: test_msg_data;
    expected_return: string;
    msg_meta: test_msg_data;
    links: {[key: string]: string}
    id: string;
}