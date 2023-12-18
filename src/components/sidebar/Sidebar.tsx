import React, {useState, useCallback} from 'react';
import './Sidebar.css'
import useResizeSidebar from '../../hooks/useResizeSidebar';

interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    const minSidebarContentWidth = 100;
    const startWidthSidebar = 300;
    const resizerWidth = 20;

    const {value: resizerValue, startResizing} = useResizeSidebar(false, startWidthSidebar);

    const contentDisplay: string = resizerValue < minSidebarContentWidth + resizerWidth ? 'none' : 'inline';
    const sidebarWidth: number = resizerValue < minSidebarContentWidth + resizerWidth ? resizerWidth : resizerValue;

    return (
        <div className="sidebar" style={{ width: sidebarWidth }}>
           <div className="sidebar-content" style={{ display: contentDisplay}}>
               {/* Content here */}
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