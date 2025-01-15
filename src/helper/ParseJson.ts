// Import the types
import { Robot } from "../types/Robot";
import { Ball } from "../types/Ball";
import { Action } from "../types/Action";

export function parseJson(
    input_data: string, // Change the input type to Uint8Array for binary data
    // setRobotPositions: React.Dispatch<React.SetStateAction<Robot[]>>,
    // setBallPosition: React.Dispatch<React.SetStateAction<Ball>>,
    setRobotActions: React.Dispatch<React.SetStateAction<Action[]>>,
    setTerminalLog: React.Dispatch<React.SetStateAction<string[]>>,
    setErrorOverlay: React.Dispatch<React.SetStateAction<string>>,
    setvisibleRobots: React.Dispatch<React.SetStateAction<boolean[]>>,
): void {
    const expectedKeys = [
        "RobotInfo", 
        "RobotActions", 
        "TerminalLog"];
    // Parse the binary data into a WebsiteCommand message
    const parsedData = JSON.parse(input_data);

    const jsonKeys = Object.keys(parsedData);
    
    // Find missing keys
    const missingKeys = expectedKeys.filter(key => !jsonKeys.includes(key));
    // Find additional keys
    const additionalKeys = jsonKeys.filter(key => !expectedKeys.includes(key));
    
    if (missingKeys.length > 0) {
        setErrorOverlay(`Error parsing Controller Packet - Missing keys:' ${missingKeys}`);
        console.error(`Error parsing Controller Packet - Missing keys:' ${missingKeys}`);
    }

    if (additionalKeys.length > 0) {
        setErrorOverlay(`Error parsing AI Controller packet - Additional keys:' ${additionalKeys}`);
        console.error('Additional keys found:', additionalKeys);
    }

    try {
        // console.log('Received Data:', parsedData); // If we want to print the message for debugging
        // Now we update all the useState varibles with the recieved json
        // setRobotPositions(parsedData.RobotPositions)
        // setBallPosition(parsedData.BallPosition)
        setRobotActions(parsedData.RobotActions)
        setTerminalLog(parsedData.TerminalLog)
        setErrorOverlay('') // Remove default error since we have recieved message
        //setvisibleRobots() // all robots that have position is visible, not yet implemented

    } catch (e) {
        console.error("Error parsin JSON, see ");
    }
}