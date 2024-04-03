export type Action = {
    Id: number;
    Action: number;
    PosX: number;
    PosY: number;
    PosW: number;
    DestX: number;
    DestY: number;
    DestW: number;
    Dribble: boolean;
}

export const ActionToStr = (action: Action): string => {
    switch (action.Action) {
        case 0:
            return "STOP";
        case 1:
            return "KICK";
        case 2:
            return "MOVE";
        case 3:
            return "INIT";
        case 4:
            return "SET_NAVIGATION_DIRECTION";
        case 5:
            return "ROTATE";
        default:
            return "UNKNOWN";
    }
}


// Object { Id: 0, Action: 2, PosX: -25, PosY: 15, PosW: 0.05090622, DestX: 0, DestY: 0, DestW: 0, Dribble: false }

// ActionType_STOP_ACTION                     ActionType = 0
// ActionType_KICK_ACTION                     ActionType = 1
// ActionType_MOVE_ACTION                     ActionType = 2
// ActionType_INIT_ACTION                     ActionType = 3
// ActionType_SET_NAVIGATION_DIRECTION_ACTION ActionType = 4
// ActionType_ROTATE_ACTION                   ActionType = 5