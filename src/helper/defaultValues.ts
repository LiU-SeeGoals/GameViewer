import { Robot } from "../types/Robot";
import { Ball } from "../types/Ball";
import { Action } from "../types/Action";

export function getDefaultRobotPos(): Robot[] {
    const robots = [
        {"id": 0, "team":"blue", "x": 2000, "y": 0, "speed_x":1, "speed_y":1},
        {"id": 1, "team":"blue", "x": -4500, "y": 3000, "speed_x":2, "speed_y":1},
        {"id": 2, "team":"blue", "x": -1000, "y": 1000, "speed_x":3, "speed_y":2},
        {"id": 3, "team":"blue", "x": -1000, "y": -1000, "speed_x":0, "speed_y":0},

        {"id": 0, "team":"yellow", "x": -3000, "y": 3000, "speed_x":0, "speed_y":0},
        {"id": 1, "team":"yellow", "x": 360, "y": 150, "speed_x":0, "speed_y":0},
        {"id": 2, "team":"yellow", "x": 95, "y": 600, "speed_x":0, "speed_y":0},
        {"id": 3, "team":"yellow", "x": 300, "y": 1000, "speed_x":0, "speed_y":0},
    ];
    return robots;
}

export function getDefaultBallPos(): Ball {
    const ball = {"x": 500, "y": 500, "speed_x":0, "speed_y":0};
    return ball;
}

export function getDefaultVisibleRobots(): boolean[] {
    const visible = [false, false, false, false, false, false];
    return visible;
}

export function getDefaultActions(): Action[] {
    const actions = [
        {"Id": 0, "Action": -1, "PreviousAction": -1},
        {"Id": 1, "Action": -1, "PreviousAction": -1},
        {"Id": 2, "Action": -1, "PreviousAction": -1},
        {"Id": 3, "Action": -1, "PreviousAction": -1},
        {"Id": 4, "Action": -1, "PreviousAction": -1},
        {"Id": 5, "Action": -1, "PreviousAction": -1},
    ];
    return actions;
}

export const actionToStr = (actionCode: number) => {
    switch (actionCode) {
      case 0:
        return "IDLE";
      case 1:
        return "STOP";
      case 2:
        return "KICK";
      case 3:
        return "MOVE";
      case 4:
        return "INIT";
      case 5:
        return "SET_NAVIGATION_DIRECTION";
      case 6:
        return "ROTATE";
      default:
        return "UNKNOWN";
    }
  };

export function getDefaultVectorSetting(): boolean[] {
    const vectorSetting = [
        false,
        false,
        false,
        false,
        false,
        false,
    ];
    return vectorSetting;
}

export function getDefaultTraceSetting(): boolean[] {
    const traceSetting = [
        true,
        true,
        true,
        true,
        true,
        true,
    ];
    return traceSetting;
}

export function getDefaultLog(): string[] {
    const defaultLog = [
        "18:51 > Lost connection to controller",
        "17:59 > Using strategy fiskmasen",
        "Logs",
    ];
    return defaultLog;
}