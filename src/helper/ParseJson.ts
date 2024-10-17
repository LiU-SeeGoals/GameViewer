// Import the types
import { Robot } from "../types/Robot";
import { Ball } from "../types/Ball";
import { Action } from "../types/Action";

type Log = Record<string, any>;

export function parseJson(
    input_data: string, // Change the input type to Uint8Array for binary data
    setRobotPositions: React.Dispatch<React.SetStateAction<Robot[]>>,
    setBallPosition: React.Dispatch<React.SetStateAction<Ball>>,
    setRobotActions: React.Dispatch<React.SetStateAction<Action[]>>,
    setErrorOverlay: React.Dispatch<React.SetStateAction<string>>,
    setvisibleRobots: React.Dispatch<React.SetStateAction<boolean[]>>,
    setLogs: React.Dispatch<React.SetStateAction<Log[]>>,
): void {
    try {
        // Parse the binary data into a WebsiteCommand message
        const parsedData = JSON.parse(input_data);
        // console.log('Received Data:', parsedData.log); // If we want to print the message for debugging
	if (parsedData.type === 'gamestate') {
		// Now we update all the useState varibles with the recieved json
		setRobotPositions(parsedData.RobotPositions)
		setBallPosition(parsedData.BallPosition)
		setRobotActions(parsedData.RobotActions)
	} else if (parsedData.type === 'log') {
		setLogs((prevLogs) => [...prevLogs, parsedData.log]);
	}

        setErrorOverlay('') // Remove default error since we have recieved message
        //setvisibleRobots() // all robots that have position is visible, not yet implemented

    } catch (e) {
        setErrorOverlay('Error parsing json message');
    }
}
