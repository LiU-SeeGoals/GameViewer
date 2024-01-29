import React, {useState, useEffect,useCallback} from 'react';
import './Sidebar.css'
import useResizeSidebar from '../../hooks/useResizeSidebar';
import RobotInfo from '../robotInfo/RobotInfo';
interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    const minSidebarContentWidth = 100;
    const startWidthSidebar = 700;
    const resizerWidth = 10;

    const {value: resizerValue, startResizing} = useResizeSidebar(false, startWidthSidebar);


    const [variableValue, setVariableValue] = useState(0);
    const updateVariable = () => {
        setVariableValue(prevValue => (prevValue === 7 ? 0 : prevValue + 1));
    };

    
    const [arrow, setArrow] = useState(false);
    
    const handleClick = () => {
        // Toggle the state between start and stop
        setArrow(prevState => !prevState);
    
        // Perform the corresponding action based on the current state
        if (arrow) {
        // Stop action
        console.log('Stopping...');
        // Add your stop logic here
        } else {
        // Start action
        console.log('Starting...');
        // Add your start logic here
        }
        };

   

    const contentDisplay: string = resizerValue < minSidebarContentWidth + resizerWidth ? 'none' : 'inline';
    const sidebarWidth: number = resizerValue < minSidebarContentWidth + resizerWidth ? resizerWidth : resizerValue;

    
    return (
        <div className="sidebar" style={{ width: sidebarWidth }}>
           <div className="sidebar-content" style={{ display: contentDisplay}}>
            <h1> SeaGoals</h1>
            <RobotInfo RobotId="1"></RobotInfo>
            <RobotInfo RobotId="2"></RobotInfo>
            <RobotInfo RobotId="3"></RobotInfo>
            <RobotInfo RobotId="4"></RobotInfo>
            <RobotInfo RobotId="5"></RobotInfo>
            <RobotInfo RobotId="6"></RobotInfo>
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