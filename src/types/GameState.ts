import { Robot } from "./Robot";
import { Ball } from "./Ball";

export type GameState = {
    robots: Robot[]; 
    ball: Ball;
}

export function parseGameState(oldGameState: GameState, data: string): GameState {
    const parseData = JSON.parse(data);

    let newRobots: Robot[] = [...oldGameState.robots];

    let gameStateBall: Ball = {
        x: parseData.Ball.PosX,
        y: parseData.Ball.PosY,
        speed_x: parseData.Ball.VelX,
        speed_y: parseData.Ball.VelY
    };

    for (let i = 0; i < parseData.BlueTeam.length; i++) {
        newRobots[i].x = parseData.BlueTeam[i].PosX;
        newRobots[i].y = parseData.BlueTeam[i].PosY;
        newRobots[i].speed_x = parseData.BlueTeam[i].VelX;
        newRobots[i].speed_y = parseData.BlueTeam[i].VelY;
        newRobots[i].id = parseData.BlueTeam[i].Id;
    }
    for (let i = 0; i < parseData.YellowTeam.length; i++) {
        newRobots[i + parseData.BlueTeam.length].x = parseData.YellowTeam[i].PosX;
        newRobots[i + parseData.BlueTeam.length].y = parseData.YellowTeam[i].PosY;
        newRobots[i + parseData.BlueTeam.length].speed_x = parseData.YellowTeam[i].VelX;
        newRobots[i + parseData.BlueTeam.length].speed_y = parseData.YellowTeam[i].VelY;
        newRobots[i + parseData.BlueTeam.length].id = parseData.YellowTeam[i].Id;
    }
    for (let i = 0; i < parseData.Actions.length; i++) {
        const offset: number = parseData.Actions[i].Team === "blue" ? 0 : parseData.BlueTeam.length;
        newRobots[offset + parseData.Actions[i].Id].action = parseData.Actions[i];
    }
    return {robots: newRobots, ball: gameStateBall};
}


export function getDefaultGameState(): GameState {
    const robots = [
        {"id": 0, "team":"blue", "x": 0, "y": 0, "speed_x":1, "speed_y":1, "selected": false, "action": null},
        {"id": 1, "team":"blue", "x": -4500, "y": 3000, "speed_x":0, "speed_y":0, "selected": false, "action": null},
        {"id": 2, "team":"blue", "x": -1000, "y": 1000, "speed_x":0, "speed_y":0, "selected": false, "action": null},
        {"id": 3, "team":"blue", "x": -1000, "y": -1000, "speed_x":0, "speed_y":0, "selected": false, "action": null},
        {"id": 4, "team":"blue", "x": 1000, "y": -1000, "speed_x":0, "speed_y":0, "selected": false, "action": null},
        {"id": 5, "team":"blue", "x": 5, "y": 95, "speed_x":0, "speed_y":0, "selected": false, "action": null},
        {"id": 0, "team":"yellow", "x": 95, "y": 45, "speed_x":0, "speed_y":0, "selected": false, "action": null},
        {"id": 1, "team":"yellow", "x": 95, "y": 55, "speed_x":0, "speed_y":0, "selected": false, "action": null},
        {"id": 2, "team":"yellow", "x": 95, "y": 65, "speed_x":0, "speed_y":0, "selected": false, "action": null},
        {"id": 3, "team":"yellow", "x": 95, "y": 76, "speed_x":0, "speed_y":0, "selected": false, "action": null},
        {"id": 4, "team":"yellow", "x": 95, "y": 85, "speed_x":0, "speed_y":0, "selected": false, "action": null},
        {"id": 5, "team":"yellow", "x": 95, "y": 95, "speed_x":0, "speed_y":0, "selected": false, "action": null},
    ];
    const ball = {"x": 50, "y": 50, "speed_x":0, "speed_y":0};
    return {robots, ball};
}