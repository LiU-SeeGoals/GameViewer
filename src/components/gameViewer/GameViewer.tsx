import React from 'react';
import './GameViewer.css';
import useResizeSidebar from '../../hooks/useResizeSidebar';
import FootballField from '../footballField/FootballField';
import BottomBar from '../bottomBar/BottomBar';
import { GameState } from '../../types/GameState';
interface gameViewerProps {
    gameState: GameState
}

const GameViewer: React.FC<gameViewerProps> = ({gameState}: gameViewerProps) => {
    const startHeightResizer = 709;
    const resizerWidth = 10;

    const {value: resizerValue, startResizing} = useResizeSidebar(true, startHeightResizer);

    return (
        <div className="game-viewer">
            <FootballField height={resizerValue} gameState={gameState}/>
            
            <div className="game-viewer-resizer"
                 style={{height: resizerWidth}}
                 onMouseDown={startResizing}
            />

            <BottomBar/>
        </div>
    );
};

export default GameViewer;

