import { Robot } from "./Robot";
import { Ball } from "./Ball";

export type GameState = {
    robots: Robot[]; 
    ball: Ball;
}

export function parseGameState(oldGameState: GameState, data: string): GameState {
    const parseData = JSON.parse(data);

    const newRobots: Robot[] = [...oldGameState.robots];

    const gameStateBall: Ball = {
        x: parseData.Ball.PosX,
        y: parseData.Ball.PosY,
        speed_x: parseData.Ball.VelX,
        speed_y: parseData.Ball.VelY
    };

    let team_size = 11;

    for (let i = 0; i < team_size; i++) {
        newRobots[i].x = parseData.BlueTeam[i].PosX;
        newRobots[i].y = parseData.BlueTeam[i].PosY;
        newRobots[i].speed_x = parseData.BlueTeam[i].VelX;
        newRobots[i].speed_y = parseData.BlueTeam[i].VelY;
        newRobots[i].id = parseData.BlueTeam[i].Id;
    }
    for (let i = 0; i < team_size; i++) {
        newRobots[i + team_size].x = parseData.YellowTeam[i].PosX;
        newRobots[i + team_size].y = parseData.YellowTeam[i].PosY;
        newRobots[i + team_size].speed_x = parseData.YellowTeam[i].VelX;
        newRobots[i + team_size].speed_y = parseData.YellowTeam[i].VelY;
        newRobots[i + team_size].id = parseData.YellowTeam[i].Id;
    }
    // for (let i = 0; i < parseData.Actions.length; i++) {
    //     const offset: number = parseData.Actions[i].Team === "blue" ? 0 : team_size;
    //     newRobots[offset + parseData.Actions[i].Id].action = parseData.Actions[i];
    // }
    return {robots: newRobots, ball: gameStateBall};
}


export function getDefaultGameState(): GameState {
    const robots = [
        {"id": 0, "team":"blue", "x": 2000, "y": 0, "speed_x":1, "speed_y":1},
        {"id": 1, "team":"blue", "x": -4500, "y": 3000, "speed_x":2, "speed_y":1},
        {"id": 2, "team":"blue", "x": -1000, "y": 1000, "speed_x":3, "speed_y":2},
        {"id": 3, "team":"blue", "x": -1000, "y": -1000, "speed_x":0, "speed_y":0},
        {"id": 4, "team":"blue", "x": 1000, "y": -1000, "speed_x":0, "speed_y":0},
        {"id": 5, "team":"blue", "x": 1000, "y": 95, "speed_x":0, "speed_y":0},
        {"id": 6, "team":"blue", "x": 2000, "y": 0, "speed_x":1, "speed_y":1},
        {"id": 7, "team":"blue", "x": -4500, "y": 3000, "speed_x":2, "speed_y":1},
        {"id": 8, "team":"blue", "x": -1000, "y": 1000, "speed_x":3, "speed_y":2},
        {"id": 9, "team":"blue", "x": -1000, "y": -1000, "speed_x":0, "speed_y":0},
        {"id": 10, "team":"blue", "x": 1000, "y": -1000, "speed_x":0, "speed_y":0},
        {"id": 11, "team":"blue", "x": 1000, "y": 95, "speed_x":0, "speed_y":0},
        {"id": 0, "team":"yellow", "x": -3000, "y": 3000, "speed_x":0, "speed_y":0},
        {"id": 1, "team":"yellow", "x": 360, "y": 150, "speed_x":0, "speed_y":0},
        {"id": 2, "team":"yellow", "x": 95, "y": 600, "speed_x":0, "speed_y":0},
        {"id": 3, "team":"yellow", "x": 300, "y": 1000, "speed_x":0, "speed_y":0},
        {"id": 4, "team":"yellow", "x": -300, "y": -450, "speed_x":0, "speed_y":0},
        {"id": 5, "team":"yellow", "x": -900, "y": 200, "speed_x":0, "speed_y":0},
        {"id": 6, "team":"yellow", "x": -3000, "y": 3000, "speed_x":0, "speed_y":0},
        {"id": 7, "team":"yellow", "x": -3000, "y": 3000, "speed_x":0, "speed_y":0},
        {"id": 8, "team":"yellow", "x": 360, "y": 150, "speed_x":0, "speed_y":0},
        {"id": 9, "team":"yellow", "x": 95, "y": 600, "speed_x":0, "speed_y":0},
        {"id": 10, "team":"yellow", "x": 300, "y": 1000, "speed_x":0, "speed_y":0},
        {"id": 11, "team":"yellow", "x": -300, "y": -450, "speed_x":0, "speed_y":0},
    ];
    const ball = {"x": 500, "y": 500, "speed_x":0, "speed_y":0};
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

export function updateYellowShowArrow(gameState: GameState, robotId: number, newShowArrowValue: boolean): GameState {
    const updatedRobots = gameState.robots.map(robot => {
      if (robot.id == robotId && robot.team ==="yellow") {
        return { ...robot, showArrow: newShowArrowValue };
      }
      return robot;
    });
  
    // Update the game state with the updated robots
    return { ...gameState, robots: updatedRobots };
  }