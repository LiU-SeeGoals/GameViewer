import React, { useContext, useState } from 'react';
import './GameViewer.css';
import useResizeSidebar from '../../hooks/useResizeSidebar';
import FootballField from '../footballField/FootballField';
import Test from './Test'
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
        setArrow((prevArrow: boolean) => !prevArrow)};

    return (
        <div className="game-viewer">
            <FootballField height={resizerValue} gameState={gameState}/>
            
            <div className="game-viewer-resizer"
                 style={{height: resizerWidth}}
                 onMouseDown={startResizing}
            />

            <div className="game-viewer-container" style={{}}>
                <p>Logs</p>
                <p>17:59{'>'} Using stratergy fiskmasen</p>
                <p>18:51{'>'} Lost connection to controller</p>
                
              
                
            </div>

            
        </div>
    );
};

export default GameViewer;

