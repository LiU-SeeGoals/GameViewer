import React from 'react';
import './FootBallField.css';
import { Robot } from '../../types/Robot';
interface FootBallFieldProps {
    height: number
}
const FOOTBALL_FIELD_IMAGE_WIDTH: number = 961;
const FOOTBALL_FIELD_IMAGE_HEIGTH: number = 661;
const ROBOT_RADIUS: number = 180; 
const SPEED_ARROW_COLOR: string = 'rgba(0, 128, 128, 1)';
const SPEED_ARROW_THICKNESS: number = 3;
const COLOR_MAP: Record<string, string> = {"yellow": "rgba(255, 255, 0, 1)", "blue": "rgba(0, 0, 255, 1)"};

const FootBallField: React.FC<FootBallFieldProps> = ({height}) => {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    let scaleFactor = 1;
    

    const canvasInit = (event: any) => {
        // Check if the canvas is initialized
        alert(event.target.height);
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        // Adjust canvas width to match the image width
        canvas.width = event.target.width;
        canvas.height = event.target.height;

        scaleFactor = canvas.width / 200; // Make the canvas independet on window scaling
        canvas.addEventListener('click', handleClick); // event for mouse click
        draw(canvas);

    };

    // draws everything on canvas
    function draw(canvas: HTMLCanvasElement) {
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (!context) {
            return;
        }

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = 'rgba(1, 0, 0, 1)';

        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // drawing all of gamestate here
        // var gameState = props.gameState;
        // gameState.map((robot) => {
        //     drawRobot(context, robot);
        // });
        drawRobot(context, {x: 100, y: 100, speed_x: 0, speed_y: 0, team: "yellow", selected: false});
    }

    const drawRobot = (context: CanvasRenderingContext2D, robot: Robot) => {
        drawArrow(context, robot);
        drawCircle(context, robot, ROBOT_RADIUS, COLOR_MAP[robot.team]);

        // Draw a black circle in the robot if it is selected
        if (robot.selected) {
            drawCircle(context, robot, ROBOT_RADIUS/3, 'rgba(0, 0, 0, 1)');
        }
    };

    const drawCircle = (context: CanvasRenderingContext2D, robot: Robot, radius: number, color: string) => {
        context.beginPath();
        context.arc(robot.x*scaleFactor, robot.y*scaleFactor, radius*scaleFactor, 0, 2 * Math.PI);
        context.strokeStyle = 'rgba(0, 0, 0, 0)'; // make the border transparent
        context.fillStyle = color;
        context.fill();
        context.stroke();
    };

    const drawArrow = (context: CanvasRenderingContext2D, robot: Robot) => {
        context.beginPath();

        const angle: number = Math.atan2(robot.speed_y, robot.speed_x);
        const arrowLength: number = 10* Math.sqrt(robot.speed_x * robot.speed_x + robot.speed_y * robot.speed_y);

        // Calculate the starting point of the arrow (on the circle)
        const startX: number = robot.x;
        const startY: number = robot.y;

        // Calculate the end point of the arrow
        const endX: number = robot.x + arrowLength * Math.cos(angle);
        const endY: number = robot.y + arrowLength * Math.sin(angle);

        // Draw the line for the arrow
        context.beginPath();
        context.moveTo(startX * scaleFactor, startY * scaleFactor);
        context.lineTo(endX * scaleFactor, endY * scaleFactor);
        context.strokeStyle = SPEED_ARROW_COLOR;
        context.lineWidth = SPEED_ARROW_THICKNESS;
        context.stroke();

        const headlen = 3;
        const angle1 = angle - Math.PI / 7;
        const angle2 = angle + Math.PI / 7;
        const headX = endX - headlen * Math.cos(angle1);
        const headY = endY - headlen * Math.sin(angle1);

        // Draw the arrow head
        context.beginPath();
        context.moveTo(endX * scaleFactor, endY * scaleFactor);
        context.lineTo(headX * scaleFactor, headY * scaleFactor);
        context.lineTo((endX - headlen * Math.cos(angle2)) * scaleFactor, (endY - headlen * Math.sin(angle2)) * scaleFactor);
        context.lineTo(endX * scaleFactor, endY * scaleFactor);
        context.fillStyle = SPEED_ARROW_COLOR;
        context.fill();
        context.lineWidth = SPEED_ARROW_THICKNESS;
        context.stroke();
    };

    const handleClick = (event: any) => {
        // if (!canvasRef.current){
        //     return;
        // }
        // const rect = canvasRef.current.getBoundingClientRect();
        // const x = (event.clientX - rect.left)/scaleFactor;
        // const y = (event.clientY - rect.top)/scaleFactor;
        // let gameStateCopy = [...props.gameState];

        // // Check if clicked on a robot
        // let clickedOnRobot = false;
        // let clickedOnRobotIndex = -1;
        // props.gameState.map((robot, index) => {
        //     if (Math.pow(x - robot.x, 2) + Math.pow(y - robot.y, 2) < Math.pow(3, 2)) {
        //         clickedOnRobot = true;
        //         clickedOnRobotIndex = index;
        //     }
        // });  

        // // If a robot is selected, move it here
        // if (!clickedOnRobot) {
        //     props.gameState.map((robot, index) => {
        //         if (robot.selected) {
        //             gameStateCopy[index]["x"] = x;
        //             gameStateCopy[index]["y"] = y;
        //         }
        //     }); 
        // }

        // // deselect all robots
        // gameStateCopy.map((robot, index) => {
        //     if(clickedOnRobot && index === clickedOnRobotIndex) {
        //         gameStateCopy[index]["selected"] = !gameStateCopy[index]["selected"];
        //     } else {
        //         gameStateCopy[index]["selected"] = false;
        //     }
        // });
        // props.setGameState(...gameStateCopy);
        // draw(canvasRef.current);
    };

    return (
        <div className="football-field-container"
            style={{ height: height }}>
            <img src="./src/assets/football_field.svg" alt="canvas" style={{height :height}} onLoad={canvasInit} />
            <canvas className="football-field-canvas" ref={canvasRef} style={{height: height}}></canvas>
        </div>
    );
}

export default FootBallField;