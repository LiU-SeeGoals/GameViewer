import React, { useState } from 'react';
import './ToggleSetting.css'
import Switch from '@mui/material/Switch';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import InfoIcon from '@mui/icons-material/Info';


interface SettingsProps {
}
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Settings: React.FC<SettingsProps> = () => {

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };


    return (
        <>
            <div className="toggleSetting-wrapper">
                <p onClick={toggleDropdown}>
                    <ArrowRightIcon className='icon-right-arrow' />
                    Show arrows
                    <span className="icon">
                        <InfoIcon className='icon-info' />
                        <span className="tooltip">Are you stupid? It's kind of self explanitary</span>
                    </span>
                </p>
                <Switch {...label} />
            </div>
            {isDropdownVisible && (
                <div className="toggle-dropdown-content">
                    <div className="toggleSetting-wrapper">
                        <p>Robot 1</p>
                        <Switch {...label} />
                    </div>
                    <div className="toggleSetting-wrapper">
                        <p>Robot 2</p>
                        <Switch {...label} />
                    </div>
                    <div className="toggleSetting-wrapper">
                        <p>Robot 3</p>
                        <Switch {...label} />
                    </div>
                    <div className="toggleSetting-wrapper">
                        <p>Robot 4</p>
                        <Switch {...label} />
                    </div>
                    <div className="toggleSetting-wrapper">
                        <p>Robot 5</p>
                        <Switch {...label} />
                    </div>
                    <div className="toggleSetting-wrapper">
                        <p>Robot 6</p>
                        <Switch {...label} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Settings;
