//
// command_metadata.d.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/12/23)
//


type CONFIRM_TYPE = "confirm"|"deny"|"no_match"|"expired"|"invalid";



interface positions {
    head?: string;
    head_2?: string;
    table_head?: string;
    table_foot?: string;
    usage?: string;
}

interface alert_structure {
    info?: positions;
    warn?: positions;
    error?: positions;
}



interface cmd_metadata {
    executable(context: msg_data, args: string[]): string;
    requires_confirm: boolean;
    case_sensitive: boolean;
    alerts?: alert_structure;
    description: string;
    arg_info: string[];
    opt_args: number;
    group?: string;
    args: string[];
    level: number;
    name: string;
}