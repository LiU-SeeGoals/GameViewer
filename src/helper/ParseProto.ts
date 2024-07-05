import { Robot } from "../types/Robot";
import { Ball } from "../types/Ball";
import { Action } from "../types/Action";

export function parseProto(
    input_proto: string,
    setRobotPositions: React.Dispatch<React.SetStateAction<Robot[]>>,
    setBallPosition: React.Dispatch<React.SetStateAction<Ball>>,
    setRobotActions: React.Dispatch<React.SetStateAction<Action[]>>,
    setTerminalLog: React.Dispatch<React.SetStateAction<string[]>>,
    setErrorOverlay: React.Dispatch<React.SetStateAction<string>>,
    setvisibleRobots: React.Dispatch<React.SetStateAction<boolean[]>>,
    
  ): void {
    // In some way parse the input_proto and update the state
}

