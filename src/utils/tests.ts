//
// tests.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/17 - 2019/12/13)
//


import { PERM, VERSION } from "../constants";
import { LOAD_CONFIG } from "./Config";


let config: config = LOAD_CONFIG();


export const tests: test[] = []