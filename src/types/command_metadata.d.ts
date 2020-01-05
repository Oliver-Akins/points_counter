//
// command_metadata.d.ts
//
// Written by: Tyler Akins (2019/11/06 - 2020/01/04)
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
    alerts?: alert_structure;
    case_sensitive: boolean;
    description: string;
    arg_info: string[];
    opt_args: number;
    group?: string;
    args: string[];
    level: number;
    name: string;
}