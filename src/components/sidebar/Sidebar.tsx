import React, { useState } from 'react';
import './Sidebar.css'
import useResizeSidebar from '../../hooks/useResizeSidebar';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    const minSidebarContentWidth = 100;
    const startWidthSidebar = 400;
    const resizerWidth = 10;

    const { value: resizerValue, startResizing } = useResizeSidebar(false, startWidthSidebar);

    const contentDisplay: string = resizerValue < minSidebarContentWidth + resizerWidth ? 'none' : 'inline';
    const sidebarWidth: number = resizerValue < minSidebarContentWidth + resizerWidth ? resizerWidth : resizerValue;

    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };
    return (

        <div className="sidebar-wrapper">
            <div className="sidebar" style={{ width: sidebarWidth }}>
                <div className='row'>
                    <img src="./src/assets/Fia_logo.png" alt="logga" className="logo" />
                    <h1>SeeGoals</h1>
                </div>
                <div className="sidebar-content" style={{ display: contentDisplay }}>
                    <hr />
                    <div className='aaaa'>
                    <Stack spacing={2} direction="row">
                        
                        <Button variant="contained">Camera</Button>
                        <Button variant="contained">GC</Button>
                        <Button variant="contained">random</Button>
                        
                    </Stack>
                    </div>
                    <hr />
                    <div className='abcabc'>
                        <p>Show arrows</p>
                        <Switch {...label} />
                        <p>Display X</p>
                        <Switch {...label} />
                        <p>Enable Y</p>
                        <Switch {...label} />
                    </div>
                    <hr />
                    <div className='temp2'>
                        <p>Robot</p>
                        <p>Curr. action</p>
                        <p>Prev. action</p>
                        <p>Status</p>
                        <p>1</p>
                        <p>MoveTo</p>
                        <p>Kick</p>
                        <p>online</p>
                        <p>2</p>
                        <p>MoveTo</p>
                        <p>Kick</p>
                        <p>online</p>
                        <p>3</p>
                        <p>MoveTo</p>
                        <p>Kick</p>
                        <p>online</p>
                        <p>4</p>
                        <p>MoveTo</p>
                        <p>Kick</p>
                        <p>online</p>
                        <p>5</p>
                        <p>MoveTo</p>
                        <p>Kick</p>
                        <p>online</p>
                        <p>6</p>
                        <p>MoveTo</p>
                        <p>Kick</p>
                        <p>online</p>
                    </div>
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
