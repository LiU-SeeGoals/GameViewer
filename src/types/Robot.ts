import { Action } from "./Action";

export type Robot = {
    id: number;
    x: number;
    y: number;
    speed_x: number;
    speed_y: number;
    team: string;
    selected: boolean;
    action: null | Action;
}