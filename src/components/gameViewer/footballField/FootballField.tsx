import React, {useEffect} from 'react';
import './FootballField.css';
import { Robot } from '../../../types/Robot';
import { Ball } from "../../../types/Ball";

interface FootBallFieldProps {
    height: number;
    robotPositions: Robot[];
    ballPosition: Ball;
    errorOverlay: string;
    vectorSettingBlue: boolean[];
    vectorSettingYellow: boolean[];
}

const REAL_WIDTH_FIELD: number = 9600;

const ROBOT_RADIUS: number = 90; 

const ARROW_HEAD_LENGTH: number = 5;
const SPEED_ARROW_COLOR: string = 'rgba(0, 0, 0, 1)';
const SPEED_ARROW_THICKNESS: number = 3;

const COLOR_MAP: Record<string, string> = {0: "rgba(245, 239, 66, 1)", 1: "rgba(66, 135, 245, 1)"};

const FootballField: React.FC<FootBallFieldProps> = ({height, robotPositions, ballPosition, errorOverlay, vectorSettingBlue, vectorSettingYellow}: FootBallFieldProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Creats a canvas for the football field image
    const canvasInit = (event: any) => {
        // Check if the canvas is initialized
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        // Adjust canvas width to match the image width
        canvas.width = event.target.width;
        canvas.height = event.target.height;

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
        robotPositions.map((robot) => {
            drawRobot(context, robot);
        });
        drawBall(context);
        //drawRobot(context, {x: 0, y: 0, speed_x: 3, speed_y: 3, team: "yellow", selected: false});

    }

    // Draws ball on the canvas
    const drawBall = (context: CanvasRenderingContext2D) => {
        // const {canvasX, canvasY} = getCanvasCoordinates(gameState.ball.x, gameState.ball.y, context);
        // context.beginPath();
        // context.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
        // context.strokeStyle = 'rgba(0, 0, 0, 0)'; // make the border transparent
        // context.fillStyle = 'black';
        // context.fill();
        // context.stroke();
    }

    // Draws all robots on the canvas
    const drawRobot = (context: CanvasRenderingContext2D, robot: Robot) => {

        drawCircle(context, robot, ROBOT_RADIUS * getScaler(context), COLOR_MAP[robot.Team]);
        drawId(context, robot)

        if (vectorSettingYellow[robot.Id] && robot.Team == 0) {
        drawArrow(context, robot, SPEED_ARROW_COLOR, SPEED_ARROW_THICKNESS);
        }
        if (vectorSettingBlue[robot.Id] && robot.Team == 1) {
            drawArrow(context, robot, SPEED_ARROW_COLOR, SPEED_ARROW_THICKNESS);
        }
        
        
        // if (robot.selected) {
        //     drawCircle(context, robot, ROBOT_RADIUS/3, 'rgba(0, 0, 0, 1)');
        // }

        // Draw robot action over the robot
        context.font = "20px Arial";
        context.fillStyle = 'rgba(255, 0, 0, 1)';
        context.textAlign = "center";
        // if (typeof robot.action === 'object' && robot.action !== null){
        //     const action_number: string = ActionToStr(robot.action);
        //     context.fillText(action_number, getCanvasCoordinates(robot.x, robot.y, context).canvasX, getCanvasCoordinates(robot.x, robot.y, context).canvasY - 10);
        // }
    };

    // Draw a black circle around the robot
    const drawCircle = (context: CanvasRenderingContext2D, robot: Robot, radius: number, color: string) => {
        const {canvasX, canvasY} = getCanvasCoordinates(robot.PosX, robot.PosY, context);
        context.beginPath();
        context.arc(canvasX, canvasY, radius, 0, 2 * Math.PI);
        context.strokeStyle = 'rgba(0, 0, 0, 0)'; // make the border transparent
        context.fillStyle = color;
        context.fill();
        context.stroke();
    };

    // Draws the robots number id on the robot
    const drawId = (context: CanvasRenderingContext2D, robot: Robot) => {
        const {canvasX, canvasY} = getCanvasCoordinates(robot.PosX, robot.PosY, context);
        context.font = '14px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'black';
        context.fillText(String(robot.Id), canvasX, canvasY);
    }

    // Draws a arrow showing the direction of the robot
    const drawArrow = (context: CanvasRenderingContext2D, robot: Robot, color: string, thickness: number) => {

        const angle: number = Math.atan2(robot.VelY, robot.VelX) - Math.PI/2;
        const arrowLength: number = 10 * Math.hypot(robot.VelX, robot.VelY);
        // Don't draw the arrow if the velocity is too small
        if (arrowLength < 0.005) {
            return;
        }
        //const arrowLength: number = 100;
        // Calculate the starting point of the arrow (on the circle)
        const {canvasX: startX, canvasY: startY} = getCanvasCoordinates(robot.PosX, robot.PosY, context);

        // Calculate the end point of the arrow
        const endX: number = startX + arrowLength * Math.cos(angle);
        const endY: number = startY - arrowLength * Math.sin(angle);

        // Draw the line for the arrow
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.strokeStyle = color;
        context.lineWidth = thickness;
        context.stroke();
        

        const angle1 = angle + Math.PI / 7;
        const angle2 = angle - Math.PI / 7;
        const headX = endX + ARROW_HEAD_LENGTH * Math.cos(angle);
        const headY = endY - ARROW_HEAD_LENGTH * Math.sin(angle);

        // Draw the arrow head
        context.beginPath();
        context.moveTo(endX, endY);   
        context.lineTo((headX - ARROW_HEAD_LENGTH * Math.cos(angle2)), (headY + ARROW_HEAD_LENGTH * Math.sin(angle2)));
        context.lineTo(headX, headY);   
        context.lineTo((headX - ARROW_HEAD_LENGTH * Math.cos(angle1)), (headY + ARROW_HEAD_LENGTH * Math.sin(angle1)));
        context.lineTo(endX, endY);  
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
    }, [robotPositions]); // Dependency array - redraws when gameState changes

    return (
        <div className="football-field-container" style={{ height: height }} ref={containerRef}>
            <p className='overlay-warning'>{errorOverlay}</p>
            <img src="./src/assets/football_field.svg" alt="canvas" style={{height: height}} onLoad={canvasInit} />
            <canvas className="football-field-canvas" ref={canvasRef} style={{height: height}}></canvas>
        </div>
    );
}

// Returns the coordinates of where the robot is on the canvas
function getCanvasCoordinates(x: number, y: number, context: CanvasRenderingContext2D) {
    const scaler = getScaler(context);
    const canvasX = x * scaler + context.canvas.width / 2;
    const canvasY = context.canvas.height/2 - y * scaler;
    return {canvasX, canvasY};
}

// Returns a scaler based on the canvas current size
function getScaler(context: CanvasRenderingContext2D) {
    const widthScale = context.canvas.width / REAL_WIDTH_FIELD;
    const heightScale = context.canvas.height / REAL_WIDTH_FIELD;
    return Math.max(widthScale, heightScale);
}

export default FootballField;