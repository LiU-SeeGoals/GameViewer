import React from "react";

import './RobotInfo.css'
import { useContext, useState } from 'react';
import { GameStateContext } from '../../App';
import RobotPopUp from '../robotPopUp/RobotPopUp';


interface RobotInfoProps {
    RobotId: number
}

const RobotInfo : React.FC<RobotInfoProps>  = ({RobotId}: RobotInfoProps) => {
    const gameStateCtx = useContext(GameStateContext);

    const robot = gameStateCtx.state.robots[RobotId];
    const ball = gameStateCtx.state.ball;
    const x = Math.abs(robot.x - ball.x);
    const y = Math.abs(robot.y - ball.y);
    const balldistance = Math.round(Math.hypot(x, y))/10;

    const hasBall = robot.hasBall;
    const [isOpen, setIsOpen] = useState(false);
    
    return(
        <div className="robot-info-content">
            <h2>Robot {RobotId}</h2>
            <div className="content">
                <div className="left-division"> 
                    <p>{`Distance to ball: ${balldistance} cm`}</p>
                    <p>x: {Math.round(robot.x)} y: {Math.round(robot.y)}</p>
                    
                </div>
                <div className="right-division">
                    <div className={hasBall ? "has-ball active" : "has-ball"}> 
                        <p> {hasBall ? 'Has ball' : 'No ball'} </p>
                    </div>
                    <button onClick={() => setIsOpen(true)}>More information</button>
                    <RobotPopUp isOpen={isOpen} onClose={() => setIsOpen(false)} id={RobotId} >
                        
                    </RobotPopUp>
                </div>
            </div>
        </div>
    );
};

export default RobotInfo;