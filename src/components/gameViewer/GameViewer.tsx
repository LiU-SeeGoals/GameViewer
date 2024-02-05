import React, { useContext, useState } from 'react';
import './GameViewer.css';
import useResizeSidebar from '../../hooks/useResizeSidebar';
import FootBallField from './FootBallField';
import { GameStateContext } from '../../App';
import { GameState, updateYellowShowArrow } from '../../types/GameState';
interface gameViewerProps {
    gameState: GameState
}

const GameViewer: React.FC<gameViewerProps> = ({gameState}: gameViewerProps) => {
    const startHeightResizer = 709;
    const resizerWidth = 10;

    const {value: resizerValue, startResizing} = useResizeSidebar(true, startHeightResizer);
    const gameStateCtx = useContext(GameStateContext);
    
    const [arrow, setArrow] = useState(gameStateCtx.state.robots[6].showArrow);

    const handleClick = () => {
        for (let i = 0; i < 6; i++ ) {
            gameStateCtx.setState((prevState: GameState) => updateYellowShowArrow(prevState, i, !arrow));
        }
        setArrow((prevArrow: any) => !prevArrow)};

    return (
        <div className="game-viewer">
            <FootBallField height={resizerValue} gameState={gameState}/>
            
            <div className="game-viewer-resizer"
                 style={{height: resizerWidth}}
                 onMouseDown={startResizing}
            />

            <div className="game-viewer-container" style={{}}>
                <p>Game status: </p>
                <button 
                    onClick={handleClick}
                    style={{ backgroundColor: arrow ? 'rgb(186, 48, 48)' : 'rgb(96, 126, 61)', color: 'white' }}
                    >
                    {arrow ?"Hide opponent's arrows" : "Show opponent's arrows"}
                </button>
            </div>
        </div>
    );
};

export default GameViewer;

