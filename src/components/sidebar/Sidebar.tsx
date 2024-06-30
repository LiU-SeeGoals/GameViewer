import React, { useState } from 'react';
import './Sidebar.css'
import useResizeSidebar from '../../hooks/useResizeSidebar';
import ExternalLinks from './externalLinks/ExternalLinks';
import Header from './header/Header';
import ToggleSetting from './toggleSetting/ToggleSetting';
import ButtonSetting from './buttonSetting/ButtonSetting';
import RobotTable from './robotTable/RobotTable'

const label = { inputProps: { 'aria-label': 'Switch demo' } };


interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    const minSidebarContentWidth = 250;
    const startWidthSidebar = 400;
    const resizerWidth = 5;

    const { value: resizerValue, startResizing } = useResizeSidebar(false, startWidthSidebar);

    const contentDisplay: string = resizerValue < minSidebarContentWidth + resizerWidth ? 'none' : 'inline';
    const sidebarWidth: number = resizerValue < minSidebarContentWidth + resizerWidth ? 0 : resizerValue;

    const sidebarStyle = {
        width: sidebarWidth,
        display: contentDisplay,
    };

    return (

        <div className="sidebar-wrapper">
            <div className="sidebar" style={sidebarStyle}>
                <div className="sidebar-content">
                    <Header />
                    <hr />
                    <ExternalLinks />
                    <hr />
                    <ToggleSetting/>
                    <ToggleSetting/>
                    <ButtonSetting/>
                    <hr />
                    <RobotTable/>
                </div>
            </div>
            <div
                className="sidebar-resizer"
                style={{ width: resizerWidth }}
                onMouseDown={startResizing}
            />
        </div>
    );
};

export default Sidebar;
