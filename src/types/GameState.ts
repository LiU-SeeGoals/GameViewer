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
    }
    for (let i = 0; i < parseData.YellowTeam.length; i++) {
        newRobots[i + parseData.BlueTeam.length].x = parseData.YellowTeam[i].PosX;
        newRobots[i + parseData.BlueTeam.length].y = parseData.YellowTeam[i].PosY;
    }
    return {robots: newRobots, ball: gameStateBall};
}


export function getDefaultGameState(): GameState {
    const robots = [
        {"id": 0, "team":"blue", "x": 0, "y": 0, "speed_x":1, "speed_y":1, "selected": false, "showArrow" : false},
        {"id": 1, "team":"blue", "x": -4500, "y": 3000, "speed_x":0, "speed_y":0, "selected": false, "showArrow" : false},
        {"id": 2, "team":"blue", "x": -1000, "y": 1000, "speed_x":0, "speed_y":0, "selected": false, "showArrow" : false},
        {"id": 3, "team":"blue", "x": -1000, "y": -1000, "speed_x":0, "speed_y":0, "selected": false, "showArrow" : false},
        {"id": 4, "team":"blue", "x": 1000, "y": -1000, "speed_x":0, "speed_y":0, "selected": false, "showArrow" : false},
        {"id": 5, "team":"blue", "x": 5, "y": 95, "speed_x":0, "speed_y":0, "selected": false, "showArrow" : false},
        {"id": 0, "team":"yellow", "x": 95, "y": 45, "speed_x":0, "speed_y":0, "selected": false, "showArrow" : false},
        {"id": 1, "team":"yellow", "x": 95, "y": 55, "speed_x":0, "speed_y":0, "selected": false, "showArrow" : false},
        {"id": 2, "team":"yellow", "x": 95, "y": 65, "speed_x":0, "speed_y":0, "selected": false, "showArrow" : false},
        {"id": 3, "team":"yellow", "x": 95, "y": 76, "speed_x":0, "speed_y":0, "selected": false, "showArrow" : false},
        {"id": 4, "team":"yellow", "x": 95, "y": 85, "speed_x":0, "speed_y":0, "selected": false, "showArrow" : false},
        {"id": 5, "team":"yellow", "x": 95, "y": 95, "speed_x":0, "speed_y":0, "selected": false, "showArrow" : false},
    ];
    const ball = {"x": 50, "y": 50, "speed_x":0, "speed_y":0};
    return {robots, ball};
}

export function updateShowArrow(gameState: GameState, robotId: number, newShowArrowValue: boolean): GameState {
    const updatedRobots = gameState.robots.map(robot => {
      if (robot.id == robotId && robot.team ==="blue") {
        return { ...robot, showArrow: newShowArrowValue };
      }
      return robot;
    });
  
    // Update the game state with the updated robots
    return { ...gameState, robots: updatedRobots };
  }