import React, {useState, useContext} from 'react';
import './Sidebar.css'
import useResizeSidebar from '../../hooks/useResizeSidebar';
import RobotInfo from '../robotInfo/RobotInfo';
import { GameStateContext } from '../../App';
import { GameState, updateYellowShowArrow } from '../../types/GameState';
interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    const minSidebarContentWidth = 100;
    const startWidthSidebar = 500;
    const resizerWidth = 10;

    const {value: resizerValue, startResizing} = useResizeSidebar(false, startWidthSidebar);

    const contentDisplay: string = resizerValue < minSidebarContentWidth + resizerWidth ? 'none' : 'inline';
    const sidebarWidth: number = resizerValue < minSidebarContentWidth + resizerWidth ? resizerWidth : resizerValue;

    const gameStateCtx = useContext(GameStateContext);
    
    const [arrow, setArrow] = useState(gameStateCtx.state.robots[6].showArrow);

    const handleClick = () => {
        for (let i = 0; i < 6; i++ ) {
            gameStateCtx.setState((prevState: GameState) => updateYellowShowArrow(prevState, i, !arrow));
        }
        setArrow((prevArrow) => !prevArrow)};
        

    return (
        <div className="sidebar" style={{ width: sidebarWidth }}>
           <div className="sidebar-content" style={{ display: contentDisplay}}>
            <h1> SeeGoals</h1>
            <RobotInfo RobotId="0"></RobotInfo>
            <RobotInfo RobotId="1"></RobotInfo>
            <RobotInfo RobotId="2"></RobotInfo>
            <RobotInfo RobotId="3"></RobotInfo>
            <RobotInfo RobotId="4"></RobotInfo>
            <RobotInfo RobotId="5"></RobotInfo>
            <button 
            onClick={handleClick}
            style={{ backgroundColor: arrow ? 'rgb(186, 48, 48)' : 'rgb(96, 126, 61)', color: 'white' }}
            >
                {arrow ?"Hide opponent's arrows" : "Show opponent's arrows"}

            </button>
            </div>
            <div 
               className="sidebar-resizer"
               style={{width: resizerWidth}}
               onMouseDown={startResizing}
           />
        </div>
    );
};

export default Sidebar;

//<p> {variableValue === 6 ? <span style={{ color: 'red' }}>Id: 6</span> : 'Id: 6'}</p>
//<button onClick={updateVariable}>Increase Variable</button>