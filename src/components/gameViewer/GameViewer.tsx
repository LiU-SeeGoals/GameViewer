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
    errorOverlay: string;
    vectorSettingBlue: boolean[];
    vectorSettingYellow: boolean[];
}

const GameViewer: React.FC<gameViewerProps> = ({
    robotPositions,
    ballPosition,
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
                robotPositions={robotPositions} 
                ballPosition={ballPosition}
                errorOverlay={errorOverlay} 
                vectorSettingBlue={vectorSettingBlue}
                vectorSettingYellow={vectorSettingYellow}/>
            
            <div className="game-viewer-resizer"
                 style={{height: resizerWidth}}
                 onMouseDown={startResizing} />

            <BottomBar />
        </div>
    );
};

export default GameViewer;

