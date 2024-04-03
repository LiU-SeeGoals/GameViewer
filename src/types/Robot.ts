import { Action } from "./Action";

export type Robot = {
    id: number;
    team: string;
    x: number;
    y: number;
    speed_x: number;
    speed_y: number;
    selected: boolean;
    showArrow: boolean;
    hasBall: boolean;
    action: null | Action;
}