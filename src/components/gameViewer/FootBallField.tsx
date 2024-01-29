import React, {useEffect} from 'react';
import './FootBallField.css';
import { Robot } from '../../types/Robot';
import { GameState } from '../../types/GameState';
interface FootBallFieldProps {
    height: number
    gameState: GameState
}
const REAL_WIDTH_FIELD: number = 9600;
const REAL_HEIGHT_FIELD: number = 6600;

const ROBOT_RADIUS: number = 180; 

const ARROW_HEAD_LENGTH: number = 3;
const SPEED_ARROW_COLOR: string = 'rgba(0, 0, 0, 1)';
const SPEED_ARROW_THICKNESS: number = 3;

const COLOR_MAP: Record<string, string> = {"yellow": "rgba(255, 255, 0, 1)", "blue": "rgba(0, 0, 255, 1)"};

const FootBallField: React.FC<FootBallFieldProps> = ({height, gameState}) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    let scaleFactor = 1;

    const canvasInit = (event: any) => {
        // Check if the canvas is initialized
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        // Adjust canvas width to match the image width
        canvas.width = event.target.width;
        canvas.height = event.target.height;

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
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        //drawing all of gamestate here
        gameState.robots.map((robot) => {
            drawRobot(context, robot);
        });
        //drawRobot(context, {x: 0, y: 0, speed_x: 3, speed_y: 3, team: "yellow", selected: false});
    }

    const drawRobot = (context: CanvasRenderingContext2D, robot: Robot) => {

        if (robot.showArrow){
            drawArrow(context, robot, SPEED_ARROW_COLOR, SPEED_ARROW_THICKNESS);
        }
        drawCircle(context, robot, ROBOT_RADIUS * getScaler(context), COLOR_MAP[robot.team]);

        // Draw a black circle in the robot if it is selected
        if (robot.selected) {
            drawCircle(context, robot, ROBOT_RADIUS/3, 'rgba(0, 0, 0, 1)');
        }
    };

    const drawCircle = (context: CanvasRenderingContext2D, robot: Robot, radius: number, color: string) => {
        const {canvasX, canvasY} = getCanvasCoordinates(robot.x, robot.y, context);
        context.beginPath();
        context.arc(canvasX, canvasY, radius, 0, 2 * Math.PI);
        context.strokeStyle = 'rgba(0, 0, 0, 0)'; // make the border transparent
        context.fillStyle = color;
        context.fill();
        context.stroke();
    };

    const drawArrow = (context: CanvasRenderingContext2D, robot: Robot, color: string, thickness: number) => {

        const angle: number = Math.atan2(robot.speed_y, robot.speed_x) - Math.PI/2;
        //const arrowLength: number = 10 * Math.hypot(robot.speed_x, robot.speed_y);
        const arrowLength: number = 100;
        // Calculate the starting point of the arrow (on the circle)
        const {canvasX: startX, canvasY: startY} = getCanvasCoordinates(robot.x, robot.y, context);

        // Calculate the end point of the arrow
        const endX: number = startX + arrowLength * Math.cos(angle);
        const endY: number = startY + arrowLength * Math.sin(angle);

        // Draw the line for the arrow
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.strokeStyle = color;
        context.lineWidth = thickness;
        context.stroke();

        const angle1 = angle - Math.PI / 7;
        const angle2 = angle + Math.PI / 7;
        const headX = endX - ARROW_HEAD_LENGTH * Math.cos(angle1);
        const headY = endY - ARROW_HEAD_LENGTH * Math.sin(angle1);

        // Draw the arrow head
        context.beginPath();
        context.moveTo(endX * scaleFactor, endY * scaleFactor);
        context.lineTo(headX * scaleFactor, headY * scaleFactor);
        context.lineTo((endX - ARROW_HEAD_LENGTH * Math.cos(angle2)) * scaleFactor, (endY - ARROW_HEAD_LENGTH * Math.sin(angle2)) * scaleFactor);
        context.lineTo(endX * scaleFactor, endY * scaleFactor);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = thickness;
        context.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            draw(canvas);
        }
    }, [gameState]); // Dependency array - redraws when gameState changes

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
        <div className="football-field-container" style={{ height: height }} ref={containerRef}>
            <img src="./src/assets/football_field.svg" alt="canvas" style={{height: height}} onLoad={canvasInit} />
            <canvas className="football-field-canvas" ref={canvasRef} style={{height: height}}></canvas>
        </div>
    );
}

function getCanvasCoordinates(x: number, y: number, context: CanvasRenderingContext2D) {
    const scaler = getScaler(context);
    const canvasX = x * scaler + context.canvas.width / 2;
    const canvasY = context.canvas.height/2 - y * scaler;
    return {canvasX, canvasY};
}

function getScaler(context: CanvasRenderingContext2D) {
    const widthScale = context.canvas.width / REAL_WIDTH_FIELD;
    const heightScale = context.canvas.height / REAL_WIDTH_FIELD;
    return Math.max(widthScale, heightScale);
}

export default FootBallField;