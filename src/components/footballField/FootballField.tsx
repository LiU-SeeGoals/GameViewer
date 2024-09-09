import React, { useEffect, useState } from 'react';
import './FootballField.css';
import { Robot } from '../../types/Robot';
import { GameState } from '../../types/GameState';
import { ActionToStr } from '../../types/Action';

interface FootBallFieldProps {
    height: number;
    gameState: GameState;
}

const REAL_WIDTH_FIELD: number = 9600;
const ROBOT_RADIUS: number = 100;
const ARROW_HEAD_LENGTH: number = 5;
const SPEED_ARROW_COLOR: string = 'rgba(0, 0, 0, 1)';
const SPEED_ARROW_THICKNESS: number = 3;
const COLOR_MAP: Record<string, string> = { "yellow": "rgba(245, 239, 66, 1)", "blue": "rgba(66, 135, 245, 1)" };

const FootballField: React.FC<FootBallFieldProps> = ({ height, gameState }: FootBallFieldProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Initializes the canvas for the football field image
    const canvasInit = (event: any) => {
        if (!canvasRef.current) return;

        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.width = event.target.width;
        canvas.height = event.target.height;
        draw(canvas);
    };

    // Draws everything on canvas
    const draw = (canvas: HTMLCanvasElement) => {
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (!context) return;

        // Clear the canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        // Drawing all robots from gameState
        gameState.robots.forEach((robot) => {
            drawRobot(context, robot);
        });

        drawBall(context);
    };

    // Draws ball on the canvas
    const drawBall = (context: CanvasRenderingContext2D) => {
        const { canvasX, canvasY } = getCanvasCoordinates(gameState.ball.x, gameState.ball.y, context);
        context.beginPath();
        context.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
        context.fillStyle = 'black';
        context.fill();
    };

    // Draws all robots on the canvas
    const drawRobot = (context: CanvasRenderingContext2D, robot: Robot) => {
        if (robot.showArrow) {
            drawArrow(context, robot, SPEED_ARROW_COLOR, SPEED_ARROW_THICKNESS);
        }
        drawCircle(context, robot, ROBOT_RADIUS * getScaler(context), COLOR_MAP[robot.team]);
        drawId(context, robot);

        //if (robot.selected) {
        //    drawCircle(context, robot, ROBOT_RADIUS / 3, 'rgba(0, 0, 0, 1)');
        //}

        // Draw robot action over the robot
        context.font = "20px Arial";
        context.fillStyle = 'rgba(255, 0, 0, 1)';
        context.textAlign = "center";
        if (typeof robot.action === 'object' && robot.action !== null) {
            const action_number: string = ActionToStr(robot.action);
            context.fillText(action_number, getCanvasCoordinates(robot.x, robot.y, context).canvasX, getCanvasCoordinates(robot.x, robot.y, context).canvasY - 10);
        }
    };

    // Utility function to draw a circle
    const drawCircle = (context: CanvasRenderingContext2D, robot: Robot, radius: number, color: string) => {
        const { canvasX, canvasY } = getCanvasCoordinates(robot.x, robot.y, context);
        context.beginPath();
        context.arc(canvasX, canvasY, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    };

    // Utility function to draw the robot ID
    const drawId = (context: CanvasRenderingContext2D, robot: Robot) => {
        const {canvasX, canvasY} = getCanvasCoordinates(robot.x, robot.y, context);
        context.font = '14px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'black';
        context.fillText(String(robot.id), canvasX, canvasY);
    }

    // Utility function to draw the direction arrow
    // Draws a arrow showing the direction of the robot
    const drawArrow = (context: CanvasRenderingContext2D, robot: Robot, color: string, thickness: number) => {

        const angle: number = Math.atan2(robot.speed_y, robot.speed_x) - Math.PI/2;
        //const arrowLength: number = 10 * Math.hypot(robot.speed_x, robot.speed_y);
        const arrowLength: number = 100;
        // Calculate the starting point of the arrow (on the circle)
        const {canvasX: startX, canvasY: startY} = getCanvasCoordinates(robot.x, robot.y, context);

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

    // Mouse Event Handlers
    const handleMouseDown = (event: React.MouseEvent) => {
        const { x: mouseX, y: mouseY } = getMousePos(event);

        gameState.robots.forEach(robot => {
            const context = canvasRef.current!.getContext('2d');
            const { canvasX, canvasY } = getCanvasCoordinates(robot.x, robot.y, context!);
            const dx = mouseX - canvasX;
            const dy = mouseY - canvasY;
            if (Math.sqrt(dx * dx + dy * dy) < ROBOT_RADIUS*getScaler(context!)) {
                setSelectedRobot(robot);
                setIsDragging(true);
                robot.selected = true;
            }
        });
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (isDragging && selectedRobot) {
            const { x: mouseX, y: mouseY } = getMousePos(event);
            const context = canvasRef.current!.getContext('2d');
            const scaler = getScaler(context!);
            selectedRobot.x = (mouseX - context!.canvas.width / 2) / scaler;
            selectedRobot.y = (context!.canvas.height / 2 - mouseY) / scaler;

            draw(canvasRef.current!);  // Redraw with the updated position
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
        if (selectedRobot) {
            selectedRobot.selected = false;
            setSelectedRobot(null);
        }
        draw(canvasRef.current!);  // Redraw the canvas after dropping
        }
    };

    // Get mouse position relative to the canvas
    const getMousePos = (event: React.MouseEvent) => {
        const canvas = canvasRef.current;
        const rect = canvas!.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            draw(canvas);
        }
    }, [gameState]);

    return (
        <div className="football-field-container" style={{ height: height }} ref={containerRef}>
            <img src="./src/assets/football_field.svg" alt="canvas" style={{ height: height }} onLoad={canvasInit} />
            <canvas
                className="football-field-canvas"
                ref={canvasRef}
                style={{ height: height }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </div>
    );
};

// Returns the coordinates of where the robot is on the canvas
function getCanvasCoordinates(x: number, y: number, context: CanvasRenderingContext2D) {
    const scaler = getScaler(context);
    const canvasX = x * scaler + context.canvas.width / 2;
    const canvasY = context.canvas.height / 2 - y * scaler;
    return { canvasX, canvasY };
}

// Returns a scaler based on the canvas current size
function getScaler(context: CanvasRenderingContext2D) {
    const widthScale = context.canvas.width / REAL_WIDTH_FIELD;
    const heightScale = context.canvas.height / REAL_WIDTH_FIELD;
    return Math.max(widthScale, heightScale);
}

export default FootballField;
