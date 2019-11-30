//
// Options.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/29)
//



export const SORT_OPTIONS = (data: option[]): option[] => {
    return data.sort((a: option, b: option): number => {
        let a_total: number = a.total;
        let b_total: number = b.total;


        if (a_total < b_total) { return 1; }

        else if (a_total > b_total) { return -1; }

        else { return 0; }
    })
}