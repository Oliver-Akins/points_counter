//
// string.format.d.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/03)
//

export {};
declare global {
    interface String {
        format(replacements: {[key: string]: string}): string
    }
}