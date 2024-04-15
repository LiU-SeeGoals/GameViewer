import React from 'react';
import './Sidebar.css'
import useResizeSidebar from '../../hooks/useResizeSidebar';
import RobotInfo from '../robotInfo/RobotInfo';
interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    const minSidebarContentWidth = 100;
    const startWidthSidebar = 400;
    const resizerWidth = 10;

    const {value: resizerValue, startResizing} = useResizeSidebar(false, startWidthSidebar);

    const contentDisplay: string = resizerValue < minSidebarContentWidth + resizerWidth ? 'none' : 'inline';
    const sidebarWidth: number = resizerValue < minSidebarContentWidth + resizerWidth ? resizerWidth : resizerValue;

    return (
        <div className="sidebar-wrapper">
            <div className="sidebar" style={{ width: sidebarWidth }}>
                <h1>SeeGoals</h1>
                <div className="sidebar-content" style={{ display: contentDisplay}}>
                    <RobotInfo RobotId={0}></RobotInfo>
                    <RobotInfo RobotId={1}></RobotInfo>
                    <RobotInfo RobotId={2}></RobotInfo>
                    <RobotInfo RobotId={3}></RobotInfo>
                    <RobotInfo RobotId={4}></RobotInfo>
                    <RobotInfo RobotId={5}></RobotInfo>
                    
                </div>
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
