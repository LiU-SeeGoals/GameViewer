import React from 'react';
import './GameViewer.css';
import useResizeSidebar from '../../hooks/useResizeSidebar';
import FootballField from './footballField/FootballField';
import BottomBar from './bottomBar/BottomBar';
import { SSLFieldUpdate } from "../../types/SSLFieldUpdate";

interface gameViewerProps {
    sslFieldUpdate: SSLFieldUpdate;
    terminalLog: string[];
    errorOverlay: string;
    vectorSettingBlue: boolean[];
    vectorSettingYellow: boolean[];
}

const GameViewer: React.FC<gameViewerProps> = ({
    sslFieldUpdate,
    terminalLog,
    errorOverlay,
    vectorSettingBlue,
    vectorSettingYellow,
}) => {
    const startHeightResizer = 709;
    const resizerWidth = 5;

    const {value: resizerValue, startResizing} = useResizeSidebar(true, startHeightResizer);
    const bottomBarHeight: number = window.innerHeight - resizerValue < resizerWidth ? window.innerHeight - resizerWidth : resizerValue;
    return (
        <div className="game-viewer">
            <FootballField 
                height={bottomBarHeight} 
                sslFieldUpdate={sslFieldUpdate}
                errorOverlay={errorOverlay} 
                vectorSettingBlue={vectorSettingBlue}
                vectorSettingYellow={vectorSettingYellow}/>
            
            <div className="game-viewer-resizer"
                 style={{height: resizerWidth}}
                 onMouseDown={startResizing} />

            <BottomBar terminalLog={terminalLog} />
        </div>
    );
};

export default GameViewer;

