import React from "react";

import './RobotInfo.css'
import ArrowButton from '../arrowButton/Arrowbutton'
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
                    <p>{`Distnace to ball: ${balldistance} cm`}</p>
                    <div className={hasBall ? "has-ball active" : "has-ball"}> 
                        <p> {hasBall ? 'Has ball' : 'No ball'} </p>
                    </div>
                </div>

                <div className="right-division">
                    <ArrowButton id={RobotId}></ArrowButton>
                    <button onClick={() => setIsOpen(true)}>Open Popup</button>
                    <RobotPopUp isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <h2>This is a Popup</h2>
                        <p>Popup content goes here.</p>
                    </RobotPopUp>
                </div>
            </div>
        </div>
    );
};

export default RobotInfo;