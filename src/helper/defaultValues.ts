import { Robot } from "../types/Robot";
import { Ball } from "../types/Ball";
import { Action } from "../types/Action";

export function getDefaultRobotPos(): Robot[] {
  const robots: Robot[] = [
      { Id: 0, Team: 0, PosW: 0, PosX: 2000, PosY: 0, VelW: 0, VelX: 1, VelY: 1 },
      { Id: 1, Team: 0, PosW: 0, PosX: -4500, PosY: 3000, VelW: 0, VelX: 2, VelY: 1 },
      { Id: 2, Team: 0, PosW: 0, PosX: -1000, PosY: 1000, VelW: 0, VelX: 3, VelY: 2 },
      { Id: 3, Team: 0, PosW: 0, PosX: -1000, PosY: -1000, VelW: 0, VelX: 0, VelY: 0 },
      { Id: 0, Team: 1, PosW: 0, PosX: -3000, PosY: 3000, VelW: 0, VelX: 0, VelY: 0 },
      { Id: 1, Team: 1, PosW: 0, PosX: 360, PosY: 150, VelW: 0, VelX: 0, VelY: 0 },
      { Id: 2, Team: 1, PosW: 0, PosX: 95, PosY: 600, VelW: 0, VelX: 0, VelY: 0 },
      { Id: 3, Team: 1, PosW: 0, PosX: 300, PosY: 1000, VelW: 0, VelX: 0, VelY: 0 }
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