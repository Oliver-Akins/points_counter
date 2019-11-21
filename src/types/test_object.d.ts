//
// test_object.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/17)
//


interface test {
    datafile_should_exist: "EXISTS"|"NOT_EXISTS"|"IGNORES";
    confirmation_msg?: msg_data;
    expected_return: string;
    msg_meta: msg_data;
    id: string;
}