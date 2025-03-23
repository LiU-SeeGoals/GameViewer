// Import the types
import { SSLFieldUpdate } from "../types/SSLFieldUpdate";

import { SSLWrapperPacket } from '../proto/ssl_wrapper';

import { SimulatorControl } from "proto/ssl_simulation_control";
import { TeleportBall } from "../types/TeleportBall";
import { TeleportRobot } from "../types/TeleportRobot";


export function parseProto(
    input_data: Uint8Array, // Change the input type to Uint8Array for binary data
    setSSLFieldUpdate: React.Dispatch<React.SetStateAction<SSLFieldUpdate>>,
    setErrorOverlay: React.Dispatch<React.SetStateAction<string>>,
): void {
    try {

        // Parse the binary data into a protobuf message
        const ssl_protobuf_msg = SSLWrapperPacket.decode(input_data);
        const ssl_detections = ssl_protobuf_msg.detection;
        
        // console.log(input_data);
        if (ssl_detections) {
            // console.log('Received Data:', ssl_protobuf_msg); // If we want to print the message for debugging
            // Now we update all the useState varibles with the recieved json
            setSSLFieldUpdate(ssl_detections);
        }
    } catch (e) {
        setErrorOverlay('Error parsing protobuf message from SSL');
    }
}

// Currently only teleports 1 robot max
// export function createSimulatorControl(
//     teleportBall: TeleportBall,
//     teleportRobot: TeleportRobot,
// ): Uint8Array {

//     // Create a new simulator control message
//     const simulator_control = SimulatorControl.create({
//         teleportBall: {
//             x: teleportBall.x,
//             y: teleportBall.y,
//             z: teleportBall.z,
//             vx: teleportBall.vx,
//             vy: teleportBall.vy,
//             vz: teleportBall.vz,
//             teleportSafely: teleportBall.teleportSafely,
//             roll: teleportBall.roll,
//         },
//         teleportRobot: [{
//             id: teleportRobot.id,
//             x: teleportRobot.x,
//             y: teleportRobot.y,
//             orientation: teleportRobot.orientation,
//             vX: teleportRobot.vx,
//             vY: teleportRobot.vy,
//             vAngular: teleportRobot.vAngular,
//             present: teleportRobot.present,
//         }],
//     });

//     // Encode the message to binary
//     const message = SimulatorControl.encode(simulator_control).finish();
//     // console.log(message);
//     return message;
// }