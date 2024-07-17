// Import the generated TypeScript code
import { WebsiteCommand } from '../proto-messages/proto_js/website/website';
import { SSLWrapperPacket } from '../proto-messages/proto_js/ssl_vision/ssl_wrapper';
import { SimulatorCommand } from '../proto-messages/proto_js/simulation/ssl_simulation_control';
import { Command } from '../proto-messages/proto_js/robot_action/robot_action';

// Import the types
import { Robot } from "../types/Robot";
import { Ball } from "../types/Ball";
import { Action } from "../types/Action";

export function parseProto(
    input_proto: Uint8Array, // Change the input type to Uint8Array for binary data
    setRobotPositions: React.Dispatch<React.SetStateAction<Robot[]>>,
    setBallPosition: React.Dispatch<React.SetStateAction<Ball>>,
    setRobotActions: React.Dispatch<React.SetStateAction<Action[]>>,
    setTerminalLog: React.Dispatch<React.SetStateAction<string[]>>,
    setErrorOverlay: React.Dispatch<React.SetStateAction<string>>,
    setvisibleRobots: React.Dispatch<React.SetStateAction<boolean[]>>,
): void {
    try {
        // Parse the binary data into a WebsiteCommand message
        const message = WebsiteCommand.decode(new Uint8Array(input_proto));
        
        // Log the entire message object for debugging
        console.log('Parsed WebsiteCommand:', message);

        // Update the state with parsed data (basic logging for now)
        if (message.control) {
            console.log('Control:', message.control);
        }

        if (message.config) {
            console.log('Config:', message.config);
        }

        if (message.ActionCommands.length > 0) {
            console.log('ActionCommands:', message.ActionCommands);
        }

        if (message.logMessages.length > 0) {
            console.log('LogMessages:', message.logMessages);
        }

    } catch (e) {
        console.error('Error parsing proto message', e);
        setErrorOverlay('Error parsing proto message');
    }
}

// Define helper functions to parse data from the proto messages
function parseRobotPositionsFromWrapperPacket(wrapperPacket: SSLWrapperPacket): Robot[] {
    // Implement the logic to parse Robot positions from SSLWrapperPacket
    // Return an array of Robot objects
    return [];
}

function parseBallPositionFromWrapperPacket(wrapperPacket: SSLWrapperPacket): Ball {
    // Implement the logic to parse Ball position from SSLWrapperPacket
    // Return a Ball object
    return {} as Ball;
}

function parseActionFromCommand(command: Command): Action {
    // Implement the logic to parse an Action from Command
    // Return an Action object
    return {} as Action;
}
