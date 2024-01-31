import './RobotInfo.css'
import ArrowButton from '../arrowButton/Arrowbutton'
import { useContext, useState } from 'react';
import { GameStateContext } from '../../App';
import RobotPopUp from '../robotPopUp/RobotPopUp';


interface RobotInfoProps {
    RobotId: number
}

const RobotInfo : React<RobotInfoProps>  = ({RobotId}: RobotInfoProps) => {
    const gameStateCtx = useContext(GameStateContext);

    let robot = gameStateCtx.state.robots[RobotId];
    let ball = gameStateCtx.state.ball;
    const x = Math.abs(robot.x - ball.x);
    const y = Math.abs(robot.y - ball.y);
    const balldistance = Math.round(Math.hypot(x, y))/10;

    let hasBall = robot.hasBall;
    const [isOpen, setIsOpen] = useState(false);
    

    return(
        <div class="RobotInfoContet">
        
            <h2>Robot {RobotId}</h2>
                <div class="leftdivision"> 
                    <p>Distnace to ball: {balldistance} cm</p>
                    <div class="hasBall" style={{backgroundColor: hasBall ? 'rgb(96, 126, 61)' : 'rgb(186, 48, 48)'}}> 
                        <p> {hasBall ? 'Has ball' : 'No ball'} </p>
                    </div>
                    
                </div>

                <div class="rightdivision">
                    <ArrowButton id={RobotId}></ArrowButton>
                    <button onClick={() => setIsOpen(true)}>Open Popup</button>
                    <RobotPopUp isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <h2>This is a Popup</h2>
                        <p>Popup content goes here.</p>
                    </RobotPopUp>
                    <p>hejsan</p>
                    
                    
                </div>

        </div>
    );
};

export default RobotInfo;