import React, { useState } from 'react';
import './Settings.css'
import Switch from '@mui/material/Switch';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import InfoIcon from '@mui/icons-material/Info';

function valuetext(value: number) {
    return `${value}°C`;
}

interface SettingsProps {
}
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Settings: React.FC<SettingsProps> = () => {


    return (

        <div className="settings-wrapper">
            <p><ArrowRightIcon className='icon'/>Show arrows</p>
            <Switch {...label} />
            <p><ArrowRightIcon className='icon'/>Show trace</p>
            <Switch {...label} />
            <p>Simulation speed<InfoIcon className='icon'/></p>

            <Box sx={{ width: 200 }}>
                <Slider
                    aria-label="Temperature"
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={.2}
                    marks
                    min={.2}
                    max={3}
                />
            </Box>

            <p>Use preset location</p>
        </div>
    );
};

export default Settings;
