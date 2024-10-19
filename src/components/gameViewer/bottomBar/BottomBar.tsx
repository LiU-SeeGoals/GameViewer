import React  from 'react';
import './BottomBar.css';
// import LogToolbar from './LogToolbar';
import { LazyLog, ScrollFollow } from "@melloware/react-logviewer";

type Log = Record<string, any>;

interface BottomBarProps {logs: Log[]}

const BottomBar: React.FC<BottomBarProps> = ({logs}) => {


    return (
        <div className="bottomBar-wrapper" >
        <ScrollFollow
            startFollowing={true}
            render={({ follow, onScroll }) => (
            <LazyLog
                caseInsensitive
                enableSearch
                selectableLines
                onScroll={onScroll}
                follow={follow}
                enableHotKeys
                text={logs.map((log) => JSON.stringify(log)).join('\n')}
            />
            )}
        />
        </div>
    );
};

export default BottomBar;
