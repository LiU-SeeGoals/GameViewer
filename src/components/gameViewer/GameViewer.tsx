import React from 'react';
import './GameViewer.css';
import useResizeSidebar from '../../hooks/useResizeSidebar';
import FootballField from './footballField/FootballField';
import BottomBar from './bottomBar/BottomBar';
import { Robot } from "../../types/Robot";
import { Ball } from "../../types/Ball";

interface gameViewerProps {
    robotPositions: Robot[];
    ballPosition: Ball;
    terminalLog: string[];
    errorOverlay: string;
}

const GameViewer: React.FC<gameViewerProps> = ({
    robotPositions,
    ballPosition,
    terminalLog,
    errorOverlay,
}) => {
    const startHeightResizer = 709;
    const resizerWidth = 5;

    const {value: resizerValue, startResizing} = useResizeSidebar(true, startHeightResizer);
    const bottomBarHeight: number = window.innerHeight - resizerValue < resizerWidth ? window.innerHeight - resizerWidth : resizerValue;
    return (
        <div className="game-viewer">
            <FootballField 
                height={bottomBarHeight} 
                robotPositions={robotPositions} 
                ballPosition={ballPosition}
                errorOverlay={errorOverlay} />
            
            <div className="game-viewer-resizer"
                 style={{height: resizerWidth}}
                 onMouseDown={startResizing} />

            <BottomBar terminalLog={terminalLog} />
        </div>
    );
};

export default GameViewer;

