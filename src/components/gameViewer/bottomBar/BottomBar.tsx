import React  from 'react';
import './BottomBar.css';
// import LogToolbar from './LogToolbar';
import { LazyLog, ScrollFollow } from "@melloware/react-logviewer";

interface BottomBarProps {}

// wrap string in ANSI color codes
function ct(color, text) {
    const colors = {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        reset: '\x1b[39m' // Resets the text color to default
    };

    const colorCode = colors[color.toLowerCase()] || colors.reset;
    return `${colorCode}${text}${colors.reset}`;
}

const BottomBar: React.FC<BottomBarProps> = () => {


    return (
        <div className="bottomBar-wrapper" >
        <ScrollFollow
            startFollowing={true}
            render={({ follow, onScroll }) => (
            <LazyLog
                url="ws://localhost:8080/logs"
                stream
                websocket
                caseInsensitive
                enableSearch
                selectableLines
                onScroll={onScroll}
                follow={follow}
                enableHotKeys
            />
            )}
        />
        </div>
    );
};

export default BottomBar;
