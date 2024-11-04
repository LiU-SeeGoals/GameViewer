import React, { useState } from 'react';
import './ButtonSetting.css'
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import InfoIcon from '@mui/icons-material/Info';

interface SettingsProps {
}

const Settings: React.FC<SettingsProps> = () => {

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleUgglanClick = () => {
        console.log('Ugglan clicked!');
    };

    const handleKråkanClick = () => {
        console.log('Kråkan clicked!');
    };

    const handleÖrnenClick = () => {
        console.log('Örnen clicked!');
    };

    const handleLärkenClick = () => {
        console.log('Lärken clicked!');
    };

    return (
        <>
            <div className="buttonSetting-wrapper">
                <p onClick={toggleDropdown}>
                    <ArrowRightIcon className='icon-right-arrow' />
                    Set robot position
                    <span className="icon">
                        <InfoIcon className='icon-info' />
                        <span className="tooltip">Not yet implemented</span>
                    </span>
                </p>
                <Button>Ugglan</Button>
            </div>
            {isDropdownVisible && (
                <div className="button-dropdown-content">
                    <div className="buttonSetting-wrapper">
                        <p>Alt 1</p>
                        <Button onClick={handleKråkanClick}>Kråkan</Button>
                    </div>
                    <div className="buttonSetting-wrapper">
                        <p>Alt 2</p>
                        <Button onClick={handleÖrnenClick}>Örnen</Button>
                    </div>
                    <div className="buttonSetting-wrapper">
                        <p>Alt 3</p>
                        <Button onClick={handleLärkenClick}>Lärkan</Button>
                    </div>
                    <div className="buttonSetting-wrapper">
                        <p>Alt 4</p>
                        <Button onClick={handleUgglanClick}>Ugglan</Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Settings;
