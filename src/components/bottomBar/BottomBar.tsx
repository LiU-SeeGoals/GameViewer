import React from 'react';
import './BottomBar.css'

interface BottomBarProps {
}

const BottomBar: React.FC<BottomBarProps> = () => {

    return (

        <div className="bottomBar-wrapper">
            <p><b>Logs</b></p>
            <p>17:59{'>'} Using strategy fiskmasen</p>
            <p>18:51{'>'} Lost connection to controller</p>
        </div>
    );
};

export default BottomBar;
