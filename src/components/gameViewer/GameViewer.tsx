import React from 'react';
import './GameViewer.css';
import useResizeSidebar from '../../hooks/useResizeSidebar';
import FootBallField from './FootBallField';
import { GameState } from '../../types/GameState';
interface gameViewerProps {
    gameState: GameState
}

const GameViewer: React.FC<gameViewerProps> = ({gameState}) => {
    const startHeightResizer = 850;
    const resizerWidth = 10;

    const {value: resizerValue, startResizing} = useResizeSidebar(true, startHeightResizer);


    return (
        <div className="game-viewer-container">
            <FootBallField height={resizerValue} gameState={gameState}/>
        
            <div className="game-viewer-resizer"
                 style={{height: resizerWidth}}
                 onMouseDown={startResizing}
            />
            <div className="game-viewer-player" style={{}}/>
        </div>
    )
};

export default GameViewer;