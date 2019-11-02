//
// points.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/10/31)
//


export const SORT_SELECT = (data: select[]): select[] => {
    return data.sort(SORT_FIELD)
};



const SORT_FIELD = (a: select, b: select): number => {
    let a_total: number = a.total;
    let b_total: number = b.total;


    if (a_total < b_total) { return 1; }

    else if (a_total > b_total) { return -1; }

    else { return 0; }
}